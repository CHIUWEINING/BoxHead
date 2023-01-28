const {ccclass, property} = cc._decorator;
declare const firebase: any;


@ccclass
export default class mainMenuMgr extends cc.Component {

    onLoad () {
        
    }

    start () {
        var database = firebase.database();
        database.ref().once('value', (r=>{
            if (!r.child("total").exists()){
                database.ref('total').set(0);
                database.ref('board').set("");
            } 
        }))
        
        //SINGLE PLAY handler
        var singleBtn = new cc.Component.EventHandler();
        singleBtn.target = this.node;
        singleBtn.component = "mainMenuMgr";
        singleBtn.handler = "singlePlay";
        cc.find("Canvas/bg/button1").getComponent(cc.Button).clickEvents.push(singleBtn);

        //COOPERATE handler
        var cooperateBtn = new cc.Component.EventHandler();
        cooperateBtn.target = this.node;
        cooperateBtn.component = "mainMenuMgr";
        cooperateBtn.handler = "cooperatePlay";
        cc.find("Canvas/bg/button2").getComponent(cc.Button).clickEvents.push(cooperateBtn);

        //NIGHT MODE handler
        var nightBtn = new cc.Component.EventHandler();
        nightBtn.target = this.node;
        nightBtn.component = "mainMenuMgr";
        nightBtn.handler = "nightMode";
        cc.find("Canvas/bg/button3").getComponent(cc.Button).clickEvents.push(nightBtn);

        //INSTRUCTIONS handler
        var instructionBtn = new cc.Component.EventHandler();
        instructionBtn.target = this.node;
        instructionBtn.component = "mainMenuMgr";
        instructionBtn.handler = "goToInstruction";
        cc.find("Canvas/bg/button4").getComponent(cc.Button).clickEvents.push(instructionBtn);
    }

    singlePlay(){
        cc.director.loadScene("stage menu");
    }

    cooperatePlay(){
        cc.director.loadScene("cooperate menu");
    }

    nightMode(){
        cc.director.loadScene("night menu");
    }

    goToInstruction(){
        cc.director.loadScene("instruction");
    }

    // update (dt) {}
}
