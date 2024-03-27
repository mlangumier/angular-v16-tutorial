import { Component } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

import { IHero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent {
  heroes$!: Observable<IHero[]>;

  // Subject: a source of observable value and an observable.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Wait 300ms after keystrokes before starting search
      debounceTime(300),

      // Ignore new term if same as previous one
      distinctUntilChanged(),

      // switch to new observable when term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
