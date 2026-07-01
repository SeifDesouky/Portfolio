import { AfterViewInit, Component, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { ServiceEntry } from '../../../models/portfolio.models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  loading = true;
  services: ServiceEntry[] = [];
  @ViewChildren('serviceCard', { read: ElementRef }) serviceCards!: QueryList<ElementRef<HTMLElement>>;
  private observer?: IntersectionObserver;
  private cardsChangesSub?: Subscription;

  trackByIndex(index: number): number {
    return index;
  }

  constructor(
    private global: GlobalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.global.getServices().subscribe({
      next: (data) => {
        this.services = data.data.filter((d) => !d.isDeleted);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.ngZone.run(() => {
                entry.target.classList.add('reveal-in');
                this.observer?.unobserve(entry.target);
              });
            }
          });
        },
        { root: null, threshold: 0.15 }
      );

      this.cardsChangesSub = this.serviceCards.changes.subscribe(() => this.observeCards());
      this.observeCards();
    });
  }

  private observeCards(): void {
    if (!this.observer) return;

    this.serviceCards?.forEach((card, i) => {
      card.nativeElement.style.transitionDelay = `${i * 90}ms`;
      this.observer?.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.cardsChangesSub?.unsubscribe();
    this.observer?.disconnect();
  }
}
