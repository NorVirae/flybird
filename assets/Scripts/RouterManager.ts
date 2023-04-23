import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RouterManager")
export class RouterManager extends Component {
  @property({
    type: [Node],
  })
  public screens: Node[] = [];

  @property({
    type: Node
  })
  public scenes: Node[] = [];


  public previousScreenId: number;
  public currentScreenId: number = 0;


  loadScene(sceneId: number){
    for (let i = 0; i < this.scenes.length; i++){
        if(i === sceneId){
            this.scenes[sceneId].active = true
        }
        else{
            this.scenes[i].active = false

        }
    }
  }

  navigateTo(screenId: number) {
    this.screens[screenId].active = true;

    for (let i = 0; i < this.screens.length; i++) {
      if (i === screenId) {
        this.screens[screenId].active = true;
        this.previousScreenId = this.currentScreenId
        this.currentScreenId = screenId
      } else {
        this.screens[i].active = false;
      }
    }

    console.log("NAVIGATION SUCCESSFUL");
  }
}
