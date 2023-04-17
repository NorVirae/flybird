import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
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

  onLoad() {
    this.initListener();
    this.result.resetScore();
    director.pause();
  }

  //    delete at final version
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_P:
        this.result.addScore();
        break;

      case KeyCode.KEY_R:

        this.resetGame();

        break;

      case KeyCode.KEY_Q:
        this.gameOver();
        break;
    }
  }

  gameOver() {
    this.result.showResults();
    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.on(Node.EventType.TOUCH_START, () => {
      this.bird.flyBird();

      director.resume()

    });
  }

  resetGame() {
    this.result.resetScore();
    this.bird.resetBird();

    this.startGame();
  }

  startGame() {
    director.resume();
  }
}
