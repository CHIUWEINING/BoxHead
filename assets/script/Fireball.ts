// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fireball extends cc.Component {
    
    private dirX:number=0;
    private dirY:number=0;
    private speed:number=60;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
    }
    init(dirX,dirY){
        this.dirX=dirX;
        this.dirY=dirY;
    }
    update (dt) {
        if(this.dirX!=0)this.node.scaleX=this.dirX;
        this.node.x+=this.speed*this.dirX*dt;
        this.node.y+=this.speed*this.dirY*dt;
    }
    onBeginContact(contact, self, other){
        if(other.node.group=='Wall'){
            this.node.destroy();
        }
    }
    playAnimation(){
        
    }
    //onEndContact(contact,self,other)
    
}