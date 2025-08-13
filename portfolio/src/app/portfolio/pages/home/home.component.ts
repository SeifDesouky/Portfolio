import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeContent :any;
  constructor(public global: GlobalService) {}
  ngOnInit() {
    this.global.getHome().subscribe(res => {
      // console.log(res.data[0]);
      this.homeContent = res.data[0];
      console.log(this.homeContent);
    });
  }
}
