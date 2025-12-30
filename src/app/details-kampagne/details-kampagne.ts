import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KampagneService } from '../kampagne-service';
import { Kampagne } from '../model/kampagne';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details-kampagne',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './details-kampagne.html',
  styleUrl: './details-kampagne.scss',
})
export class DetailsKampagne implements OnInit {

  // get id from route and load kampagne details
  id!: string;
  kampagne!: Kampagne;

  constructor(
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
  }
  

}
