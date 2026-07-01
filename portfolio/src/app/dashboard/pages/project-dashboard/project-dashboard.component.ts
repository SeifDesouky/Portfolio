import { Component } from '@angular/core';
import { DashboardCardInfo } from '../../../models/portfolio.models';

@Component({
  selector: 'app-project-dashboard',
  standalone: false,
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.css'
})
export class ProjectDashboardComponent {
  componentInfo: DashboardCardInfo = {
    name: 'Projects',
    icon: 'description',
    active: false,
    addRoute: '/dashboard/project-dashboard/addProject',
    updateRoute: '/dashboard/project-dashboard/updateProject'
  }
}
