const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class leaderBoardMgr extends cc.Component {

    // onLoad () {}

    start () {
        var backBtn = new cc.Component.EventHandler();
        backBtn.target = this.node;
        backBtn.component = "leaderBoardMgr";
        backBtn.handler = "goToMenu";
        cc.find("Canvas/bg/Back Button").getComponent(cc.Button).clickEvents.push(backBtn);

        this.writeBoard();
        
    }

    writeBoard(){
        var name = [];
        var score = [];
        var database = firebase.database();
        database.ref('board').once('value', (snapshot=>{
            snapshot.forEach((child)=>{
                name.push(child.key);
                score.push(child.val());
            })
        })).then(()=>{
            var rank = 1;
            while (rank <= 5){
                var max = 0;
                var maxid;
                for (var id in name){
                    if (score[id] >= max){
                        max = score[id];
                        maxid = id;
                    }
                }
                cc.find("Canvas/bg/title/" + rank.toString() + "/name").getComponent(cc.Label).string = name[maxid];
                cc.find("Canvas/bg/title/" + rank.toString() + "/score").getComponent(cc.Label).string = max.toString();
                rank++;
                delete name[maxid];
                delete score[maxid];
            }
        }).then(()=>{
            cc.find("Load scene").active = false;
        })
        
        
    }

    goToMenu(){
        cc.director.loadScene("main menu");
    }

    // update (dt) {}
}
