import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonText, IonBackButton, IonButtons, IonSpinner, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="signup-content">
      <div class="signup-container">
        <ion-card class="signup-card">
          <ion-card-header>
            <ion-card-title>Create Account</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form (ngSubmit)="onSignup()" #signupForm="ngForm">
              <ion-item>
                <ion-label position="stacked">Full Name</ion-label>
                <ion-input 
                  [(ngModel)]="formData.name" 
                  name="name"
                  required
                  placeholder="Enter your full name">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Email</ion-label>
                <ion-input 
                  type="email" 
                  [(ngModel)]="formData.email" 
                  name="email"
                  required
                  placeholder="Enter your email">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input 
                  type="password" 
                  [(ngModel)]="formData.password" 
                  name="password"
                  required
                  minlength="6"
                  placeholder="Enter your password">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Confirm Password</ion-label>
                <ion-input 
                  type="password" 
                  [(ngModel)]="confirmPassword" 
                  name="confirmPassword"
                  required
                  placeholder="Confirm your password">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Joining For?</ion-label>
                <ion-select [(ngModel)]="formData.joiningFor" name="joiningFor" required>
                  <ion-select-option value="self">Self</ion-select-option>
                  <ion-select-option value="parents">Parents</ion-select-option>
                  <ion-select-option value="volunteer">Volunteer/Doctor</ion-select-option>
                </ion-select>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Age</ion-label>
                <ion-input 
                  type="number" 
                  [(ngModel)]="formData.age" 
                  name="age"
                  required
                  placeholder="Enter age">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Hobbies</ion-label>
                <ion-input 
                  [(ngModel)]="formData.hobbies" 
                  name="hobbies"
                  placeholder="Enter hobbies (optional)">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Doctor Name (Optional)</ion-label>
                <ion-input 
                  [(ngModel)]="formData.doctorName" 
                  name="doctorName"
                  placeholder="Enter doctor name">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Hospital Name (Optional)</ion-label>
                <ion-input 
                  [(ngModel)]="formData.hospitalName" 
                  name="hospitalName"
                  placeholder="Enter hospital name">
                </ion-input>
              </ion-item>

              <div class="error-message" *ngIf="errorMessage">
                <ion-text color="danger">{{ errorMessage }}</ion-text>
              </div>

              <ion-button 
                expand="block" 
                type="submit" 
                [disabled]="!signupForm.form.valid || loading || !passwordsMatch()"
                class="signup-submit-btn">
                <ion-spinner *ngIf="loading" name="crescent"></ion-spinner>
                <span *ngIf="!loading">Sign Up</span>
              </ion-button>
            </form>

            <div class="login-link">
              <ion-text>
                Already have an account? 
                <a (click)="goToLogin()">Login</a>
              </ion-text>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styleUrls: ['./signup.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonText, IonBackButton, IonButtons, IonSpinner, IonSelect, IonSelectOption, FormsModule],
})
export class SignupPage {
  formData = {
    name: '',
    email: '',
    password: '',
    joiningFor: 'self' as 'self' | 'parents' | 'volunteer',
    age: 0,
    hobbies: '',
    doctorName: '',
    hospitalName: ''
  };
  
  confirmPassword: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  passwordsMatch(): boolean {
    return this.formData.password === this.confirmPassword;
  }

  async onSignup() {
    if (!this.passwordsMatch()) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const result = await this.authService.signUp(this.formData);
    
    if (!result.success) {
      this.errorMessage = 'Failed to create account. Please try again.';
    }
    
    this.loading = false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}