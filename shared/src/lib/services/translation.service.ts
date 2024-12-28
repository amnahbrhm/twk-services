// src/app/services/translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = new BehaviorSubject<any>({});
  private currentLang = 'en';

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  // Load translations from JSON file
  private loadTranslations(obj: any) {
    this.translations.next(obj);
    // this.http.get(`./assets/i18n/ar.json`).subscribe(
    //   (translations) => this.translations.next(translations),
    //   (error) =>
    //     console.error(
    //       `Could not load translations for language: ${lang}`,
    //       error
    //     )
    // );
  }

  // Get a translation by key
  // translate(key: string): Observable<string> {
  //   return this.translations
  //     .asObservable()
  //     .pipe(map((translations) => translations[key] || key));
  // }
  // Get a translation by key synchronously
  translate(key: string): string {
    const keys = key.split('.');
    let translation = this.translations.getValue();
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        return key; // Fallback to key if any part of the path is missing
      }
    }
    return typeof translation === 'string' ? translation : key; 
  }

  // Switch the language and reload translations
  switchLang(lang: any) {
    console.log(lang);
    
    this.currentLang = lang.culture;
    this.loadTranslations(lang);
    console.log(this.translations.getValue());
    
  }
}
