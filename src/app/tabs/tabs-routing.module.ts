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
        path: 'tetum-english',
        loadChildren: () => import('../tet-eng/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'english-tetum',
        loadChildren: () => import('../eng-tet/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: '',
        redirectTo: '/translate/tetum-english',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/translate/tetum-english',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
