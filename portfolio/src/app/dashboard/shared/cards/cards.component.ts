import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardCardInfo } from '../../../models/portfolio.models';

@Component({
  selector: 'app-cards',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent {
  @Input() componentInfo!: DashboardCardInfo;
}
