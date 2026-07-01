import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { ProjectEditFormValue, ProjectEntry, ProjectRequest } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-update-project',
  standalone: false,
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent {
    projectsList: ProjectEntry[] = [];
  isEditModalOpen = false;
  projectForm!: FormGroup;
  selectedId: string = '';
  projectImg = `${environment.mediaUrl}/projectImg/`;
  private previouslyFocusedElement: HTMLElement | null = null;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
  constructor(private global: GlobalService, private toaster: ToastrService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.global.getProjects().subscribe((res) => {
      this.projectsList = res.data;
    });
  }

  get technologiesArray(): FormArray {
    return this.projectForm.get('technologies') as FormArray;
  }

  openEditModal(project: ProjectEntry) {
    this.previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
    queueMicrotask(() => this.closeButton?.nativeElement.focus());
  }

  onUpdate() {
    if (this.projectForm.invalid) return;
    const formValue = this.projectForm.getRawValue() as ProjectEditFormValue;
    const payload: ProjectRequest = {
      number: formValue.number,
      title: formValue.title,
      description: formValue.description,
      technologies: formValue.technologies.map((technology) => technology.trim()).filter(Boolean),
      viewProject: formValue.viewProject,
      openProject: formValue.openProject,
    };
    this.global.updateProject(payload, this.selectedId).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
        this.isEditModalOpen = false;
        this.loadProjects();
      },
      error: () => {
        this.toaster.error('Something went wrong');
      }
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    queueMicrotask(() => this.previouslyFocusedElement?.focus());
  }

  deleteProject(id: string) {
    this.global.deleteProject(id).subscribe({
      next: () => {
        this.toaster.success('Project deleted');
        this.projectsList = this.projectsList.filter(p => p._id !== id);
      },
      error: () => {
        this.toaster.error('Error deleting project');
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isEditModalOpen) {
      this.closeEditModal();
    }
  }
}
