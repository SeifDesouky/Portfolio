import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: false,
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm!: FormGroup;
  isSubmitted = false;
  selectedFile!: File;

  constructor() {}

  ngOnInit() {
    this.projectForm = new FormGroup({
      number: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      technologies: new FormArray([this.createTechnology()]),
      viewProject: new FormControl(''),
      openProject: new FormControl('')
    });
  }

  get technologies(): FormArray {
    return this.projectForm.get('technologies') as FormArray;
  }

  createTechnology(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  addTechnology() {
    this.technologies.push(this.createTechnology());
  }

  removeTechnology(index: number) {
    this.technologies.removeAt(index);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.projectForm.invalid) return;

    const formData = new FormData();
    formData.append('number', this.projectForm.value.number);
    formData.append('title', this.projectForm.value.title);
    formData.append('description', this.projectForm.value.description);
    formData.append('technologies', JSON.stringify(this.projectForm.value.technologies.map((t: any) => t.name)));
    formData.append('viewProject', this.projectForm.value.viewProject);
    formData.append('openProject', this.projectForm.value.openProject);

    if (this.selectedFile) {
      formData.append('projectImg', this.selectedFile);
    }

    // this.http.post('http://localhost:3000/projects', formData)
    //   .subscribe(res => {
    //     console.log('Project saved:', res);
    //   });
  }
}
