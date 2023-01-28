// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rocket extends cc.Component {

    
    private dirX=0;
    private dirY=0;
    private speed=400;
    private anim: cc.Animation = null;
    private touch:boolean=false;
    public state:number=0;//unexploded
    @property(cc.Prefab)
    exploded:cc.Prefab=null;
    @property({type:cc.AudioClip})
    explode_sound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    init_sound: cc.AudioClip = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }
    update(dt){
        if(this.dirX!=0)this.node.scaleX=this.dirX;
        this.node.x+=this.speed*this.dirX*dt;
        this.node.y+=this.speed*this.dirY*dt;
    }
    onBeginContact(contact, self, other){
        if((other.node.name=='Zombie' || other.node.name=='Boss') && this.state==0){
            this.explode();
        }else if(other.node.group=='Wall'){
            this.speed=0;
            if(!this.touch)this.explode();
            this.touch=true;
        }
    }
    explode(){
        this.node.group='Grenade';
        this.getComponent(cc.PhysicsBoxCollider).size.width=100;
        this.getComponent(cc.PhysicsBoxCollider).size.height=100;
        this.getComponent(cc.PhysicsBoxCollider).apply();
        this.state=1;
        this.anim.play('Explode');
        cc.audioEngine.playEffect(this.explode_sound,false);
        this.anim.on('finished',this.After_explode,this);
    }
    init(dirX,dirY){
        this.dirX=dirX;
        this.dirY=dirY;
    }
    start () {
        this.anim=this.getComponent(cc.Animation);
        cc.audioEngine.playEffect(this.init_sound,false);
    }
    After_explode(){
        var E=cc.instantiate(this.exploded);
        E.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/boxy/layer1').addChild(E);
        this.node.destroy();
    }
    // update (dt) {}
}