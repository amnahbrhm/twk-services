import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TranslatePipe, TranslationService } from '@twk-services/shared';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, TranslatePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'inquiry';
  constructor(
    private translationService: TranslationService,
  ) {}

  ngOnInit() {
    const lang = localStorage.getItem('lang') || 'ar';

    const langObj = lang == 'ar' ? ar : en;
    this.translationService.switchLang(langObj);
  }
}


const ar = {
  'hello': 'مرحبا بالعالم'
};

const en = {
  'hello': 'hello world'
};