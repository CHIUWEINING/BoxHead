const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss extends cc.Component {

    
    @property(cc.Node)
    gameMgr:cc.Node=null;
    @property(cc.Prefab)
    score:cc.Prefab=null;
    @property(cc.Prefab)
    fireball:cc.Prefab=null;
    @property(cc.Node)
    player:cc.Node=null;
    @property(cc.Prefab)
    blood:cc.Prefab=null;
    @property(cc.Prefab)
    blood1:cc.Prefab=null;
    @property(cc.Prefab)
    redbox:cc.Prefab=null;
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
    private postX:number=0;
    private postY:number=0;
    private Hit1:boolean=false;
    private dead:boolean=false;
    private hitX:number=0;
    private hitY:number=0;
    private dirX:number=0;
    private dirY:number=0;
    private speed:number=20;
    private hp:number=100;
    private arr_hp=[400,600,800];
    private atk_cd:number=0;
    private Atk:boolean=false;
    private anim: cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameMgr=cc.find('envMgr');
        if(this.gameMgr.getComponent('envMgr').mode=='cooperate'){
            if(Math.floor(Math.random()*2)==1){
                this.player=this.gameMgr.getComponent('envMgr').player;
            }else{
                this.player=this.gameMgr.getComponent('envMgr').player2;
            }
        }else{
            this.player=this.gameMgr.getComponent('envMgr').player;
        }
        cc.director.getPhysicsManager().enabled = true;
        this.getComponent(cc.RigidBody).gravityScale=0;
    }

    start () {
        this.hp=this.arr_hp[this.gameMgr.getComponent('envMgr').difficulty-1];
        this.anim=this.getComponent(cc.Animation);
        this.schedule(function(){
            if(this.atk_cd>0)this.atk_cd--;
        },1)
    }

    update (dt) {
        if(!this.Atk && this.Hit && !this.Hit1 && !this.dead && this.hitX==0 && this.hitY==0){
            this.Hit=false;
        }
        if(this.Atk==false){
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
            if(this.player.node.y<this.node.y && this.node.y-this.player.node.y>40){
                this.dirY=-1;
            }else if (this.player.node.y>this.node.y && this.player.node.y-this.node.y>40){
                this.dirY=1;
            }else this.dirY=0;
            if(!this.dead && !this.Hit){
                this.node.x+=this.dirX*this.speed*dt;
                this.node.y+=this.dirY*this.speed*dt;
            }
        }if(this.Hit1){
            var B=cc.instantiate(this.blood);
            B.setPosition(this.node.x,this.node.y);
            cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer1').addChild(B);
            this.node.x+=this.hitX*10*-1;
            this.node.y+=this.hitY*10*-1;
            this.Hit1=false;
            this.hitX=0;
            this.hitY=0;
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
        if(!this.Hit)this.attack();
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
        }else if(other.node.name=='Bullet_uzi'){
            other.node.destroy();
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(10);
        }else if(other.node.name=='Shotgun'){
            other.node.destroy();
            //console.log(contact.getWorldManifold().normal.x*-1);
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(100);
        }
        else if(other.node.name=='Barrel' && other.getComponent('Barrel').state==1){
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
        }
    }
    onEndContact(contact,self,other){
        contact.disabled=false;
    }
    playAnimation(){
        if(this.dead){
            if(this.hitX==1){
                if(!this.anim.getAnimationState('dd_flat').isPlaying)this.anim.play('dd_flat');
            }else if(this.hitX==-1){
                if(!this.anim.getAnimationState('aa_flat').isPlaying)this.anim.play('aa_flat');
            }else{
                if(this.hitY==1 && !this.anim.getAnimationState('ww_flat').isPlaying)this.anim.play('ww_flat');
                else if(this.hitY==-1 && !this.anim.getAnimationState('ss_flat').isPlaying)this.anim.play('ss_flat');
            }
            this.anim.on('finished',this.After_die,this);
        }
        else if(this.Hit){
            if(this.hitX==1){
                if(this.hitY==1){
                    if(!this.anim.getAnimationState('wd_hit').isPlaying)this.anim.play('wd_hit');
                }
                else if(this.hitY==-1){
                    if(!this.anim.getAnimationState('sd_hit').isPlaying)this.anim.play('sd_hit');
                }else if(this.hitY==0){
                    if(!this.anim.getAnimationState('dd_hit').isPlaying)this.anim.play('dd_hit');
                }
            }else if(this.hitX==-1){
                if(this.hitY==1){
                    if(!this.anim.getAnimationState('wa_hit').isPlaying)this.anim.play('wa_hit');
                }
                else if(this.hitY==-1){
                    if(!this.anim.getAnimationState('sa_hit').isPlaying)this.anim.play('sa_hit');
                }else if(this.hitY==0){
                    if(!this.anim.getAnimationState('aa_hit').isPlaying)this.anim.play('aa_hit');
                }
            }else{
                if(this.hitY==1 && !this.anim.getAnimationState('ww_hit').isPlaying)this.anim.play('ww_hit');
                else if(this.hitY==-1 && !this.anim.getAnimationState('ss_hit').isPlaying)this.anim.play('ss_hit');
            }
            this.anim.on('finished',this.After_hit,this);
        }
        else if(!this.Atk){
            if(this.dirX==1){
                if(this.dirY==1 && !this.anim.getAnimationState('wd_Move').isPlaying)this.anim.play('wd_Move');
                else if(this.dirY==-1 && !this.anim.getAnimationState('sd_move').isPlaying)this.anim.play('sd_move');
                else if(this.dirY==0 && !this.anim.getAnimationState('dd_Move').isPlaying)this.anim.play('dd_Move');
            }else if(this.dirX==-1){
                if(this.dirY==1 && !this.anim.getAnimationState('wa_Move').isPlaying)this.anim.play('wa_Move');
                else if(this.dirY==-1 && !this.anim.getAnimationState('sa_Move').isPlaying)this.anim.play('sa_Move');
                else if(this.dirY==0 && !this.anim.getAnimationState('aa_Move').isPlaying)this.anim.play('aa_Move');
            }else{
                if(this.dirY==1 && !this.anim.getAnimationState('ww_Move').isPlaying)this.anim.play('ww_Move');
                else if(this.dirY==-1 && !this.anim.getAnimationState('ss_Move').isPlaying)this.anim.play('ss_Move');
            }
        }else{
            if(this.postX==1){
                if(this.postY==1 && !this.anim.getAnimationState('wd_Atk').isPlaying)this.anim.play('wd_Atk');
                else if(this.postY==-1 && !this.anim.getAnimationState('sd_Atk').isPlaying)this.anim.play('sd_Atk');
                else if(this.postY==0 && !this.anim.getAnimationState('dd_Atk').isPlaying)this.anim.play('dd_Atk');
            }else if(this.postX==-1){
                if(this.postY==1 && !this.anim.getAnimationState('wa_Atk').isPlaying)this.anim.play('wa_Atk');
                else if(this.postY==-1 && !this.anim.getAnimationState('sa_Atk').isPlaying)this.anim.play('sa_Atk');
                else if(this.postY==0 && !this.anim.getAnimationState('aa_Atk').isPlaying)this.anim.play('aa_Atk');
            }else{
                if(this.postY==1 && !this.anim.getAnimationState('ww_Atk').isPlaying)this.anim.play('ww_Atk');
                else if(this.postY==-1 && !this.anim.getAnimationState('ss_Atk').isPlaying)this.anim.play('ss_Atk');
            }
            this.anim.on('finished',this.shoot,this);
        }
    }
    After_hit(){
        console.log('cccccccccc');
        this.Atk=false;
        this.Hit=false;
        this.Hit1=true;
        this.anim.off('finished',this.After_hit,this);
    }
    After_die(){
        var B1=cc.instantiate(this.blood1);
        B1.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer1').addChild(B1);
        var r=cc.instantiate(this.redbox);
        r.setPosition(this.node.x,this.node.y);
        cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer2').addChild(r);
        this.gameMgr.getComponent('envMgr').b_num--;
        this.gameMgr.getComponent('envMgr').scorePlus(1200);
        if(this.gameMgr.getComponent('envMgr').z_num==0 && this.gameMgr.getComponent('envMgr').b_num==0 && (this.gameMgr.getComponent('envMgr').level+1)*6==this.gameMgr.getComponent('envMgr').z_count && this.gameMgr.getComponent('envMgr').level+1==this.gameMgr.getComponent('envMgr').b_count)this.gameMgr.getComponent('envMgr').upgrade();
        this.node.destroy();
    }
    shoot(){
        this.Atk=false;
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
    attack(){
        if(this.atk_cd==0){
            var dist_x=this.player.node.x-this.node.x;
            var dist_y=this.player.node.y-this.node.y;
            this.atk_cd=10;
            if(dist_x*dist_x+dist_y*dist_y>0){
                this.Atk=true;
                var ball=cc.instantiate(this.fireball);
                ball.setPosition(this.node.x+this.dirX*40,this.node.y+this.dirY*40);
                cc.find('Canvas/'+this.gameMgr.getComponent('envMgr').map+'/layer2').addChild(ball);
                ball.getComponent('Fireball').init(this.dirX,this.dirY);
            }
        }
    }
    // update (dt) {}
}