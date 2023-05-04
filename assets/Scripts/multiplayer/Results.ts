import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Results")
export class Results extends Component {
  @property({
    type: Label,
  })
  public player1ScoreLabel;

  @property({
    type: Label,
  })
  public player2ScoreLabel;

  @property({
    type: Label,
  })
  public highScoreLabel;

  @property({
    type: Label,
  })
  public resultEnd;

  @property({type: Node})
  public overlay: Node;

  @property({type: Label})
  public raceStatus: Label;

  @property({type: Label})
  public reason: Label;

  @property({type: Label})
  public yourScore: Label;

  @property({type: Label})
  public oppScore: Label;

  public maxScore: number = 0;

  public currentScore: number = 0;

  public player1Score: number = 0;
  public player2Score: number = 0;

  updateScore(player1Score: number) {
    this.player1Score = player1Score;


    this.player1ScoreLabel.string = "You: " + this.player1Score;
  }

  updatePlayer2Score(player2Score: number){
    this.player2Score = player2Score

    this.player2ScoreLabel.string = "Opp: " + this.player2Score
  }

  resetScore() {
    this.updateScore(0);
    this.hideResults();
  }

  addScore() {
    this.updateScore(this.player1Score + 1);
  }

  showResults() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);
    this.highScoreLabel.string = "High Score: " + this.maxScore;
    this.resultEnd.node.active = true;
    this.highScoreLabel.node.active = true;
  }

  hideResults() {
    this.highScoreLabel.node.active = false;
    this.resultEnd.node.active = false;
  }
}
