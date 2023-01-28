import envMgr from "./envMgr";

const {ccclass, property} = cc._decorator;
declare const firebase: any;
@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    gameMgr: cc.Node = null;
    @property(cc.Node)
    camMgr: cc.Node = null;
    @property(cc.Prefab)
    wave : cc.Prefab = null;
    @property(cc.Prefab)
    pistol : cc.Prefab = null;
    @property(cc.Prefab)
    uzi: cc.Prefab = null;
    @property(cc.Prefab)
    shotgun: cc.Prefab = null;
    @property(cc.Prefab)
    grenade: cc.Prefab = null;
    @property(cc.Prefab)
    barrel: cc.Prefab = null;
    @property(cc.Prefab)
    landmine: cc.Prefab = null;
    @property(cc.Prefab)
    railgun: cc.Prefab = null;
    @property(cc.Prefab)
    rocket: cc.Prefab = null;
    @property({type:cc.AudioClip})
    uzi_sound: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    reload: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    shotgun_sound: cc.AudioClip = null;
    @property(cc.SpriteFrame)
    pistol_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    pistol_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    uzi_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    shotgun_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    kong_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    railgun_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_Right:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_Left:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_Up:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_Down:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_RightUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_RightDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_LeftUp:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    rocket_LeftDown:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    blood_100:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    blood_75:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    blood_50:cc.SpriteFrame=null;
    @property(cc.SpriteFrame)
    blood_25:cc.SpriteFrame=null;
    private post_x=0;
    private post_y=0;
    private moveDirX = 0;
    private moveDirY = 0;
    private leftDown: boolean = false;
    private upDown: boolean = false;
    private zDown: boolean = false;
    private downDown: boolean = false;
    private rightDown: boolean = false;
    private spaceDown: boolean =false;
    private playerSpeed:number = 100;
    private uzi_ammo:number=80;
    private faceX:number=1;
    private faceY:number=0;
    private Hit:boolean=false;
    private hitX:number=0;
    private hitY:number=0;
    private hp:number=100;
    private anim: cc.Animation = null;
    private weapon_gain=1;
    private weapon_num=1;//1=pistol 2=uzi 3=shotgun 4=grenade 5=landmine 6=barrel 7=railgun 8=rocket
    private uzi_id:number=-1;
    private grenade_num=8;
    private landmine_num=10;
    private barrel_num=10;
    private railgun_num=50;
    private rocket_num=20;
    private shotgun_num=30;
    private recover:number=0;
    private map;
    private map_h;
    private map_w;
    onLoad () {
        /*firebase.database().ref('map').once('value', (s=>{
            this.map = s.val();
        }))*/
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getPhysicsManager().enabled = true;
        this.getComponent(cc.RigidBody).gravityScale=0;
        this.gameMgr=cc.find('envMgr');
        this.camMgr=cc.find('camMgr');
        //if(this.node.name!='bert' )this.node.destroy();
        this.map = this.gameMgr.getComponent(envMgr).map;
        this.map_h = this.gameMgr.getComponent(envMgr).map_h;
        this.map_w = this.gameMgr.getComponent(envMgr).map_w;
        cc.log(this.map_h);
        cc.log(this.map_w);
        this.schedule(function(){
           if(!this.Hit){
                this.recover++;
                if(this.recover>=7){
                    this.recover=0;
                    if(this.hp<=75)this.hp+=25;
                }
           }else{
                this.recover=0;
           }
        },1);
        
    }
    update(dt){
        this.post_x=this.node.x;
        this.post_y=this.node.y;
        if(this.hp==100)this.node.getChildByName('blood').getComponent(cc.Sprite).spriteFrame=this.blood_100;
        else if(this.hp==75)this.node.getChildByName('blood').getComponent(cc.Sprite).spriteFrame=this.blood_75;
        else if(this.hp==50)this.node.getChildByName('blood').getComponent(cc.Sprite).spriteFrame=this.blood_50;
        else if(this.hp==25)this.node.getChildByName('blood').getComponent(cc.Sprite).spriteFrame=this.blood_25;
        if(!this.Hit){
            //if (this.node.x < this.map_w/2-10 && this.node.x > -(this.map/2-10))
            var new_x = this.node.x + this.playerSpeed * this.moveDirX * dt;
            var new_y = this.node.y + this.playerSpeed * this.moveDirY * dt;
            if (this.map == "gladiator"){
                if (new_x < 490 && new_x > -390) this.node.x = new_x;
                if (new_y < 660 && new_y > -290) this.node.y = new_y;
            }else{
                if (new_x < this.map_w/2-10 && new_x > -(this.map_w/2-10)) this.node.x = new_x;
                if (new_y < this.map_h/2-10 && new_y > -(this.map_h/2-10)) this.node.y = new_y;
            }
            

            //this.node.x = new_x;
            //this.node.y = new_y;
            /*if (this.node.x >= this.map_w/2-10 && this.moveDirX > 0){}
            else if (this.node.x <= -(this.map_w/2-10) && this.moveDirX < 0){}
            else this.node.x += this.playerSpeed * this.moveDirX * dt;

            if (this.node.y >= this.map_h/2-10 && this.moveDirY > 0){}
            else if (this.node.y <= -(this.map_h/2-10) && this.moveDirY < 0){}
            else this.node.y += this.playerSpeed * this.moveDirY * dt;*/
        }
        /*if(this.node.x!=this.post_x || this.node.y!=this.post_y){
            console.log(this.node.x);
            console.log(this.node.y);
            console.log('/////////////');
        }*/
        /*if(this.moveDirX>0)this.node.scaleX=1;
        else if(this.moveDirX<0)this.node.scaleX=-1;
        */
        if(this.Hit){
            var new_x = this.node.x + this.hitX*25*-1;
            var new_y = this.node.y + this.hitY*25*-1;
            if (this.map == "gladiator"){
                if (new_x < 490 && new_x > -390) this.node.x = new_x;
                if (new_y < 660 && new_y > -290) this.node.y = new_y;
            }else{
                if (new_x < this.map_w/2-10 && new_x > -(this.map_w/2-10)) this.node.x = new_x;
                if (new_y < this.map_h/2-10 && new_y > -(this.map_h/2-10)) this.node.y = new_y;
            }
            /*this.node.x+=this.hitX*25*-1;
            this.node.y+=this.hitY*25*-1;*/
            this.Hit=false;
            this.hitX=0;
            this.hitY=0;
        }
        if(this.weapon_num==1){
            this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Pistol';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.pistol_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.pistol_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.pistol_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.pistol_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.pistol_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.pistol_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.pistol_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.pistol_Down;
            }
        }
        else if(this.weapon_num==2){
            this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Uzi('+this.uzi_ammo.toString()+')';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.uzi_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.uzi_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.uzi_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.uzi_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.uzi_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.uzi_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.uzi_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.uzi_Down;
            }
        }else if(this.weapon_num==3){
            this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Shotgun('+this.shotgun_num.toString()+')';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.shotgun_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.shotgun_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.shotgun_Down;
            }
        }else if(this.weapon_num==4 || this.weapon_num==5 || this.weapon_num==6){
            if(this.weapon_num==4)this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Grenade('+this.grenade_num.toString()+')';
            else if(this.weapon_num==5)this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Landmine('+this.landmine_num.toString()+')';
            else if(this.weapon_num==6)this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Barrel('+this.barrel_num.toString()+')';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.kong_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.kong_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.kong_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.kong_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.kong_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.kong_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.kong_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.kong_Down;
            }
        }else if(this.weapon_num==7){
            this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Railgun('+this.railgun_num.toString()+')';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.railgun_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.railgun_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.railgun_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.railgun_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.railgun_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.railgun_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.railgun_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.railgun_Down;
            }
        }else if(this.weapon_num==8){
            this.node.getChildByName('weapon_name').getComponent(cc.Label).string='Rocket('+this.rocket_num.toString()+')';
            if(this.faceX==1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.rocket_Right;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.rocket_RightUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.rocket_RightDown;
            }else if(this.faceX==-1){
                if(this.faceY==0)this.getComponent(cc.Sprite).spriteFrame=this.rocket_Left;
                else if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.rocket_LeftUp;
                else this.getComponent(cc.Sprite).spriteFrame=this.rocket_LeftDown;
            }else{
                if(this.faceY==1)this.getComponent(cc.Sprite).spriteFrame=this.rocket_Up;
                else if(this.faceY==-1)this.getComponent(cc.Sprite).spriteFrame=this.rocket_Down;
            }
        }
        if((this.weapon_num!=2 || this.uzi_ammo<=0 || this.spaceDown==false) && this.uzi_id!=-1){
            cc.audioEngine.stopEffect(this.uzi_id);
            this.uzi_id=-1;
            console.log('stop');
        }
        this.playAnimation();
    }
    start () {
        this.anim=this.getComponent(cc.Animation);
    }
    onBeginContact(contact, self, other){
        
        if(other.node.name=='Redbox'){
            cc.audioEngine.playEffect(this.reload,false);
            other.node.destroy();
            this.RedBox();
            //console.log(contact.getWorldManifold().normal.x*-1);
            
        }else if(other.node.name=='Fireball'){
            other.node.destroy();
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(50);
        }else if(other.node.name=='Barrel' ){//&& other.getComponent('Barrel').state==1){//exploding
            console.log(this.node.name);
            if(other.getComponent('Barrel').state==1){
                this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
                this.hurt(50);
            }else if(other.getComponent('Barrel').state==2)contact.disabled=true;
        }else if(other.node.name=='Landmine'){
            if(other.getComponent('Landmine').state==1){
                this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
                this.hurt(50);
            }
        }else if(other.node.name=='Grenade'){
            if(other.getComponent('Grenade').state==1){
                this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
                this.hurt(50);
            }else if(other.getComponent('Grenade').state==1) contact.disabled=true;
        }else if(other.node.name=='Rocket'){
            if(other.getComponent('Rocket').state==1){
                this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
                this.hurt(50);
            }
        }else if(other.node.name=='Zombie' && other.getComponent('Zombie').Atk>0){
            console.log('zombie');
            this.hit(contact.getWorldManifold().normal.x,contact.getWorldManifold().normal.y);
            this.hurt(25);
        }
    }
    onEndContact(contact,self,other){
        contact.disabled=false;
        if(other.node.name=='Barrel' ){//&& other.getComponent('Barrel').state==1){//exploding
           if(other.getComponent('Barrel').state==2){
                console.log(this.node.name);
                other.getComponent('Barrel').state=0;
           }
        }
    }
    RedBox(){//1=pistol 2=uzi 3=shotgun 4=grenade 5=landmine 6=barrel 7=railgun 8=rocket
        if(this.gameMgr.getComponent('envMgr').score>8000){
            if(this.weapon_gain<=7){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a New weapon "Rocket"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.rocket_num<20){
                this.rocket_num=20;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Rocket';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.railgun_num<50){
                this.railgun_num=50;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Railgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.barrel_num<10){
                this.barrel_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Barrel';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.landmine_num<10){
                this.landmine_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Landmine';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.grenade_num<8){
                this.grenade_num=8;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Grenade';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>6500){
            if(this.weapon_gain<=6){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a new weapon "Railgun"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.railgun_num<50){
                this.railgun_num=50;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Railgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.barrel_num<10){
                this.barrel_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Barrel';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.landmine_num<10){
                this.landmine_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Landmine';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.grenade_num<8){
                this.grenade_num=8;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Grenade';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>5500){
            if(this.weapon_gain<=5){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a new weapon "Barrel"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.barrel_num<10){
                this.barrel_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Barrel';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.landmine_num<10){
                this.landmine_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Landmine';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.grenade_num<8){
                this.grenade_num=8;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Grenade';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>4000){
            if(this.weapon_gain<=4){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a new weapon "Landmine"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.landmine_num<10){
                this.landmine_num=10;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Landmine';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.grenade_num<8){
                this.grenade_num=8;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Grenade';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>3000){
            if(this.weapon_gain<=3){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a new weapon "Grenade"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.grenade_num<8){
                this.grenade_num=8;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Grenade';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>2000){
            if(this.weapon_gain<=2){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a new weapon "Shotgun"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.shotgun_num<30){
                this.shotgun_num=30;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Shotgun';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            else if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
        else if(this.gameMgr.getComponent('envMgr').score>1000){
            if(this.weapon_gain<=1){
                this.weapon_gain++;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='You have a New weapon "Uzi"';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
            if(this.uzi_ammo<80){
                this.uzi_ammo=80;
                cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='Refill Uzi';
                this.scheduleOnce(function(){
                    cc.find('Canvas/Main Camera/Instruction').getComponent(cc.Label).string='';
                },1)
            }
        }
    }
    hurt(damage){
        this.hp-=damage;
        if(this.hp<=0)this.die();
    }
    hit(dirX,dirY){
        this.Hit=true;
        this.hitX=dirX;
        this.hitY=dirY;
    }
    die(){
        this.gameMgr.getComponent(envMgr).endGame();
    }
    playerMoveX(moveDir: number)
    {
        this.moveDirX = moveDir;
    }
    playerMoveY(moveDir: number)
    {
        this.moveDirY = moveDir;
    }
    onKeyDown(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = true;
                this.playerMoveX(-1);
                this.faceX=-1;
                if(this.upDown)this.faceY=1;
                else if(this.downDown)this.faceY=-1;
                else this.faceY=0;
                break;
            case cc.macro.KEY.right:
                this.rightDown = true;
                this.playerMoveX(1);
                this.faceX=1;
                if(this.upDown)this.faceY=1;
                else if(this.downDown)this.faceY=-1;
                else this.faceY=0;
                break;
            case cc.macro.KEY.up:
                this.upDown = true;
                this.playerMoveY(1);
                this.faceY=1;
                if(this.rightDown)this.faceX=1;
                else if(this.leftDown)this.faceX=-1;
                else this.faceX=0;
                break;
            case cc.macro.KEY.down:
                this.downDown = true;
                this.playerMoveY(-1);
                this.faceY=-1;
                if(this.rightDown)this.faceX=1;
                else if(this.leftDown)this.faceX=-1;
                else this.faceX=0;
                break;
            case cc.macro.KEY.space:
                if(this.weapon_num==1 || this.weapon_num==3){
                    if(!this.spaceDown)this.attack();
                }else if(this.weapon_num==2){
                    this.attack();
                }else if(this.weapon_num==4 || this.weapon_num==5 || this.weapon_num==6 || this.weapon_num==7 || this.weapon_num==8){
                    if(!this.spaceDown)this.attack();
                }
                this.spaceDown = true;
                break;
            case cc.macro.KEY.z:
                if(!this.zDown)this.switchWeapon();
                this.zDown = true;
                break;
        }
    }
    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.left:
                this.leftDown = false;
                if(this.rightDown){
                    this.playerMoveX(1);
                    this.faceX=1;
                }
                else
                    this.playerMoveX(0);
                break;
            case cc.macro.KEY.right:
                this.rightDown = false;
                if(this.leftDown){
                    this.playerMoveX(-1);
                    this.faceX=-1;
                }
                else
                    this.playerMoveX(0);
                    
                break;
            case cc.macro.KEY.up:
                this.upDown = false;
                if(this.downDown){
                    this.playerMoveY(-1);
                    this.faceY=-1;
                }
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.down:
                this.downDown = false;
                if(this.upDown){
                    this.playerMoveY(1);
                    this.faceY=1;
                }
                else
                    this.playerMoveY(0);
                break;
            case cc.macro.KEY.space:
                this.spaceDown = false;
                break;
            case cc.macro.KEY.z:
                this.zDown = false;
                break;
        }
    }
    playAnimation(){
        if(this.weapon_num==1){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_pistol').isPlaying  && this.faceY==1)this.anim.play('wd_pistol');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_pistol').isPlaying  && this.faceY==-1)this.anim.play('sd_pistol');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_pistol').isPlaying && this.faceY==0)this.anim.play('dd_pistol');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_pistol').isPlaying && this.faceY==1)this.anim.play('wa_pistol');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_pistol').isPlaying && this.faceY==-1)this.anim.play('sa_pistol');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_pistol').isPlaying && this.faceY==0)this.anim.play('aa_pistol');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_pistol').isPlaying && this.faceY==1)this.anim.play('ww_pistol');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_pistol').isPlaying && this.faceY==-1)this.anim.play('ss_pistol');
            }
        }else if(this.weapon_num==2){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_uzi').isPlaying  && this.faceY==1)this.anim.play('wd_uzi');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_uzi').isPlaying  && this.faceY==-1)this.anim.play('sd_uzi');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_uzi').isPlaying && this.faceY==0)this.anim.play('dd_uzi');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_uzi').isPlaying && this.faceY==1)this.anim.play('wa_uzi');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_uzi').isPlaying && this.faceY==-1)this.anim.play('sa_uzi');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_uzi').isPlaying && this.faceY==0)this.anim.play('aa_uzi');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_uzi').isPlaying && this.faceY==1)this.anim.play('ww_uzi');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_uzi').isPlaying && this.faceY==-1)this.anim.play('ss_uzi');
            }
        }else if(this.weapon_num==3){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_shotgun').isPlaying  && this.faceY==1)this.anim.play('wd_shotgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_shotgun').isPlaying  && this.faceY==-1)this.anim.play('sd_shotgun');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_shotgun').isPlaying && this.faceY==0)this.anim.play('dd_shotgun');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_shotgun').isPlaying && this.faceY==1)this.anim.play('wa_shotgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_shotgun').isPlaying && this.faceY==-1)this.anim.play('sa_shotgun');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_shotgun').isPlaying && this.faceY==0)this.anim.play('aa_shotgun');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_shotgun').isPlaying && this.faceY==1)this.anim.play('ww_shotgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_shotgun').isPlaying && this.faceY==-1)this.anim.play('ss_shotgun');
            }
        }else if(this.weapon_num==4 || this.weapon_num==5 || this.weapon_num==6){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_kong').isPlaying  && this.faceY==1)this.anim.play('wd_kong');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_kong').isPlaying  && this.faceY==-1)this.anim.play('sd_kong');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_kong').isPlaying && this.faceY==0)this.anim.play('dd_kong');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_kong').isPlaying && this.faceY==1)this.anim.play('wa_kong');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_kong').isPlaying && this.faceY==-1)this.anim.play('sa_kong');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_kong').isPlaying && this.faceY==0)this.anim.play('aa_kong');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_kong').isPlaying && this.faceY==1)this.anim.play('ww_kong');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_kong').isPlaying && this.faceY==-1)this.anim.play('ss_kong');
            }
        }else if(this.weapon_num==7){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_railgun').isPlaying  && this.faceY==1)this.anim.play('wd_railgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_railgun').isPlaying  && this.faceY==-1)this.anim.play('sd_railgun');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_railgun').isPlaying && this.faceY==0)this.anim.play('dd_railgun');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_railgun').isPlaying && this.faceY==1)this.anim.play('wa_railgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_railgun').isPlaying && this.faceY==-1)this.anim.play('sa_railgun');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_railgun').isPlaying && this.faceY==0)this.anim.play('aa_railgun');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_railgun').isPlaying && this.faceY==1)this.anim.play('ww_railgun');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_railgun').isPlaying && this.faceY==-1)this.anim.play('ss_railgun');
            }
        }else if(this.weapon_num==8){
            if(this.moveDirX==1 && this.faceX==1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wd_rocket').isPlaying  && this.faceY==1)this.anim.play('wd_rocket');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sd_rocket').isPlaying  && this.faceY==-1)this.anim.play('sd_rocket');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('dd_rocket').isPlaying && this.faceY==0)this.anim.play('dd_rocket');
            }else if(this.moveDirX==-1 && this.faceX==-1){
                if(this.moveDirY==1 && !this.anim.getAnimationState('wa_rocket').isPlaying && this.faceY==1)this.anim.play('wa_rocket');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('sa_rocket').isPlaying && this.faceY==-1)this.anim.play('sa_rocket');
                else if(this.moveDirY==0 && !this.anim.getAnimationState('aa_rocket').isPlaying && this.faceY==0)this.anim.play('aa_rocket');
            }else if(this.faceX==0){
                if(this.moveDirY==1 && !this.anim.getAnimationState('ww_rocket').isPlaying && this.faceY==1)this.anim.play('ww_rocket');
                else if(this.moveDirY==-1 && !this.anim.getAnimationState('ss_rocket').isPlaying && this.faceY==-1)this.anim.play('ss_rocket');
            }
        }
    }
    attack(){
        if(this.weapon_num==1){
            var bullet=cc.instantiate(this.pistol);
            bullet.setPosition(this.node.x,this.node.y);
            cc.find('Canvas/'+this.map+'/layer2').addChild(bullet);
            bullet.getComponent('Bullet').init(this.faceX,this.faceY);
        }else if(this.weapon_num==2){
            if(this.uzi_ammo>0){
                if(this.uzi_id==-1){
                    this.uzi_id=cc.audioEngine.playEffect(this.uzi_sound,true);
                    console.log('play');
                }
                var bullet1=cc.instantiate(this.uzi);
                if (this.map == "buttons") bullet1.setPosition(this.node.x+50,this.node.y+100);
                else bullet1.setPosition(this.node.x,this.node.y);
                cc.find('Canvas').addChild(bullet1);
                bullet1.getComponent('Bullet_uzi').init(this.faceX,this.faceY);
                this.uzi_ammo--;
            }
        }else if(this.weapon_num==3){
            if(this.shotgun_num>0){
                var s1=cc.instantiate(this.shotgun);
                s1.setPosition(this.node.x,this.node.y);
                cc.find('Canvas/'+this.map+'/layer2').addChild(s1);
                
                var s2=cc.instantiate(this.shotgun);
                s2.setPosition(this.node.x,this.node.y);
                cc.find('Canvas/'+this.map+'/layer2').addChild(s2);
                var s3=cc.instantiate(this.shotgun);
                s3.setPosition(this.node.x,this.node.y);
                cc.find('Canvas/'+this.map+'/layer2').addChild(s3);
                cc.audioEngine.playEffect(this.shotgun_sound,false);
                this.shotgun_num--;
                if(this.faceY==1){
                    s1.getComponent('Shotgun').init(0,1);
                    if(this.faceX==0){
                        s2.getComponent('Shotgun').init(1,1);
                        s3.getComponent('Shotgun').init(-1,1);
                    }
                    else{
                        s2.getComponent('Shotgun').init(this.faceX,this.faceY);
                        s3.getComponent('Shotgun').init(this.faceX,0);
                    }
                }else if(this.faceY==-1){
                    s1.getComponent('Shotgun').init(0,-1);
                    if(this.faceX==0){
                        s2.getComponent('Shotgun').init(1,-1);
                        s3.getComponent('Shotgun').init(-1,-1);
                    }
                    else{
                        s2.getComponent('Shotgun').init(this.faceX,this.faceY);
                        s3.getComponent('Shotgun').init(this.faceX,0);
                    }
                }else if(this.faceY==0){
                    s1.getComponent('Shotgun').init(this.faceX,1);
                    s2.getComponent('Shotgun').init(this.faceX,-1);
                    s3.getComponent('Shotgun').init(this.faceX,0);
                }
            }
        }
        else if(this.weapon_num==4){
            if(this.grenade_num>0){
                var g=cc.instantiate(this.grenade);
                g.setPosition(this.node.x+this.faceX*30,this.node.y+this.faceY*30);
                cc.find('Canvas/'+this.map+'/layer2').addChild(g);
                g.getComponent('Grenade').init(this.faceX,this.faceY);
                this.grenade_num--;
            }
        }else if(this.weapon_num==5){
            if(this.landmine_num>0){
                if(this.node.name=='Bert')console.log('hi');
                var l=cc.instantiate(this.landmine);
                l.setPosition(this.node.x+this.faceX*10,this.node.y+this.faceY*10);
                cc.find('Canvas/'+this.map+'/layer2').addChild(l);
                this.landmine_num--;
            }
        }else if(this.weapon_num==6){
            if(this.barrel_num>0){
                var b=cc.instantiate(this.barrel);
                b.setPosition(this.node.x,this.node.y);
                cc.find('Canvas/'+this.map+'/layer2').addChild(b);
                this.barrel_num--;
            }
        }else if(this.weapon_num==7){
            if(this.weapon_num==7){
                var r=cc.instantiate(this.railgun);
                r.setPosition(this.node.x,this.node.y);
                cc.find('Canvas/'+this.map+'/layer2').addChild(r);
                r.getComponent('Bullet_railgun').init(this.faceX,this.faceY);
                this.railgun_num--;
            }
        }else if(this.weapon_num==8){
            if(this.weapon_num==8){
                var R=cc.instantiate(this.rocket);
                R.setPosition(this.node.x+this.faceX*10,this.node.y+this.faceY*10);
                cc.find('Canvas/'+this.map+'/layer2').addChild(R);
                R.getComponent('Rocket').init(this.faceX,this.faceY);
                this.rocket_num--;
            }
        }
    }
    switchWeapon(){
        if(this.weapon_num<=this.weapon_gain-1)this.weapon_num++;
        else this.weapon_num=1;
    }
    
}
