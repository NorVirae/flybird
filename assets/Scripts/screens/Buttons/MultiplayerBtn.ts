import { _decorator, Button, Component, director, find, Node } from "cc";
import { GameManager } from "../../GameManager";
const { ccclass, property } = _decorator;

@ccclass("MultiplayerBtn")
export class MultiplayerBtn extends Component {
  @property({
    type: GameManager,
  })
  public gameManager;

  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
    this.gameManager = find("GameManager").getComponent("GameManager");
  }

  callback(event: Event, customEventData: string) {
    this.gameManager.gameCount += 1;
    console.log(this.gameManager.gameCount, "PROOF OF PERSISTENCE UI");
    director.loadScene("pvp");
  }
}
