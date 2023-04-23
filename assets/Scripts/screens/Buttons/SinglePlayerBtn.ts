import { _decorator, Button, Component, director, find, Node } from "cc";
import { GameManager } from "../../GameManager";
import { RouterManager } from "../../RouterManager";
const { ccclass, property } = _decorator;

@ccclass("SinglePlayerBtn")
export class SinglePlayerBtn extends Component {
  @property({
    type: GameManager,
  })
  public gameManager;

  @property({
    type: RouterManager
  })
  public routerManager: RouterManager;

  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
    this.gameManager = find("GameManager").getComponent("GameManager");
  }

  callback(event: Event, customEventData: string) {
    this.gameManager.gameCount += 1;
    console.log(this.gameManager.gameCount, "PROOF OF PERSISTENCE UI");
    this.routerManager.navigateTo(0)
    
  }
}
