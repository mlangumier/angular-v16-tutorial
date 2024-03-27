import { Component, OnInit } from '@angular/core';

import { IHero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: IHero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // We subscribe to / await the return of the observable (result) returned by the function getHeroes()
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();

    if (!name) return;

    this.heroService
      .addHero({ name } as IHero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
