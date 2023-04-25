import { _decorator, Component, Node } from 'cc';
import { GameCtrl } from '../GameCtrl';
import { GameCtrlMultiplayer } from '../multiplayer/GameCtrlMultiplayer';
const { ccclass, property } = _decorator;

@ccclass('MultiPlayer')
export class MultiPlayer extends Component {
    @property({
        type: GameCtrl
    })
    public gameCtrl: GameCtrl;

    @property({type: GameCtrlMultiplayer})
    public gameCtrlMulti

    onLoad(){
        this.gameCtrl.node.active = false
        this.gameCtrlMulti.node.active = true
    }
}


