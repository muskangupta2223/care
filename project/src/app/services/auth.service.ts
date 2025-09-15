import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
  name: string;
  email: string;
  joiningFor: 'self' | 'parents' | 'volunteer';
  age: number;
  hobbies: string;
  doctorName?: string;
  hospitalName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = user(this.auth);
  currentUser: User | null = null;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.user$.subscribe(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
        if (userDoc.exists()) {
          this.currentUser = userDoc.data() as User;
        }
      } else {
        this.currentUser = null;
      }
    });
  }

  async signUp(userData: Omit<User, 'uid'> & { password: string }) {
    try {
      const { password, ...userInfo } = userData;
      const credential = await createUserWithEmailAndPassword(this.auth, userData.email, password);
      
      const user: User = {
        uid: credential.user.uid,
        ...userInfo
      };

      await setDoc(doc(this.firestore, 'users', credential.user.uid), user);
      this.currentUser = user;
      this.router.navigate(['/dashboard']);
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error };
    }
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error };
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.currentUser = null;
      this.router.navigate(['/home']);
      return { success: true };
    } catch (error) {
      console.error('Signout error:', error);
      return { success: false, error };
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}