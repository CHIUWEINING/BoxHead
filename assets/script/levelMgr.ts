const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class levelMgr extends cc.Component {

    
    private level = 0;
    private score = 0;

    // onLoad () {}

    start () {
        //this.upgrade();
        //this.scorePlus(98300);
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

    // update (dt) {}
}
