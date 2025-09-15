import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';  // 👈 import TitleCasePipe here
import { FirestoreService, DoctorAppointment } from '../../services/firestore.service';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, 
  IonButtons, IonFab, IonFabButton, IonIcon, IonModal, IonBadge 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, calendar, person, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.page.html',  // 👈 moved template to HTML file for clarity
  styleUrls: ['./doctor-appointments.page.css'],
  standalone: true,
  imports: [
    CommonModule,       // 👈 gives you *ngIf, *ngFor
    FormsModule, 
    TitleCasePipe,      // 👈 makes the titlecase pipe available
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonInput, IonItem, IonLabel, IonList, IonBackButton, 
    IonButtons, IonFab, IonFabButton, IonIcon, IonModal, IonBadge
  ],
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
