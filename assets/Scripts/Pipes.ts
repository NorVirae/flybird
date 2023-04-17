import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: "Top bar"
    }) public topPipe:Node;

     @property({
        type: Node,
        tooltip: "bottom pipe"
     })
     public bottomPipe:Node;

     public tempStartLocationUp: Vec3 =  new Vec3(0,0,0);

     public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);

     public scene = screen.windowSize

    //  game control

    public gameCtrl;

    public pipeSpeed:number;
    public tempPipeSpeed: number;


    onLoad(){
        this.gameCtrl = find("GameCtrl").getComponent("GameCtrl")
        this.pipeSpeed = this.gameCtrl.pipeSpeed
        this.initialPosition()
    }

    initialPosition(){
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width
        this.tempStartLocationDown.x = this.topPipe.getComponent(UITransform).width + this.scene.width

        let gap = random(90, 100)
        let topHeight = random(0, 450)

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10))

    }

    update(){

    }
}

