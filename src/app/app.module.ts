import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/usuario/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './services/login/login.guard';
import { AlertComponent } from './alert/alert.component';
import { ImagePipe } from './pipes/image.pipe';
import { PagesModule } from './pages/pages.module';
import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,    
    FormsModule,
    ReactiveFormsModule,
    PagesModule
  ],
  providers: [UserService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
