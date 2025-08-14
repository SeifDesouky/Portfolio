import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';
interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
}

interface Project {
  id: number;
  name: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  color: string;
}

interface Goal {
  id: number;
  title: string;
  completed: number;
  total: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   menuItems = [
    { name: 'Dashboard', icon: 'dashboard', active: true },
    { name: 'Calendar', icon: 'calendar_today', active: false },
    { name: 'My task', icon: 'task', active: false },
    { name: 'Static\'s', icon: 'analytics', active: false },
    { name: 'Document', icon: 'description', active: false }
  ];

  projectCount: any
  projects: any[]=[]
  skills: any = []
  skillsCount: any;
  constructor(private global:GlobalService) {}

  ngOnInit() {
    this.global.getProjects().subscribe(res => {
      this.projectCount = res.count
      this.projects = res.data
      console.log(this.projects);

    })
    this.global.getSkills().subscribe(res => {
      this.skillsCount = res.count;

      res.data.forEach((ele: any) => {
        ele.skill.forEach((element:any) => {
          this.skills.push(element.name)

        });
      })
      this.skills=[... new Set(this.skills)]
    })
  }
  onMenuClick(item: any): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }

  onCreate(): void {
    console.log('Create button clicked');
  }


}
