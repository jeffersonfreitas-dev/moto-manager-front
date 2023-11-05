// import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
// import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string = '';

  // constructor(private keycloakService: KeycloakService) {}


  ngOnInit(): void {
    this.getuser();
  }

  getuser(): void {
    // this.username = this.keycloakService.getUsername();
    this.username = 'Jefferson';
  }

  logout(): void {
    // this.keycloakService.logout(url);
  }
}
