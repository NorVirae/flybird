import { _decorator, Animation, CCFloat, Component, Node, quat, tween, Vec3 } from 'cc';
import { NetworkManager } from '../NetworkManager';
const { ccclass, property } = _decorator;

@ccclass('MultiplayerBird')
export class MultiplayerBird extends Component {
    @property({
        type: CCFloat,
        tooltip: "how high can they fly",
      })
      public jumpHeight: number = 3.5;
    
      @property({
        type: CCFloat,
        tooltip: "how long can they fly",
      })
      public jumpDuration: number = 3.5; //seconds
    
    
      @property({type: NetworkManager})
      public networkManager: NetworkManager;
    
    
      public birdAnimation: Animation;
      public birdLocation: Vec3;
      public hitSomething: Boolean;
    
      onLoad() {
        this.resetBird();
    
        this.birdAnimation = this.node.getComponent(Animation)
        
      }
    
      resetBird() {
        this.birdLocation = new Vec3(0, 0, 0);
        this.node.setPosition(this.birdLocation);
        this.node.setRotation(quat(0,0,0,0))
      }
    
      flyBird() {
        console.log(this.birdAnimation)
        this.birdAnimation.stop();
        tween(this.node.position).to(
          this.jumpDuration,
          new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0),
          {
            easing: "smooth",
            onUpdate: (target:Vec3, ratio:number) => {
              this.node.position = target;
            },
          }
        ).start();
    
        // this.node.setPosition(new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0))
    
    
        this.birdAnimation.play()
      }
    
      update(){
        this.networkManager.sendLocationToOpClient(new Vec3(this.node.position.x, this.node.position.y, 0))
      }
}


