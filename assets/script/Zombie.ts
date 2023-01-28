// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Zombie extends cc.Component {
    
    @property(cc.Node)
    gameMgr:cc.Node=null;
    @property(cc.Prefab)
    redbox: cc.Prefab = null;
    @property(cc.Prefab)
    score:cc.Prefab=null;
    @property(cc.Node)
    player:cc.Node=null;
    @property(cc.Prefab)
    blood:cc.Prefab=null;
    @property(cc.Prefab)
    blood1:cc.Prefab=null;
    @property(cc.SpriteFrame)
    Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    LeftDown:cc.SpriteFrame=null;
    private Hit:boolean=false;
    private Hit1:boolean=false;
    private dead:boolean=false;
    private hitX:number=0;
    private hitY:number=0;
    private dirX:number=0;
    private dirY:number=0;
    private postX:number=0;
    private postY:number=0;
    private speed:number=20;
    private hp:number=100;
    private arr_hp=[100,200,300];
    private anim: cc.Animation = null;
    public Atk:number=0;
    private follow:number=1;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameMgr=cc.find('envMgr');
        if(this.gameMgr.getComponent('envMgr').mode=='cooperate'){
            this.follow=Math.floor(Math.random()*2);
            if(this.follow==1){
                //while(this.gameMgr.getComponent('envMgr').player != null) 
                this.player=this.gameMgr.getComponent('envMgr').player;
            }else{
                //while(this.gameMgr.getComponent('envMgr').player2 != null) 
                this.player=this.gameMgr.getComponent('envMgr').player2;
            }
        }else{
            //while(this.gameMgr.getComponent('envMgr').player != null) 
            this.player=this.gameMgr.getComponent('envMgr').player;
        }
        cc.director.getPhysicsManager().enabled = true;
        this.getComponent(cc.RigidBody).gravityScale=0;
    }

    start () {
        var dif;
        //while (this.gameMgr.getComponent('envMgr').difficulty != null) 
        dif = this.gameMgr.getComponent('envMgr').difficulty;
        this.hp=this.arr_hp[dif-1];
        this.anim=this.getComponent(cc.Animation);
    }

    update (dt) {
        if(this.Atk==0 && this.Hit && !this.Hit1 && !this.dead && this.hitX==0 && this.hitY==0){
            this.Hit=false;
        }
        if(this.Atk==0){
            this.getComponent(cc.PhysicsBoxCollider).size.width=32;
            this.getComponent(cc.PhysicsBoxCollider).size.height=47;
            this.getComponent(cc.PhysicsBoxCollider).apply();
            if(this.dirX!=0 || this.dirY!=0){
                this.postX=this.dirX;
                this.postY=this.dirY;
            }
            if(this.player.node.x< this.node.x && this.node.x-this.player.node.x>40){
                    //this.node.scaleX=-1;
                    this.dirX=-1;
            }else if(this.player.node.x>this.node.x && this.player.node.x-this.node.x>40){
                //this.node.scaleX=1;
                this.dirX=1;
            }else this.dirX=0;
            if(this.player.node.y<this.node.y && this.node.y-this.player.node.y>50){
                this.dirY=-1;
            }else if (this.player.node.y>this.node.y && this.player.node.y-this.node.y>50){
                this.dirY=1;
            }else this.dirY=0;
            if(!this.Hit && !this.dead){
                this.node.x+=this.dirX*this.speed*dt;
                this.node.y+=this.dirY*this.speed*dt;
            }
        }
        if(this.Hit1){
            var B=cc.instantiate(this.blood);
            B.setPosition(this.node.x,this.node.y);
            cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer1').addChild(B);
            this.node.x+=this.hitX*7*-1;
            this.node.y+=this.hitY*7*-1;
            this.hitX=0;
            this.hitY=0;
            this.Hit1=false;
        }
        if(this.dirX==1){
            if(this.dirY==0)this.getComponent(cc.Sprite).spriteFrame=this.Right;
            else if(this.dirY==1)this.getComponent(cc.Sprite).spriteFrame=this.RightUp;
            else this.getComponent(cc.Sprite).spriteFrame=this.RightDown;
        }else if(this.dirX==-1){
            if(this.dirY==0)this.getComponent(cc.Sprite).spriteFrame=this.Left;
            else if(this.dirY==1)this.getComponent(cc.Sprite).spriteFrame=this.LeftUp;
            else this.getComponent(cc.Sprite).spriteFrame=this.LeftDown;
        }else{
            if(this.dirY==1)this.getComponent(cc.Sprite).spriteFrame=this.Up;
            else if(this.dirY==-1)this.getComponent(cc.Sprite).spriteFrame=this.Down;
        }
        this.playAnimation();
        this.attack();
    }
    attack(){
        if(this.dirX==0 && this.dirY==0){
            if(this.postY==1){
                if(this.postX==1){
                    this.Atk=2;
                }
                else if(this.postX==-1)this.Atk=3;
                else if(this.postX==0)this.Atk=1;
            }else if(this.postY==-1){
                if(this.postX==1)this.Atk=4;
                else if(this.postX==-1)this.Atk=5;
                else if(this.postX==0)this.Atk=4;
            }else if (this.postY==0){
                if(this.postX==1)this.Atk=4;
                else if(this.postX==-1)this.Atk=5;
            }
        }
    }
    hurt(damage){
        this.hp-=damage;
        if(this.hp<=0)this.die();
    }
    onBeginContact(contact, self, other){
        
        if(other.node.name=='Bullet'){
            other.node.destroy();
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(20);
        }else if(other.node.name=='Shotgun'){
            other.node.destroy();
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(100);
        }
        else if(other.node.name=='Bullet_uzi'){
            other.node.destroy();
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(10);
        }else if(other.node.name=='Barrel' && other.getComponent('Barrel').state==1){
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(100);
        }else if(other.node.name=='Grenade'){
                if(other.getComponent('Grenade').state==1){
                    this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
                    this.hurt(100);
                }else if(other.getComponent('Grenade').state==0) contact.disabled=true;
        }else if(other.node.name=='Landmine' && other.getComponent('Landmine').state==1){
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(80);
        }else if(other.node.name=='Bullet_railgun'){
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(40);
            contact.disabled=true;
        }else if(other.node.name=='Rocket' && other.getComponent('Rocket').state==1){
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(80);
        }else if(other.node.name=='Fireball'){
            other.node.destroy();
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(80);
        }/*else if(other.node.group=='Player'){
            console.log(this.Atk);
            if(this.follow==1 && this.Atk==-1){
                other.getComponent('Player').hit(contact.getWorldManifold().normal.x*-1,contact.getWorldManifold().normal.y*-1);
                other.getComponent('Player').hurt(25);
            }else if(this.follow==0 && this.Atk==-1){
                other.getComponent('Player2').hit(contact.getWorldManifold().normal.x*-1,contact.getWorldManifold().normal.y*-1);
                other.getComponent('Player2').hurt(25);
            }
        }*/
    }
    onEndContact(contact,self,other){
        contact.disabled=false;
    }
    playAnimation(){
        if(this.dead){
            if(this.hitX==1){
                if(!this.anim.getAnimationState('aa_flat').isPlaying)this.anim.play('aa_flat');
            }else if(this.hitX==-1){
                if(!this.anim.getAnimationState('dd_flat').isPlaying)this.anim.play('dd_flat');
            }else{
                if(this.hitY==1 && !this.anim.getAnimationState('ss_flat').isPlaying)this.anim.play('ss_flat');
                else if(this.hitY==-1 && !this.anim.getAnimationState('ww_flat').isPlaying)this.anim.play('ww_flat');
            }
            this.anim.on('finished',this.After_die,this);
        }
        else if(this.Hit){
            if(this.hitX==1){
                if(!this.anim.getAnimationState('aa_hit').isPlaying)this.anim.play('aa_hit');
            }else if(this.hitX==-1){
                if(!this.anim.getAnimationState('dd_hit').isPlaying)this.anim.play('dd_hit');
            }else{
                if(this.hitY==1 && !this.anim.getAnimationState('ss_hit').isPlaying)this.anim.play('ss_hit');
                else if(this.hitY==-1 && !this.anim.getAnimationState('ww_hit').isPlaying)this.anim.play('ww_hit');
            }
            this.anim.on('finished',this.After_hit,this);
        }
        else if(this.Atk==0){
            if(this.dirX==1){
                if(this.dirY==1 && !this.anim.getAnimationState('zombie_wdMove').isPlaying)this.anim.play('zombie_wdMove');
                else if(this.dirY==-1 && !this.anim.getAnimationState('zombie_sdMove').isPlaying)this.anim.play('zombie_sdMove');
                else if(this.dirY==0 && !this.anim.getAnimationState('zombie_dMove').isPlaying)this.anim.play('zombie_dMove');
            }else if(this.dirX==-1){
                if(this.dirY==1 && !this.anim.getAnimationState('zombie_waMove').isPlaying)this.anim.play('zombie_waMove');
                else if(this.dirY==-1 && !this.anim.getAnimationState('zombie_saMove').isPlaying)this.anim.play('zombie_saMove');
                else if(this.dirY==0 && !this.anim.getAnimationState('zombie_aMove').isPlaying)this.anim.play('zombie_aMove');
            }else{
                if(this.dirY==1 && !this.anim.getAnimationState('zombie_wMove').isPlaying)this.anim.play('zombie_wMove');
                else if(this.dirY==-1 && !this.anim.getAnimationState('zombie_sMove').isPlaying)this.anim.play('zombie_sMove');
            }
            //this.anim.on('finished',this.After_walk,this);
        }else{
            this.getComponent(cc.PhysicsBoxCollider).size.width=62;
            this.getComponent(cc.PhysicsBoxCollider).size.height=57;
            this.getComponent(cc.PhysicsBoxCollider).apply();
            if(this.Atk==1){
                if(!this.anim.getAnimationState('ww_atk').isPlaying)this.anim.play('ww_atk');
            }else if(this.Atk==2){
                if(!this.anim.getAnimationState('wd_atk').isPlaying)this.anim.play('wd_atk');
            }else if(this.Atk==3){
                if(!this.anim.getAnimationState('wa_atk').isPlaying)this.anim.play('wa_atk');
            }else if(this.Atk==4){
                if(!this.anim.getAnimationState('dd_atk').isPlaying)this.anim.play('dd_atk');
            }else if(this.Atk==5){
                if(!this.anim.getAnimationState('aa_atk').isPlaying)this.anim.play('aa_atk');
            }
            this.anim.on('finished',this.After_atk,this);
        }
    }
    /*After_walk(){
        console.log('1');
        this.Hit1=false;
        this.Hit=false;
        this.Atk=0;
    }*/
    After_hit(){
        console.log('bbb')
        this.Atk=0;
        this.Hit=false;
        this.Hit1=true;
        this.anim.off('finished',this.After_hit,this);
    }
    After_atk(){
        console.log('aaa');
        this.Atk=0;
        this.getComponent(cc.PhysicsBoxCollider).size.width=32;
        this.getComponent(cc.PhysicsBoxCollider).size.height=47;
        this.getComponent(cc.PhysicsBoxCollider).apply();
        this.anim.off('finished',this.After_atk,this);
    }
    After_die(){
        var B1=cc.instantiate(this.blood1);
        B1.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer1').addChild(B1);
        this.gameMgr.getComponent('envMgr').z_num--;
        this.gameMgr.getComponent('envMgr').scorePlus(300);
        if(Math.floor(Math.random()*5)==1){
            var r=cc.instantiate(this.redbox);
            r.setPosition(this.node.x,this.node.y);
            cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer2').addChild(r);
        }
        if(this.gameMgr.getComponent('envMgr').z_num==0 && this.gameMgr.getComponent('envMgr').b_num==0 && (this.gameMgr.getComponent('envMgr').level+1)*6==this.gameMgr.getComponent('envMgr').z_count && this.gameMgr.getComponent('envMgr').level+1==this.gameMgr.getComponent('envMgr').b_count)this.gameMgr.getComponent('envMgr').upgrade();
        this.node.destroy();
    }
    //onEndContact(contact,self,other)
    die(){
        this.dead=true;
    }
    hit(dirX,dirY){
        this.Hit=true;
        this.hitX=dirX;
        this.hitY=dirY;
    }

}