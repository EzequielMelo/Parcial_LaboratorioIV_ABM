import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userType: string | null = null;
  auth: boolean = false;
  protected authService = inject(AuthServiceService);

  constructor() {
    this.authService.authUser$.subscribe((response) => {
      if (response) {
        this.auth = true;
      } else {
        this.auth = false;
      }
    });
    this.authService.user$.subscribe((user: any | null) => {
      this.userType = user ? user.userType : null;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
