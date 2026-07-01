import { Component  } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../services/global.service';
import { environment } from '../../../../environments/environment';
import { HomeContent, HomeFormValue } from '../../../models/portfolio.models';
@Component({
  selector: 'app-home-dashboard',
  standalone: false,
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent {
  homeForm!: FormGroup;
  staticUrl = `${environment.mediaUrl}/images/`;
  home: HomeContent | undefined;
  fileName: string = '';

  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.global.getHome().subscribe(res => {
      this.home = res.data[0];
      this.initForm();
    });
  }

  initForm() {
    const rolesArray = this.home?.roles || [];

    this.homeForm = new FormGroup({
      title: new FormControl(this.home?.title || '', [Validators.required]),
      description: new FormControl(this.home?.description || '', [Validators.required]),
      linkdin: new FormControl(this.home?.linkdin || ''),
      github: new FormControl(this.home?.github || ''),
      instagram: new FormControl(this.home?.instagram || ''),
      facebook: new FormControl(this.home?.facebook || ''),
      cv: new FormControl(''),
      profileImg: new FormControl(''),
      logo: new FormControl(this.home?.logo || ''),
      roles: new FormArray(
        rolesArray.map((role: string) => new FormControl(role, Validators.required))
      )
    });
  }

  get roles(): FormArray {
    return this.homeForm.get('roles') as FormArray;
  }

  addRole() {
    this.roles.push(new FormControl('', Validators.required));
  }

  removeRole(index: number) {
    this.roles.removeAt(index);
  }

  onSubmit() {
    const formData = new FormData();
    const payload = this.homeForm.getRawValue() as HomeFormValue;

    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('linkdin', payload.linkdin);
    formData.append('github', payload.github);
    formData.append('instagram', payload.instagram);
    formData.append('facebook', payload.facebook);
    formData.append('logo', payload.logo);

    const cvFile = this.homeForm.get('cv')?.value;
    if (cvFile && cvFile instanceof File) {
      formData.append('cv', cvFile);
    }
    const profileImgFile = this.homeForm.get('profileImg')?.value;
    if (profileImgFile && profileImgFile instanceof File) {
      formData.append('profileImg', profileImgFile);
    }

    formData.append('roles', JSON.stringify(payload.roles));

    this.global.updateHome(formData).subscribe(res => {});
  }

profilePreview: string | null = null;
cvName: string = '';

onFileSelected(event: Event, controlName: string) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.homeForm.get(controlName)?.setValue(file);

    if (controlName === 'cv') {
      this.cvName = file.name;
    }

    if (controlName === 'profileImg') {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}

}
