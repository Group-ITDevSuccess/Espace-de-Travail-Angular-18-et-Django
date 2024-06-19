import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { AuthsService } from './services/auths.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbPaginationModule, NgbAlertModule],
  template: `<router-outlet />`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '01-todo-app';
}
