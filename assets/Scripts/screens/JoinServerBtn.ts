import { _decorator, Button, Component, director, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoinServerBtn')
export class JoinServerBtn extends Component {
    @property({
        type: EditBox
    })
    public roomIdInput:EditBox;

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this)
    }

    callback(event: Event, customEventData: string){
        let textComp = this.roomIdInput.node.getComponent(EditBox)
        console.log(textComp.string, "HEURISTic")
        director.loadScene("scene")
    }
}


