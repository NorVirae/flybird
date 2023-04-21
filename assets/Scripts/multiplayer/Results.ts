import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

interface Score {
  player1Score: number;
  player2Score: number;
}

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

  public maxScore: number = 0;

  public currentScore: number = 0;

  public player1Score: number = 0;
  public player2Score: number = 0;

  updateScore(playerScores: Score) {
    this.player1Score = playerScores.player1Score;
    this.player2Score = playerScores.player2Score;

    console.log(this.player1Score, "P1", this.player2Score, "P2");

    this.player1ScoreLabel.string = "Player 1: " + this.player1Score;
    this.player2ScoreLabel.string = "Player 2: " + this.player2Score;
  }

  resetScore() {
    this.updateScore({ player1Score: 0, player2Score: 0 });
    this.hideResults();
  }

  addScore() {
    this.updateScore({
      player1Score: this.player1Score + 1,
      player2Score: this.player2Score + 1,
    });
  }

  showResults() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);
    console.log(this.maxScore);
    this.highScoreLabel.string = "High Score: " + this.maxScore;
    this.resultEnd.node.active = true;
    this.highScoreLabel.node.active = true;
  }

  hideResults() {
    this.highScoreLabel.node.active = false;
    this.resultEnd.node.active = false;
  }
}
