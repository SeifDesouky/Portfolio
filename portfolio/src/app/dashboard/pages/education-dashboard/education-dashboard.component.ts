import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-education-dashboard',
  standalone: false,
  templateUrl: './education-dashboard.component.html',
  styleUrl: './education-dashboard.component.css'
})
export class EducationDashboardComponent {
    componentInfo = {
    name: 'Education',
    icon: 'description',
    active: false,
    addRoute: '/dashboard/education-dashboard/addEducation',
    updateRoute: '/dashboard/education-dashboard/updateEducation'
  }
}
