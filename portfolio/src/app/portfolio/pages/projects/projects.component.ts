import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  // project = {
  //   number: '01',
  //   title: 'Frontend Project',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.',
  //   technologies: ['Html 5', 'Css 3', 'Javascript']
  // };

  projects: any[] = [];
  currentIndex = 0;
  constructor(private global: GlobalService) {}
  ngOnInit() {
    this.global.getProjects().subscribe(res => {
      this.projects = res.data;
      this.currentIndex = 0;
    });
  }

  get currentProject() {
    return this.projects[this.currentIndex];
  }

onOpenProject(): void {
  if (this.currentProject?.viewProject) {
    window.open(this.currentProject.viewProject, '_blank');
  } else {
    console.warn('No project URL available');
  }
}

onOpenGithub(): void {
  if (this.currentProject?.openProject) {
    window.open(this.currentProject.openProject, '_blank');
  } else {
    console.warn('No GitHub URL available');
  }
}
resetAnimation(): void {
  const animatedElements = document.querySelectorAll('.fade-up');
  animatedElements.forEach(el => {
    el.classList.remove('fade-up');
    void (el as HTMLElement).offsetWidth; // force reflow
    el.classList.add('fade-up');
  });
}

onNextProject(): void {
  this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  this.resetAnimation();
}

onPreviousProject(): void {
  this.currentIndex =
    this.currentIndex > 0 ? this.currentIndex - 1 : this.projects.length - 1;
  this.resetAnimation();
}

}
