import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IHero } from 'src/app/models/hero';

// This serves to simulate a database

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Frodo Baggins' },
      { id: 1, name: 'Gandalf' },
      { id: 2, name: 'Aragorn' },
      { id: 3, name: 'Legolas' },
      { id: 4, name: 'Gimli' },
      { id: 5, name: 'Samwise Gamgee' },
      { id: 6, name: 'Merriadoc Brandibuck' },
      { id: 7, name: 'Perrigrin Took' },
      { id: 8, name: 'Boromir' },
    ];

    return { heroes };
  }

  genId(heroes: IHero[]): number {
    const newId: number =
      heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 0;

    return newId;
  }
}
