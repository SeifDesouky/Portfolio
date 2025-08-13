import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-education',
  standalone: false,
  templateUrl: './update-education.component.html',
  styleUrl: './update-education.component.css'
})
export class UpdateEducationComponent {
  educationList: any[] = [];
  isEditModalOpen = false;
  eduForm!: FormGroup;
  selectedId: string='';
  isSubmitted:boolean=false
  constructor(private global: GlobalService, private toaster: ToastrService) { }
  ngOnInit() {
    this.loadEducation();
  }

  loadEducation() {
    this.global.getEducation().subscribe((res: any) => {
      this.educationList = res.data;
    });
    
  }
  openEditModal(edu: any) {
   this.eduForm = new FormGroup({
    date: new FormControl(edu.date, [Validators.pattern(/^(19|20)\d{2}$/)]),
    title: new FormControl(edu.title,[Validators.minLength(3)]),
    description: new FormControl(edu.description,[Validators.minLength(5)]),
  });

  this.selectedId = edu._id;
  this.isEditModalOpen = true;

  }
  onUpdate() {
    this.isSubmitted=true
    this.global.updateEducation(this.eduForm.value, this.selectedId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toaster.success(res.message);
      },
      error: (err) => {
        console.error(err);
        this.toaster.error('Something went wrong, please try again');
      }
    })
    this.loadEducation()
  }
  closeEditModal() {
    this.isEditModalOpen = false;
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
}
