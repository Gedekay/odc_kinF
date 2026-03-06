import { Routes } from '@angular/router';
import { Formation } from './formation/formation';
import { Dashboard } from './dashboard/dashboard';
import { Gestformation } from './gestformation/gestformation';
import { Gestcandidat } from './gestcandidat/gestcandidat';

export const routes: Routes = [
    {
        path:"",
        component: Gestcandidat
    }
];
