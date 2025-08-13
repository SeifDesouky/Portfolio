import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-project',
  standalone: false,
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent {
    projectsList: any[] = [];
  isEditModalOpen = false;
  projectForm!: FormGroup;
  selectedId: string = '';

  constructor(private global: GlobalService, private toaster: ToastrService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.global.getProjects().subscribe((res: any) => {
      this.projectsList = res.data;
    });
  }

  get technologiesArray(): FormArray {
    return this.projectForm.get('technologies') as FormArray;
  }

  openEditModal(project: any) {
    this.projectForm = new FormGroup({
      number: new FormControl(project.number, Validators.required),
      title: new FormControl(project.title, Validators.required),
      description: new FormControl(project.description),
      technologies: new FormArray(
        project.technologies.map((t: string) => new FormControl(t))
      ),
      viewProject: new FormControl(project.viewProject),
      openProject: new FormControl(project.openProject)
    });

    this.selectedId = project._id;
    this.isEditModalOpen = true;
  }

  onUpdate() {
    if (this.projectForm.invalid) return;
    // this.global.updateProject(this.projectForm.value, this.selectedId).subscribe({
    //   next: (res: any) => {
    //     this.toaster.success(res.message);
    //     this.isEditModalOpen = false;
    //     this.loadProjects();
    //   },
    //   error: () => {
    //     this.toaster.error('Something went wrong');
    //   }
    // });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  deleteProject(id: string) {
    // this.global.deleteProject(id).subscribe({
    //   next: () => {
    //     this.toaster.success('Project deleted');
    //     this.projectsList = this.projectsList.filter(p => p._id !== id);
    //   },
    //   error: () => {
    //     this.toaster.error('Error deleting project');
    //   }
    // });
  }
}
