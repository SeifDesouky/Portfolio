import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '../../../models/portfolio.models';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
 menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'dashboard', active: true ,route:'/dashboard'},
    { name: 'Home', icon: 'calendar_today', active: false ,route:'/dashboard/home-dashboard'},
    { name: 'Education', icon: 'task', active: false ,route:'/dashboard/education-dashboard'},
    { name: 'Skill\'s', icon: 'analytics', active: false ,route:'/dashboard/skills-dashboard'},
    { name: 'Projects', icon: 'description', active: false,route:'/dashboard/project-dashboard' },
    { name: 'Services', icon: 'description', active: false,route:'/dashboard/service-dashboard' },
    { name: 'Contact', icon: 'description', active: false,route:'/dashboard/contact-dashboard' },
  ];

  trackByIndex(index: number): number {
    return index;
  }

  onMenuClick(item: MenuItem): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }
}
