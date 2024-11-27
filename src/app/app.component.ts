import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './services/database/database.service';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  subscription: Subscription | undefined = undefined;
  datos: any[] = [];
  private db = inject(DatabaseService);

  ngOnInit() {
    /*
    const observable = this.db.getDatos();
    this.subscription = observable.subscribe((resultado) => {
      this.datos = resultado;
    });
    console.log(this.datos);
    */
  }
}
