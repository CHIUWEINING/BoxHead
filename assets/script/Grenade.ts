// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Grenade extends cc.Component {

    
    private dirX=0;
    private dirY=0;
    private speed=150;
    private anim: cc.Animation = null;
    public state:number=0;//unexploded
    private bounced:boolean=false;
    @property(cc.Prefab)
    exploded:cc.Prefab=null;
    @property({type:cc.AudioClip})
    sound: cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }
    update(dt){
        if(this.dirX!=0)this.node.scaleX=this.dirX;
        this.node.x+=this.speed*this.dirX*dt;
        this.node.y+=this.speed*this.dirY*dt;
        if(this.speed>0)this.speed-=1;
        if(this.speed==149 && this.bounced==false){
            this.bounced=true;
            this.Grenade_bounce();
        }
    }
    init(dirX,dirY){
        this.dirX=dirX;
        this.dirY=dirY;
    }
    onBeginContact(contact, self, other){
        if(other.node.group=='Wall'){
            this.dirX*=-1;
            this.dirY*=-1;
        }
    }
    start () {
        this.anim=this.getComponent(cc.Animation);
    }
    Grenade_bounce(){
        var easeRate:number=2;
        let action : cc.Action;
        let finished=cc.callFunc(function(){
            this.state=1;
            this.node.group='Grenade';
            this.getComponent(cc.PhysicsBoxCollider).size.width=100;
            this.getComponent(cc.PhysicsBoxCollider).size.height=100;
            this.getComponent(cc.PhysicsBoxCollider).apply();
            this.anim.play('Explode');
            cc.audioEngine.playEffect(this.sound,false);
            this.anim.on('finished',this.After_explode,this);
        },this);
        let sequence1 = cc.sequence(cc.moveBy(0.2, 0,20).easing(cc.easeInOut(easeRate)), cc.moveBy(0.2, 0 ,-20).easing(cc.easeInOut(easeRate)), cc.moveBy(0.15,0 ,15).easing(cc.easeInOut(easeRate)), cc.moveBy(0.15, 0 ,-15).easing(cc.easeInOut(easeRate)), cc.moveBy(0.1,0 ,10).easing(cc.easeInOut(easeRate)), cc.moveBy(0.1,0 ,-10).easing(cc.easeInOut(easeRate)), cc.moveBy(0.05,0 ,5).easing(cc.easeInOut(easeRate)), cc.moveBy(0.05,0 ,-5).easing(cc.easeInOut(easeRate)),finished);
        action=sequence1;
        this.node.runAction(action);
    }
    After_explode(){
        var E=cc.instantiate(this.exploded);
        E.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/boxy/layer1').addChild(E);
        this.node.destroy();
    }
    // update (dt) {}
}