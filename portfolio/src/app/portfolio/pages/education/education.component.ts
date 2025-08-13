import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  constructor(public global: GlobalService) {
    console.log("ssssssssss");

   }
  education: any = [];
  ngOnInit() {
    this.global.getEducation().subscribe(res => {
      console.log(res.data);
      this.education = res.data;
    })
  }
}
