import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../services/global.service';

@Component({
  selector: 'app-add-skill',
  standalone: false,
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css'
})
export class AddSkillComponent {
   skillsForm!: FormGroup;
  isSubmitted: boolean = false;
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

    setTimeout(() => {
      const lastSkill = document.querySelector('.skill-item:last-child') as HTMLElement;
        if (lastSkill) {
        lastSkill.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  }, 50);
    this.isSubmitted=false
}


  removeSkill(index: any) {
    (this.skillsForm.get('skill') as FormArray).removeAt(index)
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.skillsForm.valid) {
      console.log(this.skillsForm.value);
      this.global.addSkill(this.skillsForm.value).subscribe(res => {
        console.log(res);
      })
    }

  }
}
