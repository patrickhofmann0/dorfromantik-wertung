import { Routes } from '@angular/router';
import { Startview } from './startview/startview';
import { CreateKampagne } from './create-kampagne/create-kampagne';
import { ListKampagne } from './list-kampagne/list-kampagne';
import { DetailsKampagne } from './details-kampagne/details-kampagne';

export const routes: Routes = [
    {
        component: Startview,
        path: '',
        pathMatch: 'full'
    },
    { 
        component: CreateKampagne, 
        path: 'create',
        pathMatch: 'full'
    },
    {
        component: ListKampagne,
        path: 'list',
        pathMatch: 'full'
    },
    {
        component: DetailsKampagne,
        path: 'details/:id',
        pathMatch: 'full'
    }
];
