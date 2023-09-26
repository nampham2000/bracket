import { _decorator, Component, EventTouch, Input, Node, input, Color, instantiate, Sprite, director, Animation, sys, UITransform, Vec3 } from 'cc';
import { GameView } from './GameView';
import { Constant } from './Data/Constant';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property({
        type: GameView
    })
    private gameView: GameView;
    private oldArray: number[] = [0,1,2,3];
    private newArray: number[] = [];
    private randNumber: number;
    private randArr: number[] = [];
    private dotArray: Node[] = [];
    private currScore: number = 0;
    private isOver: boolean = false;

    protected onLoad(): void {
        director.resume();
        this.spawnDot();
        
        const storedVolume = localStorage.getItem(Constant.audioVolumeKey);
        const volumeValue = storedVolume ? parseInt(storedVolume) : 1;
        const audioElements = [
            this.gameView.WinSound,
            this.gameView.LoseSound,
            this.gameView.ClickSound,
            this.gameView.BtnClickSound,
            this.gameView.BgSound,
        ];
        this.gameView.MuteBtn.active = volumeValue === 1;
        this.gameView.UnMuteBtn.active = volumeValue !== 1;
        for (const audio of audioElements) {
            audio.volume = volumeValue;
        }
        this.setupBoard();
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.schedule(() => {
            this.spawnDot();
        }, 2);
        const highScoreFromLocalStorage = localStorage.getItem('highScore');
        if (highScoreFromLocalStorage !== null) {
            Constant.dataUser.highScore = parseInt(highScoreFromLocalStorage);
        } else {
            Constant.dataUser.highScore = 0;
        }
    }
    protected update(dt: number): void {
        const { Dot, Board, CameraAnim, Score, ScoreBoard, CurrScore, BestScore, WinSound, LoseSound } = this.gameView;
        const firstDot = Dot.children[0];
        if (Dot.children.length > 0 && firstDot.position.y < 163) {
            const firstRandomNumber = this.randArr[0];
            if ([this.newArray[1], this.oldArray[1]].indexOf(firstRandomNumber) !== -1) {
                Dot.removeChild(firstDot);
                Board.children[1].getComponent(Animation).play('bracket');
                this.randArr.shift();
                this.currScore++;
    
                if (this.currScore % 5 === 0) {
                    Constant.speed += 50;
                }
                WinSound.play();
                Score.string = this.currScore.toString();
            } else if (firstRandomNumber !== this.newArray[1]) {
                if (!this.isOver) {
                    CameraAnim.getComponent(Animation).play();
                    this.isOver = true;
                }
    
                this.scheduleOnce(() => {
                    director.pause();
                }, 0.51);
    
                Constant.speed = 0;
                ScoreBoard.active = true;
                LoseSound.play();
                input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
                CurrScore.string = `Current\n${this.currScore}`;
            }
        }
        this.saveBestScore();
        const highScoreFromLocalStorage = localStorage.getItem('highScore');
        if (highScoreFromLocalStorage !== null) {
            this.gameView.BestScore.string = `Best\n${highScoreFromLocalStorage}`;
        } else {
            this.gameView.BestScore.string = `Best\n0`;
        }
    }

    private onTouchStart(event: EventTouch): void {
        [this.oldArray[0], this.oldArray[3], this.oldArray[2], this.oldArray[1]] = [this.oldArray[3], this.oldArray[2], this.oldArray[1], this.oldArray[0]];
        this.newArray = [...this.oldArray];
        this.Show(this.newArray);
        this.gameView.Board.children.forEach((child) => {
            child.getComponent(Animation).play('bracketClick');
        });
        this.gameView.ClickSound.play();
    }

    private spawnDot(): void {
        this.randNumber = Math.floor(Math.random() * 4);
        this.randArr.push(this.randNumber);
        const dotPrefab = instantiate(this.gameView.DotPrefab);
        const colors = [
            Constant.RED, 
            Constant.GREEN, 
            Constant.BLUE,
            Constant.YELLOW
        ];
        dotPrefab.getComponent(Sprite).color = colors[this.randNumber];
        this.gameView.Dot.addChild(dotPrefab);
        this.dotArray.push(dotPrefab);
    }

    private onRestartBtnClick(): void {
        this.gameView.BtnClickSound.play();
        director.loadScene('Game');
        Constant.speed = 150;
    }

    private onMuteBtnClick(): void {
        this.setAudioVolume(0);
        localStorage.setItem(Constant.audioVolumeKey, '0');
        this.gameView.MuteBtn.active = false;
        this.gameView.UnMuteBtn.active = true;
    }

    private onUnMuteBtnClick(): void {
        this.gameView.BtnClickSound.play();
        this.setAudioVolume(1);
        localStorage.setItem(Constant.audioVolumeKey, '1');
        this.gameView.MuteBtn.active = true;
        this.gameView.UnMuteBtn.active = false;
    }

    private setAudioVolume(volume: number): void {
        this.gameView.WinSound.volume = volume;
        this.gameView.LoseSound.volume = volume;
        this.gameView.ClickSound.volume = volume;
        this.gameView.BgSound.volume = volume;
        this.gameView.BtnClickSound.volume = volume;
    }

    private Show(newArray: number[]): void {
        this.setupBoard(newArray);
    }

    private setupBoard(newArray: number[] = [0, 1, 2, 3]): void {
        const boardSize = this.gameView.Board.getComponent(UITransform);
        const positions = [
            new Vec3(-boardSize.width / 2, 0, 0),
            new Vec3(0, boardSize.height / 2, 0),
            new Vec3(boardSize.width / 2, 0, 0),
            new Vec3(0, -boardSize.height / 2, 0)
        ];
        const rotations = [-180, 90, 0, -90];
        const colors = [Constant.RED, Constant.GREEN, Constant.BLUE, Constant.YELLOW];
        this.gameView.Board.removeAllChildren();
        positions.forEach((position, i) => {
            const bracketNode = instantiate(this.gameView.BracketPrefab);
            bracketNode.setPosition(position);
            bracketNode.angle = rotations[i];
            bracketNode.getComponent(Sprite).color = colors[newArray[i]];
            this.gameView.Board.addChild(bracketNode);
        });
    }

    private saveBestScore(): void {
        const highScoreFromLocalStorage = parseInt(localStorage.getItem('highScore')) || 0;
        if (this.currScore > highScoreFromLocalStorage) {
            localStorage.setItem('highScore', this.currScore.toString());
        }
    }
}

