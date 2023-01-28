const {ccclass, property} = cc._decorator;
declare const firebase: any;
import Player from "./Player";

@ccclass
export default class camClass extends cc.Component {

    @property(Player)
    player: Player = null;

    private map;
    private map_w = 900;
    private map_h = 800;
    private character1;
    public camera_x;
    public camera_y;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var database = firebase.database();
        database.ref('map').once('value', (s=>{
            this.map = s.val();
        })).then(()=>{
            database.ref('character1').once('value', (s2=>{
                this.character1 = s2.val();
            })).then(()=>{
                this.map_h = cc.find("Canvas/"+this.map).height;
                this.map_w = cc.find("Canvas/"+this.map).width;
                this.player = cc.find("Canvas/"+this.map+"/layer/"+this.character1).getComponent(Player);
            })
        })
        
        
    }

    update (dt) {
        //cc.log(cc.find("Canvas/Main Camera/Circle").x);
        var x = this.player.node.x;
        var y = this.player.node.y;
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
        this.camera_x=camx;
        this.camera_y=camy;
        cc.find("Canvas/Main Camera").setPosition(camx, camy);
        //cc.find("Canvas/Main Camera/Circle").setPosition(cirx, ciry);
    }
}
