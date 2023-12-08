import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ConfigurationComponent } from './component/configuration/configuration.component';
import { ProductsComponent } from './component/products/products.component';
import { AdminComponent } from './component/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'admin', component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
