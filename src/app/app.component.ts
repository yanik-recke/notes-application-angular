import { Component, NgZone, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { KeycloakService } from './services/keycloak.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotesService } from './services/notes.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sub!: Subscription;

  constructor(private zone: NgZone, readonly keycloak: KeycloakService, readonly notesService: NotesService) {

  }

  // getMessages(): Observable<any> {
  //   let source = new EventSource("http://localhost:8080/stream");

  //   return new Observable(observer => {
  //     source.onmessage = event => {
  //       observer.next(event)
  //       this.zone.run(() => {
  //         observer.next(event.data);
  //       })
  //     }

  //     source.onerror = event => {
  //       this.zone.run(() => {
  //         observer.error(event);
  //       })
  //     }
  //   });
  // }

  // ngOnInit(): void {

  //   this.sub = this.getMessages().subscribe({
  //     next: data => {
  //       console.log(data);
  //     },
  //     error: err => console.error(err)
  //   });
  // }

  handleCheckboxChange(event: MatCheckboxChange) {
    this.notesService.withDelay = event.checked;
  }

  title = 'notes_angular_frontend';
}
