import {
  _decorator,
  CCInteger,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventKeyboard,
  Input,
  input,
  IPhysics2DContact,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
const { ccclass, property } = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "Ground",
  })
  public ground: Ground;

  @property({
    type: CCInteger,
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  @property({
    type: Results,
  })
  public result: Results;

  @property({
    type: Bird,
    tooltip: "Bird",
  })
  public bird: Bird;

  public isOver: boolean;


  @property({type: PipePool})
  public pipeQueue: PipePool;

  onLoad() {
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    // this.resetGame()
    director.pause();
  }

  //    delete at final version
  // onKeyDown(event: EventKeyboard) {
  //   switch (event.keyCode) {
  //     case KeyCode.KEY_P:
  //       this.result.addScore();
  //       break;

  //     case KeyCode.KEY_R:

  //       this.resetGame();

  //       break;

  //     case KeyCode.KEY_Q:
  //       this.gameOver();
  //       break;
  //   }
  // }

  gameOver() {
    this.result.showResults();
    this.isOver = true
    this.bird.hitSomething = false
    director.pause()
  }

  initListener() {
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      console.log("CLICKED", this.isOver)

      if(this.isOver == true){

        this.resetGame()
      }

      if(this.isOver == false){
        this.bird.flyBird();
      }
    });
  }

  resetGame() {
    this.result.resetScore();
    this.bird.resetBird();
    this.pipeQueue.reset()
    this.isOver = false
    this.startGame();
  }

  startGame() {
    director.resume();
  }

  passPipe(){
    this.result.addScore()
  }

  createPipe(){
    this.pipeQueue.addPool()
  }

  contactGroundPipe(){
    let collider = this.bird.getComponent(Collider2D)
    if(collider){
      collider.on(Contact2DType.BEGIN_CONTACT, this.onGroundPipeContact, this)
    }
  }

  onGroundPipeContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
    this.bird.hitSomething = true
  }

  birdCrash(){
    this.contactGroundPipe()

    if (this.bird.hitSomething == true){
      this.gameOver()
    }
  }

  update(){
    if (this.isOver == false){
      this.birdCrash()
    }
  }
}
