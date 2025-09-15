import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// ✅ Firebase Auth
import {
  Auth,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

// ✅ Firestore
import {
  Firestore,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';

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
  // 👇 this gives you a reactive observable of Firebase user
  user$ = user(this.auth);
  currentUser: User | null = null;

  constructor(
    private auth: Auth,       // ✅ works because `provideAuth(() => getAuth())` is in main.ts
    private firestore: Firestore, // ✅ works because `provideFirestore(() => getFirestore())` is in main.ts
    private router: Router
  ) {
    this.user$.subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(this.firestore, 'users', firebaseUser.uid));
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

      const newUser: User = {
        uid: credential.user.uid,
        ...userInfo
      };

      await setDoc(doc(this.firestore, 'users', credential.user.uid), newUser);
      this.currentUser = newUser;
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
