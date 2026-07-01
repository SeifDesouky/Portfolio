import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectFormValue } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-add-project',
  standalone: false,
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  projectForm!: FormGroup;
  isSubmitted = false;
  selectedFile: File | null = null;

  constructor(private gloabl:GlobalService,private toaster:ToastrService) {}

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.projectForm.invalid) return;

    const formData = new FormData();
    const payload = this.projectForm.getRawValue() as ProjectFormValue;
    formData.append('number', payload.number);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('technologies', JSON.stringify(payload.technologies.map((t) => t.name)));
    formData.append('viewProject', payload.viewProject);
    formData.append('openProject', payload.openProject);

    if (this.selectedFile) {
      formData.append('projectImg', this.selectedFile);
    }

    this.gloabl.addProject(formData).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
        this.projectForm.reset();
      },
      error: () => {
        this.toaster.error('Something went wrong');
      }
    });
  }
}
