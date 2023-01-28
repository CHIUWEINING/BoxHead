// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    
    private dirX=0;
    private dirY=0;
    private speed=2000;
    @property({type:cc.AudioClip})
    sound: cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.audioEngine.playEffect(this.sound,false);
    }
    update(dt){
        if(this.dirX!=0)this.node.scaleX=this.dirX;
        this.node.x+=this.speed*this.dirX*dt;
        this.node.y+=this.speed*this.dirY*dt;
    }
    onBeginContact(contact, self, other){
        if(other.node.group=='Wall'){
            this.node.destroy();
        }
    }
    init(dirX,dirY){
        this.dirX=dirX;
        this.dirY=dirY;
        if(this.dirX==1){
            if(this.dirY==1)this.node.rotation=-45;
            else if(this.dirY==-1)this.node.rotation=45;
        }else if(this.dirX==-1){
            if(this.dirY==1)this.node.rotation=45;
            else if(this.dirY==-1)this.node.rotation=-45;
        }else this.node.rotation=90;
    }
    start () {

    }

    // update (dt) {}
}
