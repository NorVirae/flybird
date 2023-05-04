import { _decorator, Button, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("OkBtn")
export class OkBtn extends Component {
  @property({type: Node})
  public modal: Node;
  onLoad() {
    this.node.on(Button.EventType.CLICK, this.callback, this);
    // this.routerManager = find("RouteManager").getComponent("RouterManager");
  }

  callback() {
    this.modal.active = false;
  }
}
