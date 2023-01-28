const {ccclass, property} = cc._decorator;
declare const firebase: any;
import Player from "./Player";
import Player2 from "./Player2";

@ccclass
export default class envMgr extends cc.Component {

    @property(Player)
    player: Player = null;

    @property(Player2)
    player2: Player = null;

    @property(cc.Prefab)
    bon: cc.Prefab = null;

    @property(cc.Prefab)
    bert: cc.Prefab = null;

    @property(cc.Prefab)
    bambo: cc.Prefab = null;

    @property(cc.Prefab)
    bon2: cc.Prefab = null;

    @property(cc.Prefab)
    bert2: cc.Prefab = null;

    @property(cc.Prefab)
    bambo2: cc.Prefab = null;

    @property({type:cc.AudioClip})
    day_bgm: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    night_bgm: cc.AudioClip = null;
    @property(cc.Prefab)
    zombie:cc.Prefab=null;
    @property(cc.Prefab)
    boss:cc.Prefab=null;
    
    // LIFE-CYCLE CALLBACKS:
    private init_x1=[30,-30,30,-30,-435,-435,-435,-435,-435,-435,421,421,421,421,421,421];//16
    private init_y1=[336.6,336.6,-364,-364,-216,-141,-66,9,84,159,-216,-141,-66,9,84,159];
    private init_x2=[16,298,-226,-482,-487,-489,-266,13,295,485,485,491];//12
    private init_y2=[436,429,441,248,2,-235,-457,-464,-472,-231,11,249];
    private init_x3=[-349,-146,57,260,463,526,526,526,526,526,408,233,59,-115,-289,-441,-441,-441,-441,-441];//20
    private init_y3=[-360,-360,-360,-360,-360,-203,-5,193,391,591,696,696,696,696,696,564,381,199,17,-165];
    public level = 0;
    public score = 0;
    public mode;
    private character1;
    private character2;
    public difficulty;
    public map;
    public map_w = 900;
    public map_h = 800;
    public z_num=0;
    public b_num=0;
    public z_count=0;
    public b_count=0;
    private wait_level=0;
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
    }
    start () {
        var database = firebase.database();
        database.ref('mode').once('value', (s=>{
            this.mode = s.val();
        })).then(()=>{
            database.ref('character1').once('value', (s2=>{
            this.character1 = s2.val();
        })).then(()=>{
            database.ref('character2').once('value', (s3=>{
            this.character2 = s3.val();
        })).then(()=>{
            database.ref('difficulty').once('value', (s4=>{
            this.difficulty = s4.val();
        })).then(()=>{
            database.ref('map').once('value', (s5=>{
            this.map = s5.val();
        })).then(()=>{
            cc.log(this.character1);
            cc.log(this.character2);
            cc.log(this.difficulty);
            cc.log(this.map);
            cc.log(this.mode);
            cc.find("Canvas/"+this.map).active = true;
            this.map_h = cc.find("Canvas/"+this.map).height;
            this.map_w = cc.find("Canvas/"+this.map).width;
            //find cha1
            var player1;
            if (this.character1 == "bon") player1 = cc.instantiate(this.bon);
            else if (this.character1 == "bert") player1 = cc.instantiate(this.bert);
            else if (this.character1 == "bambo") player1 = cc.instantiate(this.bambo);
            cc.log(player1);
            this.player = player1.getComponent(Player);
            player1.setPosition(60, -120);
            cc.find("Canvas/"+this.map+"/layer3").addChild(player1);

            //find cha2
            if (this.mode == "cooperate"){
                var p2;
                if (this.character2 == "bon") p2 = cc.instantiate(this.bon2);
                else if (this.character2 == "bert") p2 = cc.instantiate(this.bert2);
                else if (this.character2 == "bambo") p2 = cc.instantiate(this.bambo2);
                this.player2 = p2.getComponent(Player2);
                cc.log(this.player2);
                p2.setPosition(-20, -120);
                cc.find("Canvas/"+this.map+"/layer3").addChild(p2);
            }

            
            //this.player = cc.find("Canvas/"+this.map+"/layer3/"+this.character1).getComponent(Player);
            //cc.log(this.player);

            if (this.mode == "night") {
                cc.find("Canvas/Main Camera/Circle").active = true;
                cc.audioEngine.playMusic(this.night_bgm,true);
            }else{
                cc.audioEngine.playMusic(this.day_bgm,true);
            }

            cc.find("Canvas/Main Camera/Load scene").active = false;
        }).then(()=>{})
        })
        })
        })
        })
    }
    init_zombie(){
        if(this.map=='boxy'){
            if(this.level==this.wait_level){
                console.log(this.level);
                this.wait_level++;
                this.z_count=0;
                this.b_count=0;
                this.schedule(function(){
                    var z=cc.instantiate(this.zombie);
                    var pos=Math.floor(Math.random()*16);
                    z.setPosition(this.init_x1[pos],this.init_y1[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(z);
                    this.z_num++;
                    this.z_count++;
                },1,(this.level+1)*6-1);
                this.schedule(function(){
                    var b=cc.instantiate(this.boss);
                    var pos=Math.floor(Math.random()*16);
                    b.setPosition(this.init_x1[pos],this.init_y1[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(b);
                    this.b_num++;
                    this.b_count++;
                },1,this.level+1-1);
                /*for(let i=0;i<(this.level+1)*10;i++){
                    var z=cc.instantiate(this.zombie);
                    var pos=Math.floor(Math.random()*16);
                    z.setPosition(this.init_x1[pos],this.init_y1[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(z);
                    this.z_num++;
                }
                for(let i=0;i<(this.level+1);i++){
                    var b=cc.instantiate(this.boss);
                    var pos=Math.floor(Math.random()*16);
                    b.setPosition(this.init_x1[pos],this.init_y1[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(b);
                    this.b_num++;
                }*/
            }
        }else if(this.map=='buttons'){
            if(this.level==this.wait_level){
                console.log(this.level);
                this.wait_level++;
                this.z_count=0;
                this.b_count=0;
                this.schedule(function(){
                    var z=cc.instantiate(this.zombie);
                    var pos=Math.floor(Math.random()*12);
                    z.setPosition(this.init_x2[pos],this.init_y2[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(z);
                    this.z_num++;
                    this.z_count++;
                },1,(this.level+1)*6-1);
                this.schedule(function(){
                    var b=cc.instantiate(this.boss);
                    var pos=Math.floor(Math.random()*12);
                    b.setPosition(this.init_x2[pos],this.init_y2[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(b);
                    this.b_num++;
                    this.b_count++;
                },1,this.level+1-1);
            }
        }else if(this.map=='gladiator'){
            if(this.level==this.wait_level){
                console.log(this.level);
                this.wait_level++;
                this.z_count=0;
                this.b_count=0;
                this.schedule(function(){
                    var z=cc.instantiate(this.zombie);
                    var pos=Math.floor(Math.random()*20);
                    z.setPosition(this.init_x3[pos],this.init_y3[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(z);
                    this.z_num++;
                    this.z_count++;
                },1,(this.level+1)*6-1);
                this.schedule(function(){
                    var b=cc.instantiate(this.boss);
                    var pos=Math.floor(Math.random()*20);
                    b.setPosition(this.init_x3[pos],this.init_y3[pos]);
                    cc.find('Canvas/'+this.map+'/layer3').addChild(b);
                    this.b_num++;
                    this.b_count++;
                },1,this.level+1-1);
            }
        }
    }
    /*start () {

    }*/

    update (dt) {
        //cc.log(cc.find("Canvas/Main Camera/Circle").x);
        if (this.player == null) return;
        this.init_zombie();
        var x, y;
        if (this.mode == "cooperate"){
            x = (this.player.node.x + this.player2.node.x)/2;
            y = (this.player.node.y + this.player2.node.y)/2;
        }else{
            if (this.map == "buttons"){
                x = this.player.node.x+50;
                y = this.player.node.y+100;
            }else{
                x = this.player.node.x;
                y = this.player.node.y;
            }
            
        }
        var camx, camy, cirx, ciry;
        if (x > 0 && x < this.map_w-800){
            camx = x;
            cirx = 0;
        }else if (x <= 0){
            camx = 0;
            cirx = x;
        }else{
            camx = this.map_w-800;
            cirx = x-(this.map_w-800);
        } 
        if (y > 0 && y < this.map_h-600){
            camy = y;
            ciry = 0;
        }else if (y <= 0){
            camy = 0;
            ciry = y;
        }else{
            camy = this.map_h-600;
            ciry = y-(this.map_h-600);
        } 
        cc.find("Canvas/Main Camera").setPosition(camx, camy);
        cc.find("Canvas/Main Camera/Circle").setPosition(cirx, ciry);
    }

    upgrade(){
        this.level++;
        cc.find("Canvas/Main Camera/levelMgr/Level").getComponent(cc.Label).string = "Level " + this.level.toString();
    }

    scorePlus(point){
        this.score += point;
        var zeroString = "";
        for (var i = 0; i < (10-this.score.toString().length); i++) zeroString += "0";
        cc.find("Canvas/Main Camera/levelMgr/Score").getComponent(cc.Label).string = zeroString + this.score.toString();
    }

    endGame(){
        cc.find("Canvas/Main Camera/Die scene").active = true;
        //cc.director.preloadScene("end menu", ()=>{});
        var database = firebase.database();
        database.ref('nowScore').set(this.score);
        cc.director.loadScene("end menu");
    }
}
