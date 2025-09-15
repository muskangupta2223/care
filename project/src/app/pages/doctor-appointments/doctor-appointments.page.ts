import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService, DoctorAppointment } from '../../services/firestore.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, calendar, person, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-doctor-appointments',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Doctor Appointments</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="appointments-content">
      <div class="appointments-container">
        <div class="appointments-list" *ngIf="appointments.length > 0">
          <ion-card *ngFor="let appointment of appointments" class="appointment-card" [class.completed]="appointment.status === 'completed'">
            <ion-card-content>
              <div class="appointment-info">
                <div class="doctor-icon">
                  <ion-icon name="person" color="primary"></ion-icon>
                </div>
                <div class="appointment-details">
                  <h3>{{ appointment.doctorName }}</h3>
                  <p class="date-time">
                    <ion-icon name="calendar" size="small"></ion-icon>
                    {{ appointment.date }} at {{ appointment.time }}
                  </p>
                  <ion-badge [color]="appointment.status === 'completed' ? 'success' : 'warning'">
                    {{ appointment.status | titlecase }}
                  </ion-badge>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="empty-state" *ngIf="appointments.length === 0">
          <ion-icon name="calendar" size="large"></ion-icon>
          <h3>No Appointments Scheduled</h3>
          <p>Book your first appointment with a doctor</p>
        </div>
      </div>

      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button (click)="openAddModal()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-modal [isOpen]="isModalOpen" (willDismiss)="closeModal()">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Book Appointment</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="closeModal()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="modal-content">
            <form (ngSubmit)="addAppointment()" #appointmentForm="ngForm">
              <ion-item>
                <ion-label position="stacked">Doctor Name</ion-label>
                <ion-input 
                  [(ngModel)]="newAppointment.doctorName" 
                  name="doctorName"
                  required
                  placeholder="Enter doctor's name">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Date</ion-label>
                <ion-input 
                  type="date"
                  [(ngModel)]="newAppointment.date" 
                  name="date"
                  required>
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Time</ion-label>
                <ion-input 
                  type="time"
                  [(ngModel)]="newAppointment.time" 
                  name="time"
                  required>
                </ion-input>
              </ion-item>

              <ion-button 
                expand="block" 
                type="submit" 
                [disabled]="!appointmentForm.form.valid"
                class="add-btn">
                Book Appointment
              </ion-button>
            </form>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  `,
  styleUrls: ['./doctor-appointments.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal, IonBadge, FormsModule],
})
export class DoctorAppointmentsPage implements OnInit {
  appointments: DoctorAppointment[] = [];
  isModalOpen = false;
  newAppointment = {
    doctorName: '',
    date: '',
    time: '',
    status: 'upcoming' as 'upcoming' | 'completed'
  };

  constructor(private firestoreService: FirestoreService) {
    addIcons({ add, calendar, person, checkmark });
  }

  async ngOnInit() {
    await this.loadAppointments();
  }

  async loadAppointments() {
    this.appointments = await this.firestoreService.getAppointments();
  }

  openAddModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newAppointment = { doctorName: '', date: '', time: '', status: 'upcoming' };
  }

  async addAppointment() {
    const result = await this.firestoreService.addAppointment(this.newAppointment);
    if (result.success) {
      await this.loadAppointments();
      this.closeModal();
    }
  }
}