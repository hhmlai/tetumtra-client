import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'translate',
    component: TabsPage,
    children: [
      {
        path: 'portuguese-tetum',
        loadChildren: () => import('../por-tet/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tetum-portuguese',
        loadChildren: () => import('../tet-por/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: '',
        redirectTo: '/translate/tetum-portuguese',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/translate/tetum-portuguese',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
