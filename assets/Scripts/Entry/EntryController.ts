import { _decorator, Component, input, Node, Input, director, UITransform, Vec3, instantiate, Sprite, Prefab, Animation, AudioSource, sys } from 'cc';
const { ccclass, property } = _decorator;
import { Constant } from '../Data/Constant';

@ccclass('EntryController')
export class EntryController extends Component {
    @property({
        type: Node
    })
    private board: Node;

    @property({
        type: Prefab
    })
    private bracketPrefab: Prefab;

    @property({
        type: AudioSource
    })
    private bgSound: AudioSource;

    @property({
        type: Node
    })
    private muteBtn: Node;

    @property({
        type: Node
    })
    private unMuteBtn: Node;

    private oldArray: number[] = [0,1,2,3];
    private newArray: number[] = [];
    private volumeValue: number = 1;

    protected start(): void {
        input.on(Input.EventType.TOUCH_END, () => {
            director.loadScene('Tutorial');
        }, this);
    }

    protected onLoad(): void {
        if (!sys.localStorage.getItem(Constant.audioVolumeKey)) {
            sys.localStorage.setItem(Constant.audioVolumeKey, this.volumeValue.toString());
        } else {
            this.volumeValue = parseInt(localStorage.getItem(Constant.audioVolumeKey));
            this.bgSound.volume = this.volumeValue;
            this.muteBtn.active = this.volumeValue === 1;
            this.unMuteBtn.active = this.volumeValue !== 1;
        }
        this.bgSound.play();
        const boardSize = this.board.getComponent(UITransform);
        const positions = [
            new Vec3(-boardSize.width / 2, 0, 0),
            new Vec3(0, boardSize.height / 2, 0),
            new Vec3(boardSize.width / 2, 0, 0),
            new Vec3(0, -boardSize.height / 2, 0)
            ];
        const rotations = [-180,90,0,-90];
        const colors = [
            Constant.RED, 
            Constant.GREEN, 
            Constant.BLUE,
            Constant.YELLOW
        ];
        for (let i = 0; i < 4; i++) {
            const bracketNode = instantiate(this.bracketPrefab);
            bracketNode.setScale(0.5,0.5);
            bracketNode.setPosition(positions[i]);
            bracketNode.angle = rotations[i];
            bracketNode.getComponent(Sprite).color = colors[i];
            this.board.addChild(bracketNode);
            this.board.children[i].getComponent(Animation).play('entryBracket');
        }
    }

    protected update(dt: number): void {
        this.scheduleOnce(this.changeColor, 0.9);
    }

    private changeColor(): void {
        const temp = this.oldArray[0];
        this.oldArray[0] = this.oldArray[3];
        this.oldArray[3] = this.oldArray[2];
        this.oldArray[2] = this.oldArray[1];
        this.oldArray[1] = temp;
        this.newArray = [...this.oldArray];
        const colors = [
            Constant.RED, 
            Constant.GREEN, 
            Constant.BLUE,
            Constant.YELLOW
        ];
        for (let i = 0; i < 4; i++) {
            this.board.children[i].getComponent(Sprite).color = colors[this.newArray[i]];
        }
    }

    private onMuteBtnClick(): void {
        this.setAudioVolume(0);
        localStorage.setItem(Constant.audioVolumeKey, '0');
        this.muteBtn.active = false;
        this.unMuteBtn.active = true;
    }

    private onUnMuteBtnClick(): void {
        this.setAudioVolume(1);
        localStorage.setItem(Constant.audioVolumeKey, '1');
        this.muteBtn.active = true;
        this.unMuteBtn.active = false;
    }

    private setAudioVolume(volume: number): void {
        this.bgSound.volume = volume;
    }

}

