import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Wertung } from '../model/wertung';
import { KampagneService } from '../kampagne-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WertungCalculator } from '../model/wertungCalculator';

@Component({
  selector: 'app-create-wertung',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-wertung.html',
  styleUrl: './create-wertung.scss',
})
export class CreateWertung implements OnInit {
  private kampagneService = inject(KampagneService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild('wertungForm') wertungForm!: NgForm;
  wertung: Wertung = new Wertung();
  kampagneId: string = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.kampagneId = id;
    } else {
      // Handle error case where id is not present
      this.router.navigate(['/list']);
    }
  }

  submitWertungNew(): void {
    if (this.wertungForm.valid) {
      this.wertung.dateCreated = new Date();

      const claculator = new WertungCalculator(this.wertung);
      this.wertung.gesamtPunkte = claculator.calculateTotalScore();
      this.wertung.punkteAuftrag = claculator.calculateAufragScore();
      this.wertung.punkteLaengste = claculator.calculatLaengsteScore();
      this.wertung.punkteFahnen = claculator.calculatLaengsteScore();
      this.wertung.punkteFreigespielt = claculator.calculateFreigespieltScore();

      this.kampagneService.addWertungToKampagne(this.kampagneId, this.wertung);
      this.router.navigate(['/details', this.kampagneId]);
    }
  }
}
