import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Birdaudio')
export class Birdaudio extends Component {
    @property({
        type: [AudioClip]
    })
    public audioClips: AudioClip[] = [];

    @property({
        type: AudioSource,
    })
    public audioSource: AudioSource = null!;

    onAudioQueue(index: number){
        this.audioSource.playOneShot(this.audioClips[index])
    }
}


