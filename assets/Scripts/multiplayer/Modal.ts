import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Modal")
export class Modal extends Component {
  @property({
    type: Label,
  })
  public raceStatus: Label;

  @property({
    type: Label,
  })
  public yourScore: Label;

  @property({
    type: Label,
  })
  public oppScore: Label;

  @property({
    type: Label,
  })
  public reason: Label;

  onLoad() {
    // this.node.active = false;
    this.raceStatus.string = "YOU WON!";
    this.yourScore.string = "Your Score: 20";
    this.oppScore.string = "Opp Score: 12";
    this.reason.string = "Your Opponent crashed";
    this.reason.color.set(0, 255, 0, 255);
  }
}
