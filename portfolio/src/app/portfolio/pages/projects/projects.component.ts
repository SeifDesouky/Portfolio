import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { environment } from '../../../../environments/environment';
import { ProjectEntry } from '../../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects: ProjectEntry[] = [];
  currentIndex = 0;
  isTransitioning = false;
  transitionDirection: 'next' | 'prev' = 'next';
  private transitionTimer: ReturnType<typeof setTimeout> | null = null;
  private swipeStartX: number | null = null;
  projectImg = `${environment.mediaUrl}/projectImg/`;
  @ViewChildren('fadeUp', { read: ElementRef }) animatedElements!: QueryList<ElementRef<HTMLElement>>;

  constructor(private global: GlobalService) {}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit() {
    this.global.getProjects().subscribe(res => {
      this.projects = res.data;
      this.currentIndex = 0;
    });
  }

  get currentProject(): ProjectEntry | undefined {
    return this.projects[this.currentIndex];
  }

  onOpenProject(): void {
    if (this.currentProject?.viewProject) {
      window.open(this.currentProject.viewProject, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('No project URL available');
    }
  }

  onOpenGithub(): void {
    if (this.currentProject?.openProject) {
      window.open(this.currentProject.openProject, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('No GitHub URL available');
    }
  }

  private resetAnimation(): void {
    this.animatedElements?.forEach((el) => {
      el.nativeElement.classList.remove('fade-up');
      void el.nativeElement.offsetWidth;
      el.nativeElement.classList.add('fade-up');
    });
  }

  private setIndex(nextIndex: number, direction: 'next' | 'prev'): void {
    if (!this.projects.length) {
      return;
    }

    this.transitionDirection = direction;
    this.isTransitioning = true;
    this.currentIndex = nextIndex;
    this.resetAnimation();

    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }

    this.transitionTimer = setTimeout(() => {
      this.isTransitioning = false;
    }, 220);
  }

  onNextProject(): void {
    if (!this.projects.length) {
      return;
    }

    const nextIndex = (this.currentIndex + 1) % this.projects.length;
    this.setIndex(nextIndex, 'next');
  }

  onPreviousProject(): void {
    if (!this.projects.length) {
      return;
    }

    const previousIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.projects.length - 1;
    this.setIndex(previousIndex, 'prev');
  }

  onPointerDown(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.swipeStartX === null) {
      return;
    }

    const deltaX = event.clientX - this.swipeStartX;
    this.swipeStartX = null;

    if (Math.abs(deltaX) < 48) {
      return;
    }

    if (deltaX < 0) {
      this.onNextProject();
    } else {
      this.onPreviousProject();
    }
  }

  @HostListener('window:keydown.arrowleft')
  onArrowLeft(): void {
    this.onPreviousProject();
  }

  @HostListener('window:keydown.arrowright')
  onArrowRight(): void {
    this.onNextProject();
  }

  ngOnDestroy(): void {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }
  }

}
