import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import Colyseus from 'db://colyseus-sdk/colyseus.js';


@ccclass('NetworkManager')
export class NetworkManager extends Component {

    @property({type: String})
    public hostname: String;

    @property public port: number;

    @property({type: Boolean})
    public useSSL: Boolean;

    public client!: Colyseus.Client;
    public room!: Colyseus.Room;

    start() {
        this.client = new Colyseus.Client(`${this.useSSL? "wss": "ws"}://${this.hostname}${([443, 80].includes(this.port)) || this.useSSL? "" : `:${this.port}`}`)

        this.connect();
    }

    async connect(){
        try{
            this.room = await this.client.joinOrCreate("my_room")
            console.log("Joined successfully!")
            console.log("user's sessionId:", this.room.sessionId)

            this.room.onStateChange((state) => {
                console.log("onStateChange: ", state)
            })

            this.room.onLeave((code) => {
                console.log("onLeave: ", code)
            })
        }
        catch(err){
            console.log(err)
        }
    }

  
}


