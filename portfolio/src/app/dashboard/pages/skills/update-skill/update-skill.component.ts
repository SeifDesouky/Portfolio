import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';
import { SkillCategory, SkillCategoryEditFormValue, SkillItem } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-update-skill',
  standalone: false,
  templateUrl: './update-skill.component.html',
  styleUrl: './update-skill.component.css'
})
export class UpdateSkillComponent {
 skillsList: SkillCategory[] = [];
  isEditModalOpen = false;
  skillForm!: FormGroup;
  selectedId: string = '';
  private previouslyFocusedElement: HTMLElement | null = null;
  @ViewChild('closeButton') closeButton?: ElementRef<HTMLButtonElement>;

  constructor(private global: GlobalService, private toaster: ToastrService) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.global.getSkills().subscribe((res) => {
      this.skillsList = res.data;
    });
  }

  get skillArray(): FormArray {
    return this.skillForm.get('skill') as FormArray;
  }

  openEditModal(category: SkillCategory) {
    this.previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.skillForm = new FormGroup({
      category: new FormControl(category.category, Validators.required),
      skill: new FormArray(
        category.skill.map((s: SkillItem) =>
          new FormGroup({
            name: new FormControl(s.name, Validators.required),
            img: new FormControl(s.img)
          })
        )
      )
    });

    this.selectedId = category._id;
    this.isEditModalOpen = true;
    queueMicrotask(() => this.closeButton?.nativeElement.focus());
  }

  onUpdate() {
    if (this.skillForm.invalid) return;
    const payload = this.skillForm.getRawValue() as SkillCategoryEditFormValue;
    this.global.updateSkill(payload,this.selectedId).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
        this.isEditModalOpen = false;
        this.loadSkills();
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

  softDeleteCategory(id: string) {
    this.global.deleteSkill(id).subscribe({
      next: () => {
        this.toaster.success('Category deleted');
        this.skillsList = this.skillsList.filter(c => c._id !== id);
      },
      error: () => {
        this.toaster.error('Error deleting category');
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
