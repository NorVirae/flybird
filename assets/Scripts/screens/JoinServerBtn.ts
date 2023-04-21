import {
  _decorator,
  Button,
  Component,
  director,
  EditBox,
  find,
  Game,
  Node,
} from "cc";
import { GameManager } from "../GameManager";
const { ccclass, property } = _decorator;

@ccclass("JoinServerBtn")
export class JoinServerBtn extends Component {
  @property({
    type: EditBox,
  })
  public roomIdInput: EditBox;

  @property({
    type: GameManager,
  })
  public gameManager;

  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
    this.gameManager = find("GameManager").getComponent("GameManager");
  }

  callback(event: Event, customEventData: string) {
    let textComp = this.roomIdInput.node.getComponent(EditBox);
    this.gameManager.gameCount += 1;
    console.log(this.gameManager.gameCount, "PROOF OF PERSISTENCE UI");
    director.loadScene("scene");
  }
}
