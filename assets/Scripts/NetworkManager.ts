import { _decorator, Component, find, Node, Vec3 } from "cc";
const { ccclass, property } = _decorator;

import Colyseus from "db://colyseus-sdk/colyseus.js";
import { OpBird } from "./OpBird";
import { Results } from "./multiplayer/Results";

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  @property({ type: String })
  public hostname: String = "localhost";

  @property public port: number = 5000;

  @property({ type: Boolean })
  public useSSL: Boolean = false;

  @property({ type: OpBird })
  public opBird: OpBird;

  @property({
    type: Results
  })
  public ResultsMultiplayer: Results

  public client!: Colyseus.Client;
  public room!: Colyseus.Room;

  public temLocation: Vec3;

  start() {
    let uri = `${this.useSSL ? "wss" : "ws"}://${this.hostname}${
      [443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`
    }`;
    this.client = new Colyseus.Client(uri);

    this.connect();
  }

  async connect() {
    try {
      this.room = await this.client.joinOrCreate("race", { mode: "duo" });

      this.room.onStateChange((state) => {
        // console.log("onStateChange: ", state)
      });

      this.room.onLeave((code) => {
        console.log("onLeave: ", code);
      });

      this.room.onMessage("fly", (message) => {

        this.temLocation = new Vec3(message.x, message.y, 0);
        this.opBird.updatePosition(this.temLocation);
        this.ResultsMultiplayer.updatePlayer2Score(message.score)
      });

      this.room.onMessage("results", (message) => {
        console.log(message)
      })
    } catch (err) {
      console.log(err);
    }
  }

  sendScoreLocationToOpClient(message: Vec3, score?: number) {
    this.room.send("fly", { x: message.x, y: message.y, score: score });
  }
  
  resultGameAndDetermineWinner(){
    this.room.send("results", {pauseGame: true, highestScore: 0})
  }
}
