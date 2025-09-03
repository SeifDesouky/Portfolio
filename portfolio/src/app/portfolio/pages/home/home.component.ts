import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  staticFiles='http://localhost:3000/files/'
  constructor(public global: GlobalService) {}

  ngOnInit() {
    this.global.getHome().subscribe(res => {
      this.homeContent = res.data[0];
      this.loading = false;

      AOS.refresh();
    });
  }

  ngAfterViewInit() {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease'
    });
  }
}
