import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../../services/global.service';
import { EducationEntry } from '../../../models/portfolio.models';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
   education: EducationEntry[] = [];
   @ViewChildren('timelineItem', { read: ElementRef }) timelineItems!: QueryList<ElementRef<HTMLElement>>;
   private timelineObserver?: IntersectionObserver;
   private timelineChangesSub?: Subscription;

  constructor(public global: GlobalService) {}

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit() {
    this.global.getEducation().subscribe(res => {
      this.education = res.data;
    });
  }

  ngAfterViewInit() {
    this.timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            this.timelineObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.timelineChangesSub = this.timelineItems.changes.subscribe(() => this.observeTimelineItems());
    this.observeTimelineItems();
  }

  observeTimelineItems() {
    if (!this.timelineObserver) return;

    this.timelineItems?.forEach((item) => this.timelineObserver?.observe(item.nativeElement));
  }

  ngOnDestroy() {
    this.timelineChangesSub?.unsubscribe();
    this.timelineObserver?.disconnect();
  }
}
