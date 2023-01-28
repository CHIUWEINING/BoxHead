// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Landmine extends cc.Component {
    private anim: cc.Animation = null;
    public state:number=0;//unexploded
    @property(cc.Prefab)
    exploded:cc.Prefab=null;
    @property({type:cc.AudioClip})
    explode_sound: cc.AudioClip = null;
    onLoad(){}
    start(){
        this.anim=this.getComponent(cc.Animation);
    }
    onBeginContact(contact, self, other){
        if((other.node.name=='Zombie' || other.node.name=='Boss') && this.state==0){
            this.explode();
        }
    }
    explode(){
        this.getComponent(cc.PhysicsBoxCollider).size.width=100;
        this.getComponent(cc.PhysicsBoxCollider).size.height=100;
        this.getComponent(cc.PhysicsBoxCollider).apply();
        this.state=1;
        this.anim.play('Explode');
        cc.audioEngine.playEffect(this.explode_sound,false);
        this.anim.on('finished',this.After_explode,this);
    }
    After_explode(){
        var E=cc.instantiate(this.exploded);
        E.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/boxy/layer1').addChild(E);
        this.node.destroy();
    }
}