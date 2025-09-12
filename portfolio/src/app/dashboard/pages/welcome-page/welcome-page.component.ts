import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  projectCount: any
  skillsCount: any;
  messsageCount: any;
  constructor(private global:GlobalService) {}

  ngOnInit() {
    this.global.getProjects().subscribe(res => {
      this.projectCount = res.count
    })
    this.global.getSkills().subscribe(res => {
      this.skillsCount = res.count;
    })
    this.global.getComment().subscribe(res => {
      this.messsageCount=res.count
    })
  }
}
