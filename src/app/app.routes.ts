import { Routes } from '@angular/router';
import { PetFormComponent } from './pages/pet-form/pet-form.component';
import { PetReportsComponent } from './pages/pet-reports/pet-reports.component';

export const routes: Routes = [
    {path:'',redirectTo:'register',pathMatch:'full'},
    {path:'register',component:PetFormComponent},
    {path:'report',component:PetReportsComponent}
];
