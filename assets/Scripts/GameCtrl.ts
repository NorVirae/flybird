import { _decorator, CCInteger, Component, Node } from 'cc';
import { Ground } from './Ground';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
   @property({
    type: Ground,
    tooltip: "Ground",
   })
   public ground: Ground;

   @property({
    type:CCInteger
   })
   public speed: number = 300;

   @property({
    type: CCInteger
   })
   public pipeSpeed:number = 200;

   onLoad(){

   }

   initListener(){

   }

   startGame(){
    
   }

}


