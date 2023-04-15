import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label
    })
    public scoreLable;

    @property({
        type:Label
    })
    public highScoreLabel;

    @property({
        type: Label
    })
    public resultEnd;

    public maxScore: number = 0;

    public currentScore:number = 0;

    updateScore(num: number){
        this.currentScore = num;

        this.scoreLable.string = ('' + this.currentScore)
    }

    resetScore(){
        this.updateScore(0)
        this.hideResults()
    }

    addScore(){
        this.updateScore(this.currentScore + 1)
    }

    showResults(){
        this.maxScore = Math.max(this.maxScore, this.currentScore)
        this.highScoreLabel.string = ('High Score: '+ this.maxScore)
    }

    hideResults() {

    }


}


