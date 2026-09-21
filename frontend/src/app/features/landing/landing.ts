import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  protected readonly showIntro = signal(true);
  protected readonly isIntroClosing = signal(false);

  private readonly introDuration = 4200;
  private readonly introExitDuration = 800;

  constructor() {
    setTimeout(() => {
      this.closeIntro();
    }, this.introDuration);
  }

  protected skipIntro(): void {
    this.closeIntro();
  }

  private closeIntro(): void {
    if (this.isIntroClosing()) {
      return;
    }

    this.isIntroClosing.set(true);

    setTimeout(() => {
      this.showIntro.set(false);
    }, this.introExitDuration);
  }
}