import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Startview } from "./startview/startview";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dorfromantik-wertung');
}
