import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-startview',
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './startview.html',
  styleUrl: './startview.scss',
})
export class Startview {

}
