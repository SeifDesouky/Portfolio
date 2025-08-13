import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
 menuItems = [
    { name: 'Dashboard', icon: 'dashboard', active: true ,route:'/dashboard'},
    { name: 'Home', icon: 'calendar_today', active: false ,route:'/dashboard/home-dashboard'},
    { name: 'Education', icon: 'task', active: false ,route:'/dashboard/education-dashboard'},
    { name: 'Skill\'s', icon: 'analytics', active: false ,route:'/dashboard/skills-dashboard'},
    { name: 'Contact', icon: 'description', active: false,route:'/dashboard/contact-dashboard' },
    { name: 'Projects', icon: 'description', active: false,route:'/dashboard/project-dashboard' }
  ];
   integrations = [
    // { name: 'Slack', icon: 'slack' },
    { name: 'Discord', icon: 'discord' },
    { name: 'Add Plugin', icon: 'add_circle_outline' }
  ];

  // Teams
  teams = ['Seq', 'Marketing'];
  onMenuClick(item: any): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }
}
