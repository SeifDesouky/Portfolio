import { Component  } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-home-dashboard',
  standalone: false,
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent {
  homeForm!: FormGroup;
  staticUrl = 'http://localhost:3000/images/';
  home: any;
  fileName: string = '';

  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.global.getHome().subscribe(res => {
      this.home = res.data[0];
      this.initForm();
    });
  }

  initForm() {
    const rolesArray = this.home?.roles || [];

    this.homeForm = new FormGroup({
      title: new FormControl(this.home?.title || '', [Validators.required]),
      description: new FormControl(this.home?.description || '', [Validators.required]),
      linkdin: new FormControl(this.home?.linkdin || ''),
      github: new FormControl(this.home?.github || ''),
      instagram: new FormControl(this.home?.instagram || ''),
      facebook: new FormControl(this.home?.facebook || ''),
      cv: new FormControl(''),
      profileImg: new FormControl(''),
      logo: new FormControl(this.home?.logo || ''),
      roles: new FormArray(
        rolesArray.map((role: string) => new FormControl(role, Validators.required))
      )
    });
  }

  get roles(): FormArray {
    return this.homeForm.get('roles') as FormArray;
  }

  addRole() {
    this.roles.push(new FormControl('', Validators.required));
  }

  removeRole(index: number) {
    this.roles.removeAt(index);
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('title', this.homeForm.get('title')?.value);
    formData.append('description', this.homeForm.get('description')?.value);
    formData.append('linkdin', this.homeForm.get('linkdin')?.value);
    formData.append('github', this.homeForm.get('github')?.value);
    formData.append('instagram', this.homeForm.get('instagram')?.value);
    formData.append('facebook', this.homeForm.get('facebook')?.value);
    formData.append('logo', this.homeForm.get('logo')?.value);

    const cvFile = this.homeForm.get('cv')?.value;
    if (cvFile && cvFile instanceof File) {
      formData.append('cv', cvFile);
    }
    const profileImgFile = this.homeForm.get('profileImg')?.value;
    if (profileImgFile && profileImgFile instanceof File) {
      formData.append('profileImg', profileImgFile);
    }

    this.roles.value.forEach((role: string, index: number) => {
      formData.append(`roles[${index}]`, role);
    });

    this.global.updateHome(formData).subscribe(res => {});
  }

profilePreview: string | null = null;
cvName: string = '';

onFileSelected(event: Event, controlName: string) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.homeForm.get(controlName)?.setValue(file);

    if (controlName === 'cv') {
      this.cvName = file.name;
    }

    if (controlName === 'profileImg') {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

}
