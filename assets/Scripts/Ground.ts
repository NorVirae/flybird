import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "this is Ground 1",
  })
  public ground1;

  @property({
    type: Node,
    tooltip: "this is Ground 2",
  })
  public ground2;

  @property({
    type: Node,
    tooltip: "this is Ground 3",
  })
  public ground3;

  // create ground width variables
  public groundWidth1;
  public groundWidth2;
  public groundWidth3;

  // this is the temporary start location   
  public tempStartLocation1 = new Vec3;
  public tempStartLocation2 = new Vec3;
  public tempStartLocation3 = new Vec3;

  public gameCtrlSpeed = new GameCtrl 

  public gameSpeed: number = 50;

  onLoad() {
    this.startUp();
  }

  startUp() {
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    this.tempStartLocation1.x = this.groundWidth1;
    this.tempStartLocation2.x = this.groundWidth2 + this.groundWidth1;
    this.tempStartLocation3.x =
      this.groundWidth1 + this.groundWidth2 + this.groundWidth3;

    // set position
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);

    this.ground3.setPosition(this.tempStartLocation3);
  }

  update(deltaTime: number) {
    this.gameSpeed = this.gameCtrlSpeed.speed
    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;




    this.tempStartLocation1.y = 40;
    this.tempStartLocation2.y = 40;
    this.tempStartLocation3.y = 40;
    // get speed and substract frame
    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    const scene = director.getScene();
    const canvas = scene.getComponentInChildren(Canvas);

    if (this.tempStartLocation1.x <= 320 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width + this.groundWidth3;
    }

    if (this.tempStartLocation2.x <= 320 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width + this.groundWidth3;
    }

    if (this.tempStartLocation3.x <= 320 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width + this.groundWidth3;
    }

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
