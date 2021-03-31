import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero; // o ? diz que a propriedade é opcional. There is no selected hero when the application starts.

  // Injeção do serviço dentro do meu construtor
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    // Um dos melhores locais p/chamar um método, pois é executado na inicialização do componente
    this.getHeroes();
  }

  // Método chamado no evento bind (click) do HTML
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`); // uso do template string p/ interpolar o id
  }

  // Vai fazer um push no meu array de Hero
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

}
