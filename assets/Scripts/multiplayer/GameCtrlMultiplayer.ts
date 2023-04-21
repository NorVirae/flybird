import {
  _decorator,
  CCInteger,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventKeyboard,
  find,
  Input,
  input,
  IPhysics2DContact,
  KeyCode,
  Node,
} from "cc";
import { PipePool } from "../PipePool";
import { Birdaudio } from "../Birdaudio";
import { Bird } from "../Bird";
import { Results } from "../multiplayer/Results";
import { GroundMultiplayer } from "./GroundMultiplayer";
const { ccclass, property } = _decorator;

@ccclass("GameCtrlMultiplayer")
export class GameCtrlMultiplayer extends Component {
  @property({
    type: GroundMultiplayer,
    tooltip: "Ground",
  })
  public ground: GroundMultiplayer;

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
    tooltip: "Red Bird",
  })
  public redBird: Bird;

  @property({
    type: Bird,
    tooltip: "Yellow Bird",
  })
  public yellowBird: Bird;

  @property({
    type: Birdaudio,
    tooltip: "Bird Audio",
  })
  public AudioCtrl: Birdaudio;

  public isOver: boolean;

  @property({ type: PipePool })
  public pipeQueue: PipePool;

  public gameManager;

  onLoad() {
    
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    // this.resetGame()
    this.gameManager = find("GameManager").getComponent("GameManager");

    director.pause();
  }

  //  delete at final version
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ESCAPE:
        this.gameManager.gameCount += 1;
        console.log(this.gameManager.gameCount, "PROOF OF PERSISTENCE SCENE");
        director.loadScene("ui");
        break;

      // case KeyCode.KEY_R:

      //   this.resetGame();

      //   break;

      // case KeyCode.KEY_Q:
      //   this.gameOver();
      //   break;
    }
  }

  gameOver() {
    this.result.showResults();
    this.isOver = true;
    this.redBird.hitSomething = false;
    this.yellowBird.hitSomething = false;

    this.AudioCtrl.onAudioQueue(2);

    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      console.log("CLICKED", this.isOver);

      if (this.isOver == true) {
        this.resetGame();
      }

      if (this.isOver == false) {
        this.redBird.flyBird();
        this.yellowBird.flyBird();

        this.AudioCtrl.onAudioQueue(0);
      }
    });
  }

  resetGame() {
    this.result.resetScore();
    this.redBird.resetBird();
    this.yellowBird.resetBird();
    console.log("RESET")
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }

  startGame() {
    director.resume();
  }

  passPipe() {
    this.result.addScore();
    this.AudioCtrl.onAudioQueue(3);
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let redCollider = this.redBird.getComponent(Collider2D);
    let yellowCollider = this.yellowBird.getComponent(Collider2D);

    if (redCollider) {
      redCollider.on(
        Contact2DType.BEGIN_CONTACT,
        this.onGroundPipeContact,
        this
      );
    }

    if (yellowCollider) {
      yellowCollider.on(
        Contact2DType.BEGIN_CONTACT,
        this.onGroundPipeContact,
        this
      );
    }
  }

  onGroundPipeContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.redBird.hitSomething = true;
    this.yellowBird.hitSomething = true;

    this.AudioCtrl.onAudioQueue(1);
  }

  birdCrash() {
    this.contactGroundPipe();

    if (this.redBird.hitSomething == true) {
      this.gameOver();
    }

    if (this.yellowBird.hitSomething == true) {
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdCrash();
    }
  }
}
