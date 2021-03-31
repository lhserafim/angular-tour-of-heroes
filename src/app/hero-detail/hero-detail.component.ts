import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  // A propriedade do componente hero precisa ser @Input() pois o componente externo HeroesComponent faz o bind através
  // do comando: <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  constructor() { }

  ngOnInit(): void {
  }

}
