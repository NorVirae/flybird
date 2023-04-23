import { _decorator, Button, Component, director, find, Node } from "cc";
import { GameManager } from "../../GameManager";
import { RouterManager } from "../../RouterManager";
const { ccclass, property } = _decorator;

@ccclass("MultiplayerBtn")
export class MultiplayerBtn extends Component {
  @property({
    type: GameManager,
  })
  public gameManager;

  @property({
    type: Node,
    tooltip: "pvp"
  })
  public pvp: Node;
  
  @property({
    type: RouterManager
  })
  public routerManager: RouterManager;


  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
    this.gameManager = find("GameManager").getComponent("GameManager");
    // this.routerManager = find("RouteManager").getComponent("RouterManager");
  }

  callback(event: Event, customEventData: string) {
    this.gameManager.gameCount += 1;
    console.log(this.gameManager.gameCount, "PROOF OF PERSISTENCE UI");

    this.routerManager.navigateTo(2)
    // director.loadScene("pvp");
    
  }
}
