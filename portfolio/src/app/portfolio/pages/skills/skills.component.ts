import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { SkillCategory } from '../../../models/portfolio.models';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor(public global: GlobalService) { }
  categories: string[] = [];
  skills: SkillCategory[] = [];

  trackByIndex(index: number): number {
    return index;
  }

  ngOnInit() {
    this.global.getSkills().subscribe(res => {
      this.skills = res.data;
      this.categories = [...new Set(this.skills.map((element) => element.category))];
    });
  }
}
