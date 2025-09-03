import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Service {
icon: string; // inline SVG path string
title: string;
tagline: string;
bullets: string[];
cta?: string;
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
        this.services = data;
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

    //[
    //   {
    //     icon: 'M5 12h14M12 5l7 7-7 7',
    //     title: 'Website Development',
    //     tagline: 'A modern website that makes your business stand out.',
    //     bullets: [
    //       'Looks great on all devices',
    //       'Easy to use and navigate',
    //       'Designed to attract and keep visitors'
    //     ],
    //     cta: 'Build My Website'
    //   },
    //   {
    //     icon: 'M4 6h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm4 0V4h8v2',
    //     title: 'Interactive Web Apps',
    //     tagline: 'Fast and engaging applications that feel like real apps.',
    //     bullets: [
    //       'Smooth user experience',
    //       'Tailored to your business needs',
    //       'Keeps users engaged and happy'
    //     ],
    //     cta: 'Make It Interactive'
    //   },
    //   {
    //     icon: 'M3 12l9-9 9 9-9 9-9-9zm9-5v10',
    //     title: 'Online Systems',
    //     tagline: 'Reliable solutions to manage your data and business online.',
    //     bullets: [
    //       'Safe and secure systems',
    //       'Easy to manage your content',
    //       'Scales as your business grows'
    //     ],
    //     cta: 'Get My System'
    //   },
    //   {
    //     icon: 'M6 6h12v12H6z M9 9h6v6H9z',
    //     title: 'E‑commerce Stores',
    //     tagline: 'Sell your products online with a complete shop setup.',
    //     bullets: [
    //       'Product catalog and shopping cart',
    //       'Secure payments integration',
    //       'Manage orders and customers easily'
    //     ],
    //     cta: 'Start Selling Online'
    //   },
    //   {
    //     icon: 'M12 2v4m0 12v4M2 12h4m12 0h4',
    //     title: 'Support & Improvements',
    //     tagline: 'Keep your website fast, secure, and always up‑to‑date.',
    //     bullets: [
    //       'Fixes and updates when needed',
    //       'Better performance and speed',
    //       'Continuous support for your growth'
    //     ],
    //     cta: 'Keep My Site Updated'
    //   }
    // ];
