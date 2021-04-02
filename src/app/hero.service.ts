import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


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

  // Este é um exemplo classico de "service-in-service". 
  // Ou seja, um serviço injetado dentro de outro que será injetado em um componente
  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES); //of(HEROES) retorna um Observable<Hero[]>
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
