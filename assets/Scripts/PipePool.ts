import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    })
    public prefabPipes: Prefab = null;

    @property({
        type: Node
    })
    public pipePoolHome: Node;

    public pool = new NodePool

    public newPipe:Node = null;

    initPool(){
        let initCount = 1

        for (let i = 0; i < initCount; i++){
            this.newPipe = instantiate(this.prefabPipes)

            if(i == 0){
                this.pipePoolHome.addChild(this.newPipe)

            }else{
                this.pool.put(this.newPipe)
                console.log(this.pool.size(), "POOL SIZE")
            }
        }
    }

    addPool(){
        console.log("ADD POOL", this.pool.size())
        if (this.pool.size() > 0){
            
            this.newPipe = this.pool.get()
        }else {
            this.newPipe = instantiate(this.prefabPipes)
        }

        this.pipePoolHome.addChild(this.newPipe)
    }

    reset(){
        this.pipePoolHome.removeAllChildren()
        this.pool.clear()
        this.initPool()
    }
}


