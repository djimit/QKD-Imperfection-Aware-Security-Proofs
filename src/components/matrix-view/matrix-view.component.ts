import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { imperfections, PROOF_FIT_COLORS, ProofFit } from '../../data/qkd-data';
import { EvidenceBadgeComponent } from '../shared/evidence-badge/evidence-badge.component';

// Define a type for a single imperfection object
type Imperfection = (typeof imperfections)[0];

@Component({
  selector: 'app-matrix-view',
  templateUrl: './matrix-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EvidenceBadgeComponent],
})
export class MatrixViewComponent {
  imperfections = imperfections;
  proofFitColors = PROOF_FIT_COLORS;

  selectedImperfection: WritableSignal<Imperfection | null> = signal(null);

  openDialog(imperfection: Imperfection) {
    this.selectedImperfection.set(imperfection);
  }

  closeDialog() {
    this.selectedImperfection.set(null);
  }
  
  getProofFitClass(proofFit: ProofFit): string {
    return this.proofFitColors[proofFit] || '';
  }
}
