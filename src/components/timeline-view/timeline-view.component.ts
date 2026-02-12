import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { workPackages, verificationGates } from '../../data/qkd-data';

type WorkPackage = (typeof workPackages)[0];

@Component({
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TimelineViewComponent {
  workPackages = workPackages;
  verificationGates = verificationGates;
  weeks = Array.from({ length: 24 }, (_, i) => i + 1);

  selectedWorkPackage = signal<WorkPackage | null>(null);

  getWorkPackageStyle(wp: WorkPackage) {
    const left = ((wp.start - 1) / 24) * 100;
    const width = ((wp.end - wp.start + 1) / 24) * 100;
    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  }

  getGateStyle(gateWeek: number) {
    const left = ((gateWeek - 0.5) / 24) * 100;
    return {
      left: `${left}%`,
    };
  }

  selectWorkPackage(wp: WorkPackage) {
    this.selectedWorkPackage.set(this.selectedWorkPackage() === wp ? null : wp);
  }
}
