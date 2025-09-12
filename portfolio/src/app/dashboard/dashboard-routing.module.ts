import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { EducationDashboardComponent } from './pages/education-dashboard/education-dashboard.component';
import { AddEducationComponent } from './pages/education-dashboard/add-education/add-education.component';
import { UpdateEducationComponent } from './pages/education-dashboard/update-education/update-education.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AddSkillComponent } from './pages/skills/add-skill/add-skill.component';
import { UpdateSkillComponent } from './pages/skills/update-skill/update-skill.component';
import { ContactDashboardComponent } from './pages/contact-dashboard/contact-dashboard.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { UpdateProjectComponent } from './pages/project-dashboard/update-project/update-project.component';
import { AddProjectComponent } from './pages/project-dashboard/add-project/add-project.component';
import { ServiceDashboardComponent } from './pages/service-dashboard/service-dashboard.component';
import { AddServiceComponent } from './pages/service-dashboard/add-service/add-service.component';
import { UpdateServiceComponent } from './pages/service-dashboard/update-service/update-service.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
  {path:'',component:WelcomePageComponent},
  {path:'home-dashboard',component:HomeDashboardComponent},
  {path:'education-dashboard',component:EducationDashboardComponent},
  {path:'education-dashboard/addEducation',component:AddEducationComponent},
  {path:'education-dashboard/updateEducation',component:UpdateEducationComponent},
  {path:'skills-dashboard',component:SkillsComponent},
  {path:'skills-dashboard/addSkill',component:AddSkillComponent},
  {path:'skills-dashboard/updateSkill',component:UpdateSkillComponent},
  {path:'contact-dashboard',component:ContactDashboardComponent},
  {path:'project-dashboard',component:ProjectDashboardComponent},
  {path:'project-dashboard/updateProject',component:UpdateProjectComponent},
  {path:'project-dashboard/addProject',component:AddProjectComponent},
  {path:'service-dashboard',component:ServiceDashboardComponent},
  {path:'service-dashboard/addService',component:AddServiceComponent},
  {path:'service-dashboard/updateService',component:UpdateServiceComponent},
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
