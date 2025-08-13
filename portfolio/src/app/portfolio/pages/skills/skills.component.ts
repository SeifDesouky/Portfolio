import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor(public global: GlobalService) { }
  categories: any[] = [];
  Skills :any = [];
  ngOnInit() {
    this.global.getSkills().subscribe(res => {
      this.Skills = res.data;
      this.categories = [...new Set(res.data.map((element: any) => element.category))]
    })
  }
}
