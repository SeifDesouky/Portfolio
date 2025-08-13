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

  // Integration options
  integrations = [
    { name: 'Slack', icon: 'slack' },
    { name: 'Discord', icon: 'discord' },
    { name: 'Add Plugin', icon: 'add_circle_outline' }
  ];

  // Teams
  teams = ['Seq', 'Marketing'];


  // Tasks in process
  tasksInProcess: Task[] = [
    { id: 1, title: 'Meet HR for Project', time: 'Tonight', completed: false },
    { id: 2, title: 'Boss Appointment', time: 'Next morning', completed: false }
  ];

  // Month goals
  monthGoals: Goal[] = [
    { id: 1, title: 'HTML', completed: 1, total: 4 },
    { id: 2, title: 'CSS', completed: 3, total: 4 },
    { id: 3, title: 'Javascript', completed: 2, total: 3 },
    { id: 4, title: 'Boostrap', completed: 1, total: 2 },
    { id: 4, title: 'Angular', completed: 1, total: 2 },
    { id: 4, title: 'Node.js', completed: 1, total: 2 },
    { id: 4, title: 'express.js', completed: 1, total: 2 },
    { id: 4, title: 'mongoDB', completed: 1, total: 2 },
  ];

  // Last projects
  lastProjects: Project[] = [
    { id: 1, name: 'New Schedule', status: 'In Progress', progress: 75, color: '#00ffee' },
    { id: 2, name: 'Anime UI design', status: 'Completed', progress: 100, color: '#4ade80' },
    { id: 3, name: 'Creative UI design', status: 'On Hold', progress: 45, color: '#f59e0b' }
  ];

  // Overall stats
  stats = {
    tasksDone: 43,
    projectsStopped: 2,
    totalProjects: 32,
    inProgress: 2,
    completed: 25
  };

  // Month progress
  monthProgress = 30;
  monthIndicator = 120;

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
  // Menu item click handler
  onMenuClick(item: any): void {
    this.menuItems.forEach(menuItem => menuItem.active = false);
    item.active = true;
  }

  // Task menu actions
  onTaskAction(taskId: number, action: string): void {
    console.log(`Task ${taskId}: ${action}`);
    // Implement task actions here
  }

  // Create button click
  onCreate(): void {
    console.log('Create button clicked');
    // Implement create functionality
  }

  // Download report
  onDownloadReport(): void {
    console.log('Download report clicked');
    // Implement download functionality
  }

  // Get progress percentage for goals
  getGoalProgress(goal: Goal): number {
    return (goal.completed / goal.total) * 100;
  }
}
