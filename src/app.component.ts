import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynthesisViewComponent } from './components/synthesis-view/synthesis-view.component';
import { MatrixViewComponent } from './components/matrix-view/matrix-view.component';
import { PlaybookViewComponent } from './components/playbook-view/playbook-view.component';
import { PortfolioViewComponent } from './components/portfolio-view/portfolio-view.component';
import { TimelineViewComponent } from './components/timeline-view/timeline-view.component';
import { BlindSpotsViewComponent } from './components/blind-spots-view/blind-spots-view.component';
import { EvidenceBadgeComponent } from './components/shared/evidence-badge/evidence-badge.component';
import { EVIDENCE_COLORS } from './data/qkd-data';

export type Section = "A" | "B" | "C" | "D" | "E" | "F";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SynthesisViewComponent,
    MatrixViewComponent,
    PlaybookViewComponent,
    PortfolioViewComponent,
    TimelineViewComponent,
    BlindSpotsViewComponent,
    EvidenceBadgeComponent,
  ],
})
export class AppComponent {
  activeSection = signal<Section>("A");
  
  sections: { id: Section, title: string }[] = [
    { id: "A", title: "A: Research Synthesis" },
    { id: "B", title: "B: Imperfection Matrix" },
    { id: "C", title: "C: Methods Playbook" },
    { id: "D", title: "D: Protocol Portfolio" },
    { id: "E", title: "E: Research Plan" },
    { id: "F", title: "F: Blind Spots" },
  ];

  evidenceLegend = Object.entries(EVIDENCE_COLORS).map(([label, color]) => ({ label, color }));

  setActiveSection(section: Section) {
    this.activeSection.set(section);
  }
}
