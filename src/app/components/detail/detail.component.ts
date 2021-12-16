import { HttpService } from './../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from './../../models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public game : Game = {} as Game
  gameId : string = ''
  routeSub : Subscription = {} as Subscription
  gameSub : Subscription = {} as Subscription
  gameRating : number = 0
  constructor(private route : ActivatedRoute,
   private http : HttpService) { }
  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params : Params)=>{
      this.gameId = params['id']
      this.getGameDetail(this.gameId)
    })
  }
  getGameDetail(id : string) {
    this.gameSub = this.http.getGameDetails(id)
          .subscribe((gameRes : Game)=> {
            this.game = gameRes
            console.log(this.game)
            setTimeout(()=>{
              this.gameRating = this.game.metacritic
            },2000)
          })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

}
