import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KampagneService } from '../kampagne-service';
import { Kampagne } from '../model/kampagne';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Wertung } from '../model/wertung';

@Component({
  selector: 'app-details-kampagne',
  imports: [MatExpansionModule, MatButtonModule, DatePipe],
  templateUrl: './details-kampagne.html',
  styleUrl: './details-kampagne.scss',
})
export class DetailsKampagne implements OnInit {

  // get id from route and load kampagne details
  id!: string;
  kampagne!: Kampagne;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private kampagneService: KampagneService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadKampagneDetails();
  }

  loadKampagneDetails() {
    this.kampagne = this.kampagneService.getKampagneById(this.id)!;
    // sort wertungen by date descending
    this.kampagne.wertungen.sort((a: Wertung, b: Wertung) => {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });


  }

  navigateToCreateWertung() {
    this.router.navigate(['/create-wertung', this.id]);
  }


}
