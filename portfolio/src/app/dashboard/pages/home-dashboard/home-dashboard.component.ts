import { Component  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-home-dashboard',
  standalone: false,
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent {

  homeForm!: FormGroup;


  constructor(private global: GlobalService) {}
  home: any ;
  ngOnInit(): void {
    this.global.getHome().subscribe(res => {
      this.home = res.data[0];
      this.homeForm = new FormGroup({
        title: new FormControl(this.home.title, [Validators.required]),
        description: new FormControl(this.home.description, [Validators.required]),
        linkdin: new FormControl(this.home.linkdin, [Validators.required]),
        github: new FormControl(this.home.github,[Validators.required]),
        instagram: new FormControl(this.home.instagram, [Validators.required]),
        facebook: new FormControl(this.home.facebook, [Validators.required]),
        cv: new FormControl(this.home.cv, [Validators.required]),
        profileImg: new FormControl(this.home.profileImg, [Validators.required]),
        logo: new FormControl(this.home.logo || '')
      });
    });

    
  }

  onSubmit() {

    const formData = new FormData;

    formData.append('title',this.homeForm.get('title')?.value)
    formData.append('description',this.homeForm.get('description')?.value)
    formData.append('linkdin',this.homeForm.get('linkdin')?.value)
    formData.append('github',this.homeForm.get('github')?.value)
    formData.append('instagram',this.homeForm.get('instagram')?.value)
    formData.append('facebook',this.homeForm.get('facebook')?.value)
    formData.append('cv',this.homeForm.get('cv')?.value)
    formData.append('profileImg',this.homeForm.get('profileImg')?.value)
    formData.append('logo',this.homeForm.get('logo')?.value)
    this.global.updateHome(formData).subscribe(res=>console.log(res));


  }
  fileName: string = '';

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.fileName = file.name;

    this.homeForm.get('cv')?.setValue(file);
  }
  }
}
