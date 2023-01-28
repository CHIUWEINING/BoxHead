const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class endMenuMgr extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;
    private score = 0;

    onLoad () {
        var database = firebase.database();
        database.ref('nowScore').once('value', (s=>{
            this.score = s.val();
        })).then(()=>{
            cc.find("Canvas/bg/group/Score Label").getComponent(cc.Label).string = this.score.toString();
            cc.find("Load scene").active = false;
        })
    }

    start () {
        cc.audioEngine.playMusic(this.bgm,true);
        //back to menu button handler
        var backBtn = new cc.Component.EventHandler();
        backBtn.target = this.node;
        backBtn.component = "endMenuMgr";
        backBtn.handler = "goToMenu";
        cc.find("Canvas/bg/Back Button").getComponent(cc.Button).clickEvents.push(backBtn);

        //new level button handler
        var newLevelBtn = new cc.Component.EventHandler();
        newLevelBtn.target = this.node;
        newLevelBtn.component = "endMenuMgr";
        newLevelBtn.handler = "goToMenu";
        cc.find("Canvas/bg/group/New Level Button").getComponent(cc.Button).clickEvents.push(newLevelBtn);

        var sendBtn = new cc.Component.EventHandler();
        sendBtn.target = this.node;
        sendBtn.component = "endMenuMgr";
        sendBtn.handler = "sendScore";
        cc.find("Canvas/bg/group/Send Score Button").getComponent(cc.Button).clickEvents.push(sendBtn);

        var highscoreBtn = new cc.Component.EventHandler();
        highscoreBtn.target = this.node;
        highscoreBtn.component = "endMenuMgr";
        highscoreBtn.handler = "goToLeaderBoard";
        cc.find("Canvas/bg/group/Highscore Button").getComponent(cc.Button).clickEvents.push(highscoreBtn);

        var retryBtn = new cc.Component.EventHandler();
        retryBtn.target = this.node;
        retryBtn.component = "endMenuMgr";
        retryBtn.handler = "retry";
        cc.find("Canvas/bg/group/Retry Button").getComponent(cc.Button).clickEvents.push(retryBtn);
    }

    goToMenu(){
        cc.director.loadScene("main menu");
    }

    /*goToStageMenu(){
        cc.director.loadScene("stage menu");
    }*/

    sendScore(){
        var database = firebase.database();
        database.ref('total').once('value', (snapshot=>{
            if (snapshot.val() < 5){
                database.ref('board/'+cc.find("Canvas/bg/group/Name EditBox/TEXT_LABEL").getComponent(cc.Label).string).set(this.score);
                database.ref('total').set(snapshot.val()+1);
            }else{
                var min = this.score;
                var name = "";
                database.ref('board').once('value', (snap=>{
                    snap.forEach((child)=>{
                        if (min > child.val()){
                            min = child.val();
                            name = child.key;
                        }
                    })
                    if (name != ""){
                        database.ref('board/'+name).remove();
                        database.ref('board/'+cc.find("Canvas/bg/group/Name EditBox/TEXT_LABEL").getComponent(cc.Label).string).set(this.score);
                    } 
                }))
            }
        }))
    }

    goToLeaderBoard(){
        cc.director.loadScene("leader board");
    }

    retry(){
        cc.director.loadScene("daylight game");
    }

    // update (dt) {}
}
