import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreService, EmergencyContact } from '../../services/firestore.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, call, warning, person } from 'ionicons/icons';

@Component({
  selector: 'app-emergency-helpline',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar color="danger">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/dashboard"></ion-back-button>
        </ion-buttons>
        <ion-title>Emergency Helpline</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="emergency-content">
      <div class="emergency-container">
        <!-- Emergency Call Button -->
        <div class="emergency-call-section">
          <ion-card class="emergency-card">
            <ion-card-content>
              <div class="emergency-info">
                <ion-icon name="warning" size="large" color="danger"></ion-icon>
                <h2>Emergency Services</h2>
                <p>For immediate medical emergency</p>
              </div>
              <ion-button expand="block" color="danger" size="large" (click)="callEmergency()" class="emergency-btn">
                <ion-icon name="call" slot="start"></ion-icon>
                Call 911
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Emergency Contacts -->
        <div class="contacts-section">
          <h3>Emergency Contacts</h3>
          
          <div class="contacts-list" *ngIf="emergencyContacts.length > 0">
            <ion-card *ngFor="let contact of emergencyContacts" class="contact-card">
              <ion-card-content>
                <div class="contact-info">
                  <div class="contact-avatar">
                    <ion-icon name="person" color="primary"></ion-icon>
                  </div>
                  <div class="contact-details">
                    <h4>{{ contact.name }}</h4>
                    <p class="relation">{{ contact.relation }}</p>
                    <p class="phone">{{ contact.phone }}</p>
                  </div>
                  <div class="contact-actions">
                    <ion-button fill="clear" (click)="callContact(contact.phone)">
                      <ion-icon name="call" color="primary"></ion-icon>
                    </ion-button>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <div class="empty-contacts" *ngIf="emergencyContacts.length === 0">
            <ion-icon name="person" size="large"></ion-icon>
            <h4>No Emergency Contacts</h4>
            <p>Add emergency contacts for quick access</p>
          </div>
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
            <ion-title>Add Emergency Contact</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="closeModal()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="modal-content">
            <form (ngSubmit)="addEmergencyContact()" #contactForm="ngForm">
              <ion-item>
                <ion-label position="stacked">Name</ion-label>
                <ion-input 
                  [(ngModel)]="newContact.name" 
                  name="name"
                  required
                  placeholder="Enter contact name">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Phone Number</ion-label>
                <ion-input 
                  type="tel"
                  [(ngModel)]="newContact.phone" 
                  name="phone"
                  required
                  placeholder="+1-555-0123">
                </ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Relation</ion-label>
                <ion-input 
                  [(ngModel)]="newContact.relation" 
                  name="relation"
                  required
                  placeholder="e.g., Son, Daughter, Doctor">
                </ion-input>
              </ion-item>

              <ion-button 
                expand="block" 
                type="submit" 
                [disabled]="!contactForm.form.valid"
                class="add-btn">
                Add Contact
              </ion-button>
            </form>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  `,
  styleUrls: ['./emergency-helpline.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, IonButtons, IonFab, IonFabButton, IonIcon, IonModal, FormsModule],
})
export class EmergencyHelplinePage implements OnInit {
  emergencyContacts: EmergencyContact[] = [];
  isModalOpen = false;
  newContact = {
    name: '',
    phone: '',
    relation: ''
  };

  constructor(private firestoreService: FirestoreService) {
    addIcons({ add, call, warning, person });
  }

  async ngOnInit() {
    await this.loadEmergencyContacts();
  }

  async loadEmergencyContacts() {
    this.emergencyContacts = await this.firestoreService.getEmergencyContacts();
  }

  callEmergency() {
    // In a real app, this would call emergency services
    window.open('tel:911');
  }

  callContact(phone: string) {
    window.open(`tel:${phone}`);
  }

  openAddModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newContact = { name: '', phone: '', relation: '' };
  }

  async addEmergencyContact() {
    const result = await this.firestoreService.addEmergencyContact(this.newContact);
    if (result.success) {
      await this.loadEmergencyContacts();
      this.closeModal();
    }
  }
}