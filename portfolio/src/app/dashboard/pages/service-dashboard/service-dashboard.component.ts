import { Component } from '@angular/core';
import { DashboardCardInfo } from '../../../models/portfolio.models';

@Component({
  selector: 'app-service-dashboard',
  standalone: false,
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.css'
})
export class ServiceDashboardComponent {
  componentInfo: DashboardCardInfo = {
    name: 'Services',
    icon: 'description',
    active: false,
    addRoute: '/dashboard/service-dashboard/addService',
    updateRoute: '/dashboard/service-dashboard/updateService'
  }
}
