import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
//import { medkit, calendar, people, call, logOut } from !;
import { medkit, calendar, people, call, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-title>Dashboard</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            <ion-icon name="log-out"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="dashboard-content">
      <div class="dashboard-container">
        <div class="welcome-section">
          <h2>Welcome, {{ currentUser?.name }}!</h2>
          <p>How can we assist you today?</p>
        </div>

        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6">
              <ion-card class="feature-card" (click)="navigateTo('/medicine-reminders')">
                <ion-card-content>
                  <div class="card-icon">
                    <ion-icon name="medkit" size="large"></ion-icon>
                  </div>
                  <ion-card-title>Medicine Reminders</ion-card-title>
                  <p>Set and manage your daily medicine schedule</p>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card class="feature-card" (click)="navigateTo('/doctor-appointments')">
                <ion-card-content>
                  <div class="card-icon">
                    <ion-icon name="calendar" size="large"></ion-icon>
                  </div>
                  <ion-card-title>Doctor Appointments</ion-card-title>
                  <p>Book and track your medical appointments</p>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card class="feature-card" (click)="navigateTo('/volunteer-support')">
                <ion-card-content>
                  <div class="card-icon">
                    <ion-icon name="people" size="large"></ion-icon>
                  </div>
                  <ion-card-title>Volunteer Support</ion-card-title>
                  <p>Connect with volunteers and healthcare providers</p>
                </ion-card-content>
              </ion-card>
            </ion-col>

            <ion-col size="12" size-md="6">
              <ion-card class="feature-card" (click)="navigateTo('/emergency-helpline')">
                <ion-card-content>
                  <div class="card-icon">
                    <ion-icon name="call" size="large"></ion-icon>
                  </div>
                  <ion-card-title>Emergency Helpline</ion-card-title>
                  <p>Quick access to emergency contacts</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  `,
  styleUrls: ['./dashboard.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons],
})
export class DashboardPage implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ medkit, calendar, people, call, logOut });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/home']);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async logout() {
    await this.authService.signOut();
  }
}