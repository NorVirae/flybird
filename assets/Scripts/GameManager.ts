import { _decorator, Component, Node, Vec3, game, director } from 'cc';
import { NetworkManager } from './NetworkManager';
const { ccclass, property } = _decorator;

interface GameState{
    players: Player[]
}

interface Player{
    location: Vec3
    score: number;
    highestScore: number;
}


@ccclass('GameManager')
export class GameManager extends Component {
    @property({type: Node})
    public networkManager: Node;

    public gameState: GameState;



    onLoad() {
        director.addPersistRootNode(this.node);
        director.addPersistRootNode(this.networkManager)

    }

    update(deltaTime: number) {
        
    }
}


