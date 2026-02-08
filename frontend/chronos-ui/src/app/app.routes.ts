import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { JobsComponent } from './pages/jobs.component';
import { ExecutionsComponent } from './pages/execution.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id/executions', component: ExecutionsComponent }
];
