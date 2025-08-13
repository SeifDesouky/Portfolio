import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-education-dashboard',
  standalone: false,
  templateUrl: './education-dashboard.component.html',
  styleUrl: './education-dashboard.component.css'
})
export class EducationDashboardComponent {
  eduForm!: FormGroup;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.global.getEducation().subscribe(res => {
      console.log(res);

    }
    )
  }
  onSubmit(){}
}
