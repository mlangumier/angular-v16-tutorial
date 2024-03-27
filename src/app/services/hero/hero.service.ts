import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, map } from 'rxjs';

import { IHero } from 'src/app/models/hero';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  // Observables are the return of asynchronous functions
  getHeroes(): Observable<IHero[]> {
    const heroes = this.http.get<IHero[]>(this.heroesUrl).pipe(
      tap((_) => this.logMessage('fetched heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', []))
    );

    return heroes;
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;

    const hero = this.http.get<IHero>(url).pipe(
      tap((_) => this.logMessage(`fetch hero id:${id}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );

    return hero;
  }

  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) return of([]);

    const heroes = this.http
      .get<IHero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x: IHero[]) =>
          x.length
            ? this.logMessage(`found heroes matching term "${term}"`)
            : this.logMessage(`no heroes matching term "${term}"`)
        ),
        catchError(this.handleError<IHero[]>('searchHeroes', []))
      );

    return heroes;
  }

  // POST: add a hero
  addHero(hero: IHero): Observable<IHero> {
    const addedHero = this.http
      .post<IHero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: IHero) =>
          this.logMessage(`added hero with id=${newHero.id}`)
        ),
        catchError(this.handleError<IHero>('addHero'))
      );

    return addedHero;
  }

  // PUT: update the hero on the server
  updateHero(hero: IHero): Observable<any> {
    const updatedHero = this.http
      .put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((_) => this.logMessage(`updated hero id:${hero.id}`)),
        catchError(this.handleError<IHero>('updateHero'))
      );

    return updatedHero;
  }

  // DELETE: deletes a hero
  deleteHero(id: number): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap((_) => this.logMessage(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  private logMessage(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logMessagegin infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.logMessage(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
