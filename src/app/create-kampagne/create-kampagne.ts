import { Component, inject } from '@angular/core';
import { Kampagne } from '../model/kampagne';
import { FormsModule } from '@angular/forms';
import { KampagneService } from '../kampagne-service';
import { Router } from '@angular/router';

/**
 * Component for creating a new campaign.
 */
@Component({
  selector: 'app-create-kampagne',
  imports: [FormsModule],
  templateUrl: './create-kampagne.html',
  styleUrl: './create-kampagne.scss',
})
export class CreateKampagne {
  private kampagneService = inject(KampagneService);
  private router = inject(Router);

  public kampagne: Kampagne = new Kampagne();

  /**
   * Submits the new campaign.
   * It validates the campaign, sets the start date, saves it and navigates to the list view.
   */
  submitKampagneNew(): void {
    this.validate(this.kampagne);
    this.kampagne.startDate = new Date();
    this.kampagneService.saveKampagne(this.kampagne);
    this.router.navigate(['/list']);
  }

  /**
   * Validates the campaign.
   * @param kampagne The campaign to validate.
   */
  validate(kampagne: Kampagne): void {
    if (!kampagne.name || kampagne.name.trim() === '') {
      throw new Error('Der Name der Kampagne ist erforderlich.');
    }
    if (!kampagne.spielleiter || kampagne.spielleiter.trim() === '') {
      throw new Error('Der Spielleiter ist erforderlich.');
    }
    if (!kampagne.anzahlSpieler || kampagne.anzahlSpieler <= 0) {
      throw new Error('Die Anzahl der Spieler muss größer als 0 sein.');
    }
  }
}
