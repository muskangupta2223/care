import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-title>Elderly Care & Assistance</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="home-content">
      <div class="home-container">
        <div class="logo-section">
          <h1>🏥 Elderly Care</h1>
          <p>Your trusted companion for health and wellness</p>
        </div>

        <ion-card class="welcome-card">
          <ion-card-header>
            <ion-card-title>Welcome to Elderly Care</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>This app provides comprehensive support for elderly care, including medicine reminders, doctor appointments, volunteer support, and emergency assistance.</p>
            
            <div class="features-list">
              <div class="feature-item">✓ Medicine Reminders</div>
              <div class="feature-item">✓ Doctor Appointments</div>
              <div class="feature-item">✓ Volunteer Support</div>
              <div class="feature-item">✓ Emergency Helpline</div>
            </div>
          </ion-card-content>
        </ion-card>

        <div class="buttons-container">
          <ion-button expand="block" size="large" (click)="goToLogin()" class="login-btn">
            Login
          </ion-button>
          <ion-button expand="block" size="large" fill="outline" (click)="goToSignup()" class="signup-btn">
            Sign Up
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./home.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}