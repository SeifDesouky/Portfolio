import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-skill',
  standalone: false,
  templateUrl: './update-skill.component.html',
  styleUrl: './update-skill.component.css'
})
export class UpdateSkillComponent {
 skillsList: any[] = [];
  isEditModalOpen = false;
  skillForm!: FormGroup;
  selectedId: string = '';

  constructor(private global: GlobalService, private toaster: ToastrService) {}

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.global.getSkills().subscribe((res: any) => {
      this.skillsList = res.data;
    });
  }

  get skillArray(): FormArray {
    return this.skillForm.get('skill') as FormArray;
  }

  openEditModal(category: any) {
    this.skillForm = new FormGroup({
      category: new FormControl(category.category, Validators.required),
      skill: new FormArray(
        category.skill.map((s: any) =>
          new FormGroup({
            name: new FormControl(s.name, Validators.required),
            img: new FormControl(s.img)
          })
        )
      )
    });

    this.selectedId = category._id;
    this.isEditModalOpen = true;
  }

  onUpdate() {
    if (this.skillForm.invalid) return;
    this.global.updateSkill(this.skillForm.value,this.selectedId).subscribe({
      next: (res: any) => {
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
}
