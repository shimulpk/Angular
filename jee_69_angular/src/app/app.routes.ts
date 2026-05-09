import { Routes } from '@angular/router';
import { Home } from './component/layout/home/home';
import { ListStudent } from './component/student/list-student/list-student';
import { AddEditStudent } from './component/student/add-edit-student/add-edit-student';
import { Department } from './component/department/department';


export const routes: Routes = [

    {path: '',component: Home},
    {path: 'all_stu',component: ListStudent},
    {path: 'add', component: AddEditStudent},
   {path: 'all_stu/edit/:id', component: AddEditStudent},
   {path: 'dep', component: Department}

   
   
];
