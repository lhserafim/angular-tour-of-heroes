import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes = HEROES;
  selectedHero?: Hero; // o ? diz que a propriedade é opcional. There is no selected hero when the application starts.

  constructor() { }

  ngOnInit() {
  }

  // Método chamado no evento bind (click) do HTML
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
