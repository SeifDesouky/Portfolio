import { Component } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceEntry, ServiceFormValue, ServiceRequest } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-update-service',
  standalone: false,
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent {
  services: ServiceEntry[] = [];
  editingId: string | null = null;

  constructor(
    private global: GlobalService,
    private toastr: ToastrService
  ) {}

  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    tagline: new FormControl('', Validators.required),
    bullets: new FormControl(),
    icon: new FormControl('', Validators.required),
    cta: new FormControl('')
  });

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.global.getServices().subscribe({
      next: (res) => this.services = res.data,
      error: () => this.toastr.error('Failed to load services', 'Error')
    });
  }

  onDelete(id: string) {
    if (confirm("Are you sure?")) {
      this.global.deleteService(id).subscribe({
        next: () => {
          this.toastr.success('Service deleted successfully!', 'Deleted');
          this.loadServices();
        },
        error: () => this.toastr.error('Failed to delete service', 'Error')
      });
    }
  }

  onEdit(service: ServiceEntry) {
    this.editingId = service._id;
    this.editForm.patchValue({
      title: service.title,
      tagline: service.tagline,
      bullets: service.bullets?.join(', '),
      icon: service.icon,
      cta: service.cta
    });
  }

  saveEdit() {
    if (this.editForm.valid && this.editingId) {
      const data = this.editForm.getRawValue() as ServiceFormValue;
      const payload: ServiceRequest = {
        title: data.title,
        tagline: data.tagline,
        bullets: data.bullets ? data.bullets.split(',').map((b) => b.trim()) : [],
        icon: data.icon,
        cta: data.cta,
      };

      this.global.updateService(this.editingId, payload).subscribe({
        next: () => {
          this.toastr.success('Service updated successfully!', 'Updated');
          this.editingId = null;
          this.loadServices();
        },
        error: () => this.toastr.error('Failed to update service', 'Error')
      });
    } else {
      this.toastr.warning('Please fill in all required fields.', 'Validation');
    }
  }

  onRestore(id: string) {
    this.global.restoreService(id).subscribe({
      next: () => {
        this.toastr.success('Service restored successfully!', 'Restored');
        this.loadServices();
      },
      error: () => this.toastr.error('Failed to restore service', 'Error')
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.toastr.info('Edit cancelled', 'Cancelled');
  }
}
