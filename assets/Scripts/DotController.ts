import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { Constant } from './Data/Constant';

@ccclass('DotController')
export class DotController extends Component {
    private speed: number = 150;
    public get Speed(): number {
        return this.speed;
    }
    public set Speed(value: number) {
        this.speed = value;
    }

    update(deltaTime: number) {
        let yNewPos = this.node.position.y - deltaTime * Constant.speed;
        this.node.setPosition(0,yNewPos);
    }
}

