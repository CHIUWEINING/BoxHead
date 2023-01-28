const {ccclass, property} = cc._decorator;
declare const firebase: any;
import Player from "./Player";
import Player2 from "./Player2";

@ccclass
export default class envMgr extends cc.Component {

    @property(Player)
    player: Player = null;

    @property(Player)
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

    private level = 0;
    private score = 0;
    private mode;
    private character1;
    private character2;
    private difficulty;
    private map;
    private map_w = 900;
    private map_h = 800;
    
    onLoad(){

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
            this.character1 = "bambo";
            this.character2 = "bert";
            this.mode = "cooperate";
            this.map = "gladiator";
            cc.log(this.character1);
            cc.log(this.character2);
            cc.log(this.difficulty);
            cc.log(this.map);
            cc.log(this.mode);
            cc.find("Canvas/"+this.map).active = true;
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

            this.map_h = cc.find("Canvas/"+this.map).height;
            this.map_w = cc.find("Canvas/"+this.map).width;
            //this.player = cc.find("Canvas/"+this.map+"/layer3/"+this.character1).getComponent(Player);
            //cc.log(this.player);

            if (this.mode == "night") cc.find("Canvas/Main Camera/Circle").active = true;

            cc.find("Canvas/Main Camera/Load scene").active = false;
        }).then(()=>{})
        })
        })
        })
        })
    }

    update (dt) {
        //cc.log(cc.find("Canvas/Main Camera/Circle").x);
        if (this.player == null) return;
        var x = this.player.node.x;
        var y = this.player.node.y;
        if (this.mode == "cooperate"){
            x = (this.player.node.x + this.player2.node.x)/2;
            y = (this.player.node.y + this.player2.node.y)/2;
        }else{
            x = this.player.node.x;
            y = this.player.node.y;
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
        cc.director.preloadScene("end menu", ()=>{});
        var database = firebase.database();
        database.ref('nowScore').set(this.score);
        cc.director.loadScene("end menu");
    }
}
