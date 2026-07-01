import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceFormValue, ServiceRequest } from '../../../../models/portfolio.models';

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
      const data = this.serviceForm.getRawValue() as ServiceFormValue;
      const payload: ServiceRequest = {
        title: data.title,
        tagline: data.tagline,
        bullets: data.bullets
          ? data.bullets.split(',').map((b) => b.trim())
          : [],
        icon: data.icon,
        cta: data.cta,
      };
      this.global.createService(payload).subscribe({
        next: () => {
          this.toastr.success('Service added successfully!', 'Success');
          this.serviceForm.reset();
        },
        error: () => {
          this.toastr.error('Failed to add service. Try again.', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Validation');
    }
  }
}
