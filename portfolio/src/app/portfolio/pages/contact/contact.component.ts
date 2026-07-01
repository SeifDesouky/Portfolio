import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GlobalService } from '../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { ContactFormValue } from '../../../models/portfolio.models';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  isSubmitted = false;
  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    msg: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  })

  constructor(private global:GlobalService,private toaster:ToastrService){}
onSubmit() {
  this.isSubmitted = true;
  if (this.myForm.invalid) {
    this.toaster.warning("Please fill all required fields correctly!");
    return;
  }

  const payload = this.myForm.getRawValue() as ContactFormValue;
  this.global.addComment(payload).subscribe({
    next: (res) => {
      this.toaster.success(res.message);
      this.myForm.reset();
      this.isSubmitted = false;
    },
    error: () => {
      this.toaster.error('Something went wrong, try again.');
    }
  });
}
get f() { return this.myForm.controls; }

  sending = false;
  status = '';

  @ViewChild('threeCanvas', { static: true }) threeCanvas!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private frameId: number | null = null;
  private model?: THREE.Object3D;

  ngAfterViewInit(): void {
    this.initThree();
    this.startAnimationLoop();
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy(): void {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.onWindowResize);
    this.renderer?.dispose();
    this.scene?.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => material.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
}


  private initThree() {
    const canvas = this.threeCanvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.LinearToneMapping;
    this.renderer.toneMappingExposure = 0.41;

    this.scene = new THREE.Scene();
    this.scene.background = null;

    const aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 1.5, 7);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setPath('/')
      .load('studio_small_08_4k.hdr', (hdrTexture) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
        this.scene.environment = envMap;
        hdrTexture.dispose();
        pmremGenerator.dispose();
      });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffee, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load('/earth_hologram.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1.5, 1.5, 1.5);

  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material;
      if (!Array.isArray(material) && 'envMapIntensity' in material) {
        material.envMapIntensity = 2.0;
        material.emissive = new THREE.Color(0x00ffee);
        material.emissiveIntensity = 0.8;
        material.needsUpdate = true;
      }
    }
  });
  const blueLight = new THREE.DirectionalLight(0x00ffee, 5);
  blueLight.position.set(-5, 5, 5);
  this.scene.add(blueLight);

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  this.scene.add(model);
  this.model = model;
});

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.8;
  }

  private startAnimationLoop = () => {
    const animate = () => {
      if (this.model) {
        this.model.rotation.y += 0.003;
      }
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(animate);
    };
    animate();
  };

  private onWindowResize = () => {
    const canvas = this.threeCanvas.nativeElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  };
}
