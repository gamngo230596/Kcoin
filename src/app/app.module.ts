import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule, Headers} from '@angular/http';
import { HomeComponent } from './Home/home.component';
import { SignInComponent } from './User/SignIn/signin.component';
import { SignUpComponent } from './User/SignUp/signup.component';
import { ForgotComponent } from './User/Forgot/forgot.component';
import { ValidateComponent } from './User/Validation/validate.component';
import { HeaderComponent } from './Header/header.component';
import { NavService } from './Service/nav.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    HeaderComponent,
    SignUpComponent,
    ForgotComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'signin',component: SignInComponent},
      {path:'signup',component: SignUpComponent},
      {path:'forgot',component: ForgotComponent},
      {path:'validate/:id',component: ValidateComponent},
      {path:'',component:HomeComponent},
      {path:'**',component:HomeComponent}
    ])
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
