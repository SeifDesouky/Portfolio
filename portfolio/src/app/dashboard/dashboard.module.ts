import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { EducationDashboardComponent } from './pages/education-dashboard/education-dashboard.component';
import { AddEducationComponent } from './pages/education-dashboard/add-education/add-education.component';
import { TiltDirective } from '../directives/title.directive';
import { UpdateEducationComponent } from './pages/education-dashboard/update-education/update-education.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AddSkillComponent } from './pages/skills/add-skill/add-skill.component';
import { UpdateSkillComponent } from './pages/skills/update-skill/update-skill.component';
import { ContactDashboardComponent } from './pages/contact-dashboard/contact-dashboard.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { UpdateProjectComponent } from './pages/project-dashboard/update-project/update-project.component';
import { AddProjectComponent } from './pages/project-dashboard/add-project/add-project.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeDashboardComponent,
    SideBarComponent,
    EducationDashboardComponent,
    AddEducationComponent,
    UpdateEducationComponent,
    SkillsComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    ContactDashboardComponent,
    ProjectDashboardComponent,
    UpdateProjectComponent,
    AddProjectComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TiltDirective
  ]
})
export class DashboardModule { }
