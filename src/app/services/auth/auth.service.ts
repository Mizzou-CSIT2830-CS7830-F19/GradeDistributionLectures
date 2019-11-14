import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../../interfaces/user";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: Observable<User>;
  currentAuth: Observable<firebase.User | null>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.afAuth.auth.setPersistence("session");
    this.currentAuth = this.afAuth.authState;
    this.currentUser = this.currentAuth.pipe(
      switchMap((cred: firebase.User | null) => {
        if (cred) {
          return this.afs.doc<User>(`users/${cred.uid}`).valueChanges();
        } else {
          return of(undefined);
        }
      }),
      map(userDetails => userDetails as User)
    );
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      //router navigator homepage
      console.log("Login works");
    } catch (e) {
      throw new Error("Could not login");
    }
  }

  async signUp(email: string, password: string, name: string) {
    await this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User registered succesfully");

        const newUser: User = {
          name,
          email,
          uid: this.afAuth.auth.currentUser.uid
        };

        this.afs
          .doc<User>(`users/${this.afAuth.auth.currentUser.uid}`)
          .set(newUser);
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();

    this.router.navigate(["/login"]);
  }
}
