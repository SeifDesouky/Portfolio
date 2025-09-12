import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Service {
icon: string;
title: string;
tagline: string;
bullets: string[];
cta?: string;
isDeleted:boolean
}
@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  loading = true;
  services: Service[] = [];

  constructor(
    private host: ElementRef,
    private global: GlobalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.global.getServices().subscribe({
      next: (data) => {
        this.services = data.filter( (d:Service)=>!d.isDeleted);
        console.log('Services from API:', this.services);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching services:', err);
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.ngZone.run(() => {
                entry.target.classList.add('reveal-in');
                observer.unobserve(entry.target);
              });
            }
          });
        },
        { root: null, threshold: 0.15 }
      );

      const cards: NodeListOf<HTMLElement> =
        this.host.nativeElement.querySelectorAll('.service-card');

      cards.forEach((el, i) => {
        el.style.transitionDelay = `${i * 90}ms`;
        observer.observe(el);
      });
    });
  }
}
