import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'medicine-reminders',
    loadComponent: () => import('./pages/medicine-reminders/medicine-reminders.page').then((m) => m.MedicineRemindersPage),
  },
  {
    path: 'doctor-appointments',
    loadComponent: () => import('./pages/doctor-appointments/doctor-appointments.page').then((m) => m.DoctorAppointmentsPage),
  },
  {
    path: 'volunteer-support',
    loadComponent: () => import('./pages/volunteer-support/volunteer-support.page').then((m) => m.VolunteerSupportPage),
  },
  {
    path: 'emergency-helpline',
    loadComponent: () => import('./pages/emergency-helpline/emergency-helpline.page').then((m) => m.EmergencyHelplinePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];