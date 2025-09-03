import { Component, ElementRef } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
   education: any = [];

  constructor(public global: GlobalService, private el: ElementRef) {}

  ngOnInit() {
    this.global.getEducation().subscribe(res => {
      this.education = res.data;
    });
  }

  ngAfterViewInit() {
    // نراقب العناصر بعد تأكد إنها ظهرت في DOM
    setTimeout(() => this.observeTimelineItems(), 1000);
  }

  observeTimelineItems() {
    const items = this.el.nativeElement.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // مش لازم نتابع بعد ما ظهر
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item: any) => observer.observe(item));
  }
}
