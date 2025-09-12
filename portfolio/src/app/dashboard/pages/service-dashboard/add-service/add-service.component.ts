import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  standalone: false,
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent {
  constructor(private global: GlobalService,private toastr: ToastrService) {}

  serviceForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tagline: new FormControl('', [Validators.required]),
    bullets: new FormControl(),
    icon: new FormControl('', [Validators.required]),
    cta: new FormControl('')
  });

  onSubmit() {
    if (this.serviceForm.valid) {
      const data = this.serviceForm.value;
      if (data.bullets) {
        data.bullets = (data.bullets as string)
          .split(',')
          .map(b => b.trim());
      }

      this.global.createService(data).subscribe({
        next: (res) => {
          this.toastr.success('Service added successfully!', 'Success');
          this.serviceForm.reset();
        },
        error: (err) => {
          this.toastr.error('Failed to add service. Try again.', 'Error');
          console.error(err);
        }
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Validation');
    }
  }
}
