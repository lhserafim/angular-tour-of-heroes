import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  // A propriedade do componente hero precisa ser @Input() pois o componente externo HeroesComponent faz o bind através
  // do comando: <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    })
  }

  goBack(): void {
    this.location.back();
  }

  // O método save que recebe a chamada do evento (click) do template (HTML)
  // e chama o service para fazer a persistencia da alteração
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => {
      this.goBack();
    })
  }

}
