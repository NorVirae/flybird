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
import { MultiplayerBird } from "./MultiplayerBird";
import { NetworkManager } from "../NetworkManager";
const { ccclass, property } = _decorator;

@ccclass("GameCtrlMultiplayer")
export class GameCtrlMultiplayer extends Component {
  @property({
    type: GroundMultiplayer,
    tooltip: "Ground",
  })
  public ground: GroundMultiplayer;

  @property({
    type: NetworkManager,
  })
  public networkManager: NetworkManager;

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
    type: MultiplayerBird,
    tooltip: "Yellow Bird",
  })
  public yellowBird: MultiplayerBird;

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
    console.log(this.yellowBird, "YELLOW BIERD");
    // this.resetGame()
    this.gameManager = find("GameManager").getComponent("GameManager");

    director.pause();
  }

  //  delete at final version
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ESCAPE:
        this.gameManager.gameCount += 1;
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
    this.yellowBird.hitSomething = false;

    this.AudioCtrl.onAudioQueue(2);

    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      if (this.isOver == true) {
        this.resetGame();
      }

      if (this.isOver == false) {
        this.yellowBird.flyBird();

        this.AudioCtrl.onAudioQueue(0);
      }
    });
  }

  resetGame() {
    this.result.resetScore();
    this.yellowBird.resetBird();
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
    let yellowCollider = this.yellowBird.getComponent(Collider2D);
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
    console.log("Onground Pipe COntact", this.yellowBird);
    this.yellowBird.hitSomething = true;

    this.AudioCtrl.onAudioQueue(1);
  }

  birdCrash() {
    this.contactGroundPipe();

    if (this.yellowBird.hitSomething == true) {
      this.networkManager.resultGameAndDetermineWinner();
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdCrash();
    }
  }
}
