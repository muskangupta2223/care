import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

export interface MedicineReminder {
  id?: string;
  uid: string;
  medicineName: string;
  time: string;
  notes: string;
}

export interface DoctorAppointment {
  id?: string;
  uid: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}

export interface EmergencyContact {
  id?: string;
  uid: string;
  name: string;
  phone: string;
  relation: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  // Medicine Reminders
  async addReminder(reminder: Omit<MedicineReminder, 'uid'>) {
    const user = this.authService.getCurrentUser();
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const reminderData = { ...reminder, uid: user.uid };
      await addDoc(collection(this.firestore, 'reminders'), reminderData);
      return { success: true };
    } catch (error) {
      console.error('Error adding reminder:', error);
      return { success: false, error };
    }
  }

  async getReminders(): Promise<MedicineReminder[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    try {
      const q = query(collection(this.firestore, 'reminders'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicineReminder));
    } catch (error) {
      console.error('Error getting reminders:', error);
      return [];
    }
  }

  // Doctor Appointments
  async addAppointment(appointment: Omit<DoctorAppointment, 'uid'>) {
    const user = this.authService.getCurrentUser();
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const appointmentData = { ...appointment, uid: user.uid };
      await addDoc(collection(this.firestore, 'appointments'), appointmentData);
      return { success: true };
    } catch (error) {
      console.error('Error adding appointment:', error);
      return { success: false, error };
    }
  }

  async getAppointments(): Promise<DoctorAppointment[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    try {
      const q = query(collection(this.firestore, 'appointments'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DoctorAppointment));
    } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
  }

  // Emergency Contacts
  async addEmergencyContact(contact: Omit<EmergencyContact, 'uid'>) {
    const user = this.authService.getCurrentUser();
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const contactData = { ...contact, uid: user.uid };
      await addDoc(collection(this.firestore, 'emergencyContacts'), contactData);
      return { success: true };
    } catch (error) {
      console.error('Error adding emergency contact:', error);
      return { success: false, error };
    }
  }

  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    const user = this.authService.getCurrentUser();
    if (!user) return [];

    try {
      const q = query(collection(this.firestore, 'emergencyContacts'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmergencyContact));
    } catch (error) {
      console.error('Error getting emergency contacts:', error);
      return [];
    }
  }
}