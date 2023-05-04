import { _decorator, Component, Node, Vec3, game, director } from "cc";
import { NetworkManager } from "./NetworkManager";
import { RouterManager } from "./RouterManager";
const { ccclass, property } = _decorator;

interface GameState {
  players: Player[];
}

interface Player {
  location: Vec3;
  score: number;
  highestScore: number;
}

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: Node })
  public networkManager: Node;
  @property public isMultiplayer: boolean = false;

  @property({ type: RouterManager })
  public routerManager: RouterManager;

  public gameState: GameState;

  public gameCount: number = 0;

  onLoad() {
    director.addPersistRootNode(this.node);
    director.addPersistRootNode(this.networkManager);
    this.routerManager.loadScene(2);
  }

  updateGameState(id: number, data: Player) {
    let newGameState: GameState = this.gameState;
    newGameState[id] = data;
    this.gameState = newGameState;
  }

  update(deltaTime: number) {}
}
