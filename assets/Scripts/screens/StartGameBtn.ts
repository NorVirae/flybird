import {
  _decorator,
  Button,
  Event,
  Component,
  EventHandler,
  Node,
  director,
  Scene,
} from "cc";
import { RouterManager } from "../RouterManager";
const { ccclass, property } = _decorator;

@ccclass("StartGameBtn")
export class StartGameBtn extends Component {
  @property({ type: RouterManager })
  public routeManager: RouterManager;

  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
  }

  callback() {
    
    this.routeManager.loadScene(1)
    console.log("HUI")
  }
}
