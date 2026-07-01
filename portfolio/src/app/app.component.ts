import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';
  ngOnInit(): void {
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out',
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
}
