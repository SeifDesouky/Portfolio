import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { EducationEntry, EducationFormValue } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-update-education',
  standalone: false,
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.css'
})
export class UpdateEducationComponent {
  educationList: EducationEntry[] = [];
  isEditModalOpen = false;
  eduForm!: FormGroup;
  selectedId: string='';
  isSubmitted:boolean=false
  private previouslyFocusedElement: HTMLElement | null = null;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;
  constructor(private global: GlobalService, private toaster: ToastrService) { }
  ngOnInit() {
    this.loadEducation();
  }

  loadEducation() {
    this.global.getEducation().subscribe((res) => {
      this.educationList = res.data;
    });
    
  }
  openEditModal(edu: EducationEntry) {
   this.previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
   this.eduForm = new FormGroup({
    date: new FormControl(edu.date, [Validators.pattern(/^(19|20)\d{2}$/)]),
    title: new FormControl(edu.title,[Validators.minLength(3)]),
    description: new FormControl(edu.description,[Validators.minLength(5)]),
  });

  this.selectedId = edu._id;
  this.isEditModalOpen = true;
  queueMicrotask(() => this.closeButton?.nativeElement.focus());

  }
  onUpdate() {
    this.isSubmitted=true
    const payload = this.eduForm.getRawValue() as EducationFormValue;
    this.global.updateEducation(payload, this.selectedId).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
      },
      error: () => {
        this.toaster.error('Something went wrong, please try again');
      }
    })
    this.loadEducation()
  }
  closeEditModal() {
  this.isEditModalOpen = false;
  queueMicrotask(() => this.previouslyFocusedElement?.focus());
  }
  softDeleteEducation(id: string) {
    this.global.deleteEducation(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toaster.success("Education deleted successfully");
        this.educationList = this.educationList.filter(e => e._id !== id);
      },
      error: (res) => {
        this.toaster.error('Error deleting:')
      }
    })
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isEditModalOpen) {
      this.closeEditModal();
    }
  }
}
