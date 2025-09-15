import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService, MedicineReminder } from '../../services/firestore.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, time, medkit } from 'ionicons/icons';

@Component({
  selector: 'app-medicine-reminders',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Medicine Reminders</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="reminders-content">
      <div class="reminders-container">
        <div class="reminders-list" *ngIf="reminders.length > 0">
          <ion-card *ngFor="let reminder of reminders" class="reminder-card">
            <ion-card-content>
              <div class="reminder-info">
                <div class="medicine-icon">
                  <ion-icon name="medkit" color="primary"></ion-icon>
                </div>
                <div class="reminder-details">
                  <h3>{{ reminder.medicineName }}</h3>
                  <p class="time-info">
                    <ion-icon name="time" size="small"></ion-icon>
                    {{ reminder.time }}
                  </p>
                  <p class="notes" *ngIf="reminder.notes">{{ reminder.notes }}</p>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="empty-state" *ngIf="reminders.length === 0">
          <ion-icon name="medkit" size="large"></ion-icon>
          <h3>No Reminders Set</h3>
          <p>Add your first medicine reminder to get started</p>
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
            <ion-title>Add Medicine Reminder</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="closeModal()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="modal-content">
            <form (ngSubmit)="addReminder()" #reminderForm="ngForm">
              <ion-item>
                <ion-label position="stacked">Medicine Name</ion-label>
                <ion-input 
                  [(ngModel)]="newReminder.medicineName" 
                  name="medicineName"
                  required
                  placeholder="Enter medicine name">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Time</ion-label>
                <ion-input 
                  type="time"
                  [(ngModel)]="newReminder.time" 
                  name="time"
                  required>
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Notes (Optional)</ion-label>
                <ion-input 
                  [(ngModel)]="newReminder.notes" 
                  name="notes"
                  placeholder="e.g., After breakfast">
                </ion-input>
              </ion-item>

              <ion-button 
                expand="block" 
                type="submit" 
                [disabled]="!reminderForm.form.valid"
                class="add-btn">
                Add Reminder
              </ion-button>
            </form>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  `,
  styleUrls: ['./medicine-reminders.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal, FormsModule],
})
export class MedicineRemindersPage implements OnInit {
  reminders: MedicineReminder[] = [];
  isModalOpen = false;
  newReminder = {
    medicineName: '',
    time: '',
    notes: ''
  };

  constructor(private firestoreService: FirestoreService) {
    addIcons({ add, time, medkit });
  }

  async ngOnInit() {
    await this.loadReminders();
  }

  async loadReminders() {
    this.reminders = await this.firestoreService.getReminders();
  }

  openAddModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newReminder = { medicineName: '', time: '', notes: '' };
  }

  async addReminder() {
    const result = await this.firestoreService.addReminder(this.newReminder);
    if (result.success) {
      await this.loadReminders();
      this.closeModal();
    }
  }
}