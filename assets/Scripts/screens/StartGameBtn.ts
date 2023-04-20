import { _decorator, Button, Event, Component, EventHandler, Node, director, Scene } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartGameBtn')
export class StartGameBtn extends Component {
   onLoad(){
    this.node.on(Button.EventType.CLICK, this.callback, this)
   }

   callback(event: Event, customEventData: string){
    const node = event.target as Node;
    const button = node.getComponent(Button)
    console.log(customEventData, "CLICKED")
    director.loadScene("scene")
   }
}


