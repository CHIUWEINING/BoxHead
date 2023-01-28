const {ccclass, property} = cc._decorator;
import Player from "./Player";
@ccclass
export default class GameMgr extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    
    // LIFE-CYCLE CALLBACKS:
    public time:number=0;
    public pause:boolean=false;
    public reset:boolean=false;
    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        //cc.audioEngine.playMusic(this.bgm,true);
        this.schedule(function(){
            this.time++;
        },1)
    }
    die(){
        console.log('die');
    }
    update () {
        //this.camera.x=this.player.x;
        //this.camera.y=this.player.y;
    }
}
