import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OpBird')
export class OpBird extends Component {

    public tempLocation: Vec3;

    onLoad() {
        
    }

    updatePosition(newPos: Vec3){

        this.tempLocation = newPos
        this.node.position = this.tempLocation

    }


}


