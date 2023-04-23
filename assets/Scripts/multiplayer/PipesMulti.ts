import { _decorator, Component, find, Node, screen, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass('PipesMulti')
export class PipesMulti extends Component {
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

    public isPass: boolean;


    onLoad(){
        console.log(this.gameCtrl, "GAME CTRL")

        this.gameCtrl = find("GameCtrlMultiplayer").getComponent("GameCtrlMultiplayer")
        this.pipeSpeed = this.gameCtrl.pipeSpeed
        this.initialPosition()
        this.isPass = false
    }

    initialPosition(){
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width
        this.tempStartLocationDown.x = this.topPipe.getComponent(UITransform).width + this.scene.width
        console.log("Initial position loaded")
        let gap = random(90, 100)
        let topHeight = random(0, 450)

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10))

        this.bottomPipe.setPosition(this.tempStartLocationDown)
        this.topPipe.setPosition(this.tempStartLocationUp)

    }

    update(deltaTime: number){
        
        this.tempPipeSpeed = this.pipeSpeed * deltaTime

        this.tempStartLocationDown = this.bottomPipe.position
        this.tempStartLocationUp = this.topPipe.position


        this.tempStartLocationDown.x -= this.tempPipeSpeed
        this.tempStartLocationUp.x -= this.tempPipeSpeed

        this.bottomPipe.setPosition(this.tempStartLocationDown)
        this.topPipe.setPosition(this.tempStartLocationUp)
        console.log(this.isPass)
        if ( this.isPass == false && this.topPipe.position.x <= 0){
            console.log("GOT IN HERE")
            this.isPass = true
            this.gameCtrl.passPipe()
        }

        if(this.topPipe.position.x < (0 - this.scene.width)){
            this.gameCtrl.createPipe()
            this.destroy()
        }
    }
}


