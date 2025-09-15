import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonText, IonBackButton, IonButtons, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="login-content">
      <div class="login-container">
        <ion-card class="login-card">
          <ion-card-header>
            <ion-card-title>Welcome Back</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form (ngSubmit)="onLogin()" #loginForm="ngForm">
              <ion-item>
                <ion-label position="stacked">Email</ion-label>
                <ion-input 
                  type="email" 
                  [(ngModel)]="email" 
                  name="email"
                  required
                  placeholder="Enter your email">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input 
                  type="password" 
                  [(ngModel)]="password" 
                  name="password"
                  required
                  placeholder="Enter your password">
                </ion-input>
              </ion-item>

              <div class="error-message" *ngIf="errorMessage">
                <ion-text color="danger">{{ errorMessage }}</ion-text>
              </div>

              <ion-button 
                expand="block" 
                type="submit" 
                [disabled]="!loginForm.form.valid || loading"
                class="login-submit-btn">
                <ion-spinner *ngIf="loading" name="crescent"></ion-spinner>
                <span *ngIf="!loading">Login</span>
              </ion-button>
            </form>

            <div class="signup-link">
              <ion-text>
                Don't have an account? 
                <a (click)="goToSignup()">Sign Up</a>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonText, IonBackButton, IonButtons, IonSpinner, FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin() {
    this.loading = true;
    this.errorMessage = '';

    const result = await this.authService.signIn(this.email, this.password);
    
    if (!result.success) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
    
    this.loading = false;
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}