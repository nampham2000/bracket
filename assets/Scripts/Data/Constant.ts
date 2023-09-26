import { _decorator, Color, Component, Node, Vec3, Vec4 } from 'cc';
const { ccclass, property } = _decorator;
export type DataUser = {
    highScore: number
}
@ccclass('Constant')
export class Constant extends Component {
    public static readonly RED: Color = new Color(255,29,0,255);
    public static readonly GREEN: Color = new Color(0,255,153,255);
    public static readonly BLUE: Color = new Color(0,153,255,255);
    public static readonly YELLOW: Color = new Color(255,204,0,255);
    public static readonly MAX_SCORE: string = 'Best score bracket';
    public static readonly audioVolumeKey: string = 'bracket sound';
    public static speed: number = 150;
    public static dataUser: DataUser = {
        highScore: 0
    }
}

