const {ccclass, property} = cc._decorator;

@ccclass
export default class instructionMgr extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var backBtn = new cc.Component.EventHandler();
        backBtn.target = this.node;
        backBtn.component = "instructionMgr";
        backBtn.handler = "goToMenu";
        cc.find("Canvas/bg/Back Button").getComponent(cc.Button).clickEvents.push(backBtn);
    }

    goToMenu(){
        cc.director.loadScene("main menu");
    }

    // update (dt) {}
}
