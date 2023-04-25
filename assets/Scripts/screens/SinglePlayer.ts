import { _decorator, Component, Node } from "cc";
import { GameCtrl } from "../GameCtrl";
import { GameCtrlMultiplayer } from "../multiplayer/GameCtrlMultiplayer";
const { ccclass, property } = _decorator;

@ccclass("SinglePlayer")
export class SinglePlayer extends Component {
  @property({
    type: GameCtrl,
  })
  public gameCtrl: GameCtrl;

  @property({ type: GameCtrlMultiplayer })
  public gameCtrlMulti;

  onLoad() {
    this.gameCtrl.node.active = true;
    this.gameCtrlMulti.node.active = false;
  }
}
