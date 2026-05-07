import { Routes } from '@angular/router';
import { Home } from './component/layout/home/home';
import { ListStudent } from './component/student/list-student/list-student';

export const routes: Routes = [

    {path: '',component: Home},
    {path: 'all_stu',component: ListStudent}
];
