import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonAvatar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { call, mail, person, star } from 'ionicons/icons';

interface Volunteer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  phone: string;
  email: string;
  available: boolean;
}

@Component({
  selector: 'app-volunteer-support',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Volunteer Support</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="volunteers-content">
      <div class="volunteers-container">
        <div class="section-header">
          <h2>Available Volunteers & Doctors</h2>
          <p>Connect with healthcare professionals and volunteers</p>
        </div>

        <div class="volunteers-list">
          <ion-card *ngFor="let volunteer of volunteers" class="volunteer-card" [class.unavailable]="!volunteer.available">
            <ion-card-content>
              <div class="volunteer-info">
                <div class="volunteer-avatar">
                  <ion-icon name="person" size="large"></ion-icon>
                </div>
                <div class="volunteer-details">
                  <h3>{{ volunteer.name }}</h3>
                  <p class="specialty">{{ volunteer.specialty }}</p>
                  <div class="rating">
                    <ion-icon name="star" *ngFor="let star of getStars(volunteer.rating)" color="warning"></ion-icon>
                    <span class="rating-text">{{ volunteer.rating }}/5</span>
                  </div>
                  <div class="availability" [class.available]="volunteer.available">
                    {{ volunteer.available ? 'Available Now' : 'Currently Busy' }}
                  </div>
                </div>
              </div>
              
              <div class="contact-buttons" *ngIf="volunteer.available">
                <ion-button fill="outline" size="small" (click)="callVolunteer(volunteer.phone)">
                  <ion-icon name="call" slot="start"></ion-icon>
                  Call
                </ion-button>
                <ion-button fill="outline" size="small" (click)="emailVolunteer(volunteer.email)">
                  <ion-icon name="mail" slot="start"></ion-icon>
                  Email
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./volunteer-support.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonAvatar, IonBackButton, IonButtons],
})
export class VolunteerSupportPage {
  volunteers: Volunteer[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      specialty: 'General Medicine',
      rating: 4.8,
      phone: '+1-555-0123',
      email: 'dr.wilson@email.com',
      available: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      rating: 4.9,
      phone: '+1-555-0124',
      email: 'dr.chen@email.com',
      available: true
    },
    {
      id: '3',
      name: 'Nurse Jennifer Adams',
      specialty: 'Home Care Nursing',
      rating: 4.7,
      phone: '+1-555-0125',
      email: 'j.adams@email.com',
      available: false
    },
    {
      id: '4',
      name: 'Mary Rodriguez',
      specialty: 'Companion Care',
      rating: 4.6,
      phone: '+1-555-0126',
      email: 'm.rodriguez@email.com',
      available: true
    },
    {
      id: '5',
      name: 'Dr. James Thompson',
      specialty: 'Geriatric Medicine',
      rating: 4.9,
      phone: '+1-555-0127',
      email: 'dr.thompson@email.com',
      available: true
    }
  ];

  constructor() {
    addIcons({ call, mail, person, star });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  callVolunteer(phone: string) {
    // In a real app, this would initiate a phone call
    window.open(`tel:${phone}`);
  }

  emailVolunteer(email: string) {
    // In a real app, this would open the email client
    window.open(`mailto:${email}`);
  }
}