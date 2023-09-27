import { _decorator, Component, Node, Prefab, input, Input, sys, director, AudioSource, UITransform, Vec3, instantiate, Sprite, Animation, Label } from 'cc';
const { ccclass, property } = _decorator;
import { Constant } from './Data/Constant';

@ccclass('TutorialController')
export class TutorialController extends Component {
    @property({
        type: Node
    })
    private board: Node;

    @property({
        type: Prefab
    })
    private bracketPrefab: Prefab;

    @property({
        type: Label
    })
    private Best: Label;

    private oldArray: number[] = [0,1,2,3];
    private newArray: number[] = [];
    private volumeValue: number = 1;

    start() {
        const highScoreFromLocalStorage = localStorage.getItem('highScore');
        if (highScoreFromLocalStorage !== null) {
            Constant.dataUser.highScore = parseInt(highScoreFromLocalStorage);
        } else {
            Constant.dataUser.highScore = 0;
        }

        this.Best.string=`Best Score\n${highScoreFromLocalStorage}`
        input.on(Input.EventType.TOUCH_END, () => {
            director.loadScene('Game');
        }, this);
    }

    protected onLoad(): void {
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
        [this.oldArray[0], this.oldArray[1], this.oldArray[2], this.oldArray[3]] =
        [this.oldArray[3], this.oldArray[2], this.oldArray[1], this.oldArray[0]];
        const newArray = [...this.oldArray];
        const colors = [Constant.RED, Constant.GREEN, Constant.BLUE, Constant.YELLOW];
        this.board.children.forEach((child, i) => {
            child.getComponent(Sprite).color = colors[newArray[i]];
        });
    }
}

