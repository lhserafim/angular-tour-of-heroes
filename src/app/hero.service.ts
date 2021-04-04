import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


//You must make the HeroService available to the dependency injection system before Angular can inject it into the HeroesComponent
//by registering a provider. A provider is something that can create or deliver a service; in this case, it instantiates 
//the HeroService class to provide the service.
// To make sure that the HeroService can provide this service, register it with the injector, which is the object that is 
//responsible for choosing and injecting the provider where the application requires it.
//When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  // Definição da URL com o endereço do "server"
  private heroesUrl = 'api/heroes';  //URL para a API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Este é um exemplo classico de "service-in-service". 
  // Ou seja, um serviço injetado dentro de outro que será injetado em um componente
  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  // getHeroes versão que retorna dados mockados. Por isso o uso do of            
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES); //of(HEROES) retorna um Observable<Hero[]>
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }


  // Trocando of() por http.get() para retornar os dados do server ao invés do mock
  getHeroes(): Observable<Hero[]> {
    // o get precisa ter o tipo que ele retorna. Pelo que entendi é  sempre o mesmo tipo do Observable
    // Embora o get possa retornar múltiplos valores de uma só vez, aqui foi optado por definir o tipo e
    // adicionando a capacidade do TypeScript de evitar erros de compilação
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //tap vai entrar no fluxo do observable para enviar uma messagem via log()
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getHero(id: number): Observable<Hero> {
  //   // For now, assume that a hero with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const hero = HEROES.find(h => h.id === id) as Hero;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

/** DELETE: delete the hero from the server */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

}
