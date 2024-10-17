import { Routes } from '@angular/router';
import { CardListComponent } from './component/card-list/card-list.component';
import { CardFormComponent } from './component/card-form/card-form.component';
import { CardFormInputByFileComponent } from './component/card-form/card-form-input-by-file/card-form-input-by-file.component'; 
export const routes: Routes = [
    
    {
      path: '',
      component: CardListComponent, // This will be your main layout
  },
  {
      path: 'card-list', // This will navigate directly to CardListComponent without LayoutComponent
      component: CardListComponent,
  },
  {
      path: 'card-form', // New route for the CardFormComponent
      component: CardFormComponent,
  },
  {
    path: 'card-inout-by-file', // New route for the CardFormComponent
    component: CardFormInputByFileComponent,
},
];