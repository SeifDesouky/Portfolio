import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { environment } from '../../../../environments/environment';
import { HomeContent } from '../../../models/portfolio.models';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeContent: HomeContent | undefined;
  loading: boolean = true;
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  staticUrl = `${environment.mediaUrl}/images/`;
  staticFiles = `${environment.mediaUrl}/files/`;

  roles: string[] = [];
  currentText: string = '';
  private roleIndex: number = 0;
  private charIndex: number = 0;
  private typingSpeed: number = 80;
  private erasingSpeed: number = 35;
  private delayBetweenWords: number = 1200;
  private typingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private erasingTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private startTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(public global: GlobalService) {}

  ngOnInit() {
    this.global.getHome().subscribe(res => {
      this.homeContent = res.data[0];
      this.roles = this.homeContent?.roles ?? [];
      this.loading = false;
      AOS.refresh();
      this.clearTimers();
      if (this.roles.length > 0 && !this.reducedMotion) {
        this.startTimeoutId = setTimeout(() => {
          this.type();
        }, 1000);
      } else {
        this.currentText = this.roles[0] ?? '';
      }
    }, () => {
      this.loading = false;
    });
  }

  private type() {
    if (this.roles.length === 0) {
      this.currentText = '';
      return;
    }

    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex < currentRole.length) {
      this.currentText += currentRole.charAt(this.charIndex);
      this.charIndex++;
      this.typingTimeoutId = setTimeout(() => this.type(), this.typingSpeed);
    } else {
      this.erasingTimeoutId = setTimeout(() => this.erase(), this.delayBetweenWords);
    }
  }

  private erase() {
    if (this.roles.length === 0) {
      this.currentText = '';
      return;
    }

    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex > 0) {
      this.currentText = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
      this.erasingTimeoutId = setTimeout(() => this.erase(), this.erasingSpeed);
    } else {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      this.typingTimeoutId = setTimeout(() => this.type(), this.typingSpeed);
    }
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private clearTimers() {
    if (this.startTimeoutId) clearTimeout(this.startTimeoutId);
    if (this.typingTimeoutId) clearTimeout(this.typingTimeoutId);
    if (this.erasingTimeoutId) clearTimeout(this.erasingTimeoutId);

    this.startTimeoutId = null;
    this.typingTimeoutId = null;
    this.erasingTimeoutId = null;
  }
}
