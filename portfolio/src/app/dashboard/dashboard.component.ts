import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { MenuItem, ProjectEntry, SkillCategory } from '../models/portfolio.models';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'dashboard', active: true },
    { name: 'Calendar', icon: 'calendar_today', active: false },
    { name: 'My task', icon: 'task', active: false },
    { name: 'Static\'s', icon: 'analytics', active: false },
    { name: 'Document', icon: 'description', active: false }
  ];

  projectCount = 0;
  projects: ProjectEntry[] = [];
  skills: string[] = [];
  skillsCount = 0;

  constructor(private global: GlobalService) {}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit() {
    this.global.getProjects().subscribe(res => {
      this.projectCount = res.count;
      this.projects = res.data;

    });
    this.global.getSkills().subscribe(res => {
      this.skillsCount = res.count;

      const skillNames = res.data.flatMap((category: SkillCategory) =>
        category.skill.map((skill) => skill.name)
      );
      this.skills = [...new Set(skillNames)];
    });
  }

  onMenuClick(item: MenuItem): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }

  onCreate(): void {
  }


}
