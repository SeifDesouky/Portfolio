import { Component } from '@angular/core';
import { DashboardCardInfo } from '../../../models/portfolio.models';

@Component({
  selector: 'app-education-dashboard',
  standalone: false,
  templateUrl: './education-dashboard.component.html',
  styleUrl: './education-dashboard.component.css'
})
export class EducationDashboardComponent {
    componentInfo: DashboardCardInfo = {
    name: 'Education',
    icon: 'description',
    active: false,
    addRoute: '/dashboard/education-dashboard/addEducation',
    updateRoute: '/dashboard/education-dashboard/updateEducation'
  }
}
