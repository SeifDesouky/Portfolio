import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeContent: any;
  loading: boolean = true;
  staticUrl = 'http://localhost:3000/images/';
  staticFiles = 'http://localhost:3000/files/';

  roles: string[] = [];
  currentText: string = '';
  private roleIndex: number = 0;
  private charIndex: number = 0;
  private typingSpeed: number = 100;
  private erasingSpeed: number = 50;
  private delayBetweenWords: number = 1500;

  constructor(public global: GlobalService) {}

  ngOnInit() {
    AOS.init({ duration: 900, once: true, easing: 'ease' });
    this.global.getHome().subscribe(res => {
      this.homeContent = res.data[0];
      this.roles = this.homeContent.roles;
      this.loading = false;
      AOS.refreshHard();
      setTimeout(() => {
        this.type();
      }, 1000);
    });
  }

  ngAfterViewInit() {
    AOS.init({ duration: 900, once: true, easing: 'ease' });
  }

  private type() {
    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex < currentRole.length) {
      this.currentText += currentRole.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      setTimeout(() => this.erase(), this.delayBetweenWords);
    }
  }

  private erase() {
    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex > 0) {
      this.currentText = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.erase(), this.erasingSpeed);
    } else {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      setTimeout(() => this.type(), this.typingSpeed);
    }
  }
}
