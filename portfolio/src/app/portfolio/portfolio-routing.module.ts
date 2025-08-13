import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [{
  path: '', component: IndexComponent, children: [
  {path:'home',component:IndexComponent},
  {path:'education',component:IndexComponent},
  // {path:'education',component:IndexComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
