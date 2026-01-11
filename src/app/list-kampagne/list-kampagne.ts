import { Component, OnInit, inject } from '@angular/core';
import { KampagneService } from '../kampagne-service';
import { Kampagne } from '../model/kampagne';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-kampagne',
  imports: [RouterModule],
  templateUrl: './list-kampagne.html',
  styleUrl: './list-kampagne.scss',
})
export class ListKampagne implements OnInit {
  private router = inject(Router);
  private kampagneService = inject(KampagneService);

  kampagnenList!: Kampagne[];
  ngOnInit(): void {
    this.loadKampagnen();
  }

  deleteKampagne(id: string) {
    this.kampagneService.deleteKampagne(id);
    this.loadKampagnen();
  }

  loadKampagnen() {
    this.kampagnenList = this.kampagneService.getKampagnen();
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/details', id]);
  }
}
