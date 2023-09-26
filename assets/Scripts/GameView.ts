import { _decorator, Animation, AnimationClip, AudioSource, Camera, Color, Component, instantiate, Label, math, Node, Prefab, Quat, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { Constant } from './Data/Constant';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({
        type: Node
    })
    private board: Node;
    public get Board(): Node {
        return this.board;
    }

    @property({
        type: Prefab
    })
    private bracketPrefab: Prefab;
    public get BracketPrefab(): Prefab {
        return this.bracketPrefab;
    }

    @property({
        type: Node
    })
    private dot: Node;
    public get Dot(): Node {
        return this.dot;
    }

    @property({
        type: Prefab
    })
    private dotPrefab: Prefab;
    public get DotPrefab(): Prefab {
        return this.dotPrefab;
    }

    @property({
        type: Label
    })
    private score: Label;
    public get Score(): Label {
        return this.score;
    }
    public set Score(value: Label) {
        this.score = value;
    }

    @property({
        type: Node
    })
    private cameraAnim: Node;
    public get CameraAnim(): Node {
        return this.cameraAnim;
    }
    public set CameraAnim(value: Node) {
        this.cameraAnim = value;
    }

    @property({
        type: Node
    })
    private scoreBoard: Node;
    public get ScoreBoard(): Node {
        return this.scoreBoard;
    }
    public set ScoreBoard(value: Node) {
        this.scoreBoard = value;
    }

    @property({
        type: Label
    })
    private currScore: Label;
    public get CurrScore(): Label {
        return this.currScore;
    }
    public set CurrScore(value: Label) {
        this.currScore = value;
    }

    @property({
        type: Label
    })
    private bestScore: Label;
    public get BestScore(): Label {
        return this.bestScore;
    }
    public set BestScore(value: Label) {
        this.bestScore = value;
    }

    @property({
        type: AudioSource
    })
    private winSound: AudioSource;
    public get WinSound(): AudioSource {
        return this.winSound;
    }
    public set WinSound(value: AudioSource) {
        this.winSound = value;
    }

    @property({
        type: AudioSource
    })
    private btnClickSound: AudioSource;
    public get BtnClickSound(): AudioSource {
        return this.btnClickSound;
    }
    public set BtnClickSound(value: AudioSource) {
        this.btnClickSound = value;
    }

    @property({
        type: AudioSource
    })
    private loseSound: AudioSource;
    public get LoseSound(): AudioSource {
        return this.loseSound;
    }
    public set LoseSound(value: AudioSource) {
        this.loseSound = value;
    }

    @property({
        type: AudioSource
    })
    private clickSound: AudioSource;
    public get ClickSound(): AudioSource {
        return this.clickSound;
    }
    public set ClickSound(value: AudioSource) {
        this.clickSound = value;
    }

    @property({
        type: AudioSource
    })
    private bgSound: AudioSource;
    public get BgSound(): AudioSource {
        return this.bgSound;
    }
    public set BgSound(value: AudioSource) {
        this.bgSound = value;
    }

    @property({
        type: Node
    })
    private muteBtn: Node;
    public get MuteBtn(): Node {
        return this.muteBtn;
    }
    public set MuteBtn(value: Node) {
        this.muteBtn = value;
    }

    @property({
        type: Node
    })
    private unMuteBtn: Node;
    public get UnMuteBtn(): Node {
        return this.unMuteBtn;
    }
    public set UnMuteBtn(value: Node) {
        this.unMuteBtn = value;
    }

}

