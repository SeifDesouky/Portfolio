import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';
import { SkillCategoryFormValue } from '../../../../models/portfolio.models';

@Component({
  selector: 'app-add-skill',
  standalone: false,
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
   skillsForm!: FormGroup;
  isSubmitted: boolean = false;
  @ViewChildren('skillItem', { read: ElementRef }) skillItems!: QueryList<ElementRef<HTMLElement>>;
  constructor(private global:GlobalService){}
  ngOnInit() {
    this.skillsForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      skill: new FormArray([
        this.createSkillGroup()
      ])
    })
  }

  createSkillGroup():FormGroup {
    return new FormGroup({
        name:new FormControl('',[Validators.required,Validators.minLength(3)]),
        img:new FormControl('',[Validators.required]),
    })
  }

  get skills() {
    return (this.skillsForm.get('skill') as FormArray).controls
  }

  addSkill() {
    const skillsArray = this.skillsForm.get('skill') as FormArray;
    const lastSkillGroup = skillsArray.at(skillsArray.length - 1) as FormGroup;

    if (lastSkillGroup.invalid) {
      lastSkillGroup.markAllAsTouched();
      return;
    }


    skillsArray.push(this.createSkillGroup());

    requestAnimationFrame(() => {
      this.skillItems.last?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    this.isSubmitted=false
}


  removeSkill(index: number) {
    (this.skillsForm.get('skill') as FormArray).removeAt(index)
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.skillsForm.valid) {
      const payload = this.skillsForm.getRawValue() as SkillCategoryFormValue;
      this.global.addSkill(payload).subscribe();
    }

  }
}
