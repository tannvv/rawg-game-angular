import { HttpService } from './../../services/http.service';
import { Game, APIResponse } from './../../models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games : Game[] = [];
  private routeSub : Subscription = {} as Subscription
  private gameSub : Subscription = {} as Subscription
  constructor(
    private httpService : HttpService,
    private route : ActivatedRoute,
    private router : Router
  ) { }
  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search'])
      }else{
        this.searchGames('metacrit')
      }
    })
  }

  searchGames(sort : string, search? : string):void{
    this.gameSub = this.httpService
      .getGameList(sort,search)
      .subscribe((gameList : APIResponse<Game>)=>{
        this.games = gameList.results;
        console.log(gameList)
      })
  }
  openGamesDetails(id : string){
    this.router.navigate(['details',id])
  }

}
