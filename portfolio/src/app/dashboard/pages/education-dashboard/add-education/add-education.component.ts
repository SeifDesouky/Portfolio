import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-education',
  standalone: false,
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css'
})
export class AddEducationComponent {
  eduForm!: FormGroup;
  isSubmitted = false
  constructor(private global: GlobalService, private toaster: ToastrService) { }

  ngOnInit() {
    this.eduForm = new FormGroup({
      date: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]),
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })

  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.eduForm.invalid) {
      this.toaster.error('Please fill all required fields correctly');
      return;
    }

    this.global.addEducation(this.eduForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toaster.success(res.message);
        this.eduForm.reset();
        this.isSubmitted = false;
      },
      error: (err) => {
        console.error(err);
        this.toaster.error('Something went wrong, please try again');
      }
    });
  }
}
