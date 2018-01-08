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
import { DashboardComponent } from './Dashboard/dashboard.component';
import { OverviewComponent } from './Overview/overview.component';
import { TransactionComponent } from './Transaction/transaction.component';
import { RechargeComponent } from './Recharge/recharge.component';
import { WithdrawalComponent } from './Withdrawal/withdrawal.component';
import { ValidateStatusComponent } from './ValidationStatus/validatestatus.component';
import { NavService } from './Service/nav.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    HeaderComponent,
    SignUpComponent,
    ForgotComponent,
    ValidateComponent,
    DashboardComponent,
    OverviewComponent,
    TransactionComponent,
    RechargeComponent,
    WithdrawalComponent,
    ValidateStatusComponent
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
      {path:'dashboard',component: DashboardComponent,
        children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'recharge', component: RechargeComponent },
      { path: 'withdrawal', component: WithdrawalComponent },
    ]},
      {path:'validate/:id',component: ValidateComponent},
      {path:'validatestatus/:id',component: ValidateStatusComponent},
      {path:'',component:HomeComponent},
      {path:'**',component:HomeComponent}
    ])
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
