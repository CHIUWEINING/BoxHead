const {ccclass, property} = cc._decorator;
declare const firebase: any;

@ccclass
export default class stageMenuMgr extends cc.Component {
    @property(cc.SpriteFrame)
    bert: cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    bambo: cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    bon: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bind: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bert2: cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    bambo2: cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    bon2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bind2: cc.SpriteFrame = null;

    @property(cc.Node)
    map1: cc.Node = null;

    @property(cc.Node)
    map2: cc.Node = null;

    @property(cc.Node)
    map3: cc.Node = null;
    @property({type:cc.AudioClip})
    day_bgm: cc.AudioClip = null;
    @property({type:cc.AudioClip})
    night_bgm: cc.AudioClip = null;
    
    private characterState = 0;
    private characterState2 = 1;
    private characterList: Array<cc.SpriteFrame> = null;
    private characterList2: Array<cc.SpriteFrame> = null;
    private mapState = 0;
    private mapList: Array<cc.Node> = null;
    private mapNameList: Array<string> = null;
    private totalCharacter = 3;
    private totalMap = 3;
    private difficulty = 1;  //1: easy, 2: medium, 3:difficult
    
    onLoad () {
        cc.director.preloadScene("daylight game", ()=>{
            //console.log('Next scene preloaded');
        });
        this.characterList = [this.bert, this.bambo, this.bon];
        this.characterList2 = [this.bert2, this.bambo2, this.bon2];
        this.mapList = [this.map1, this.map2, this.map3];
        this.mapNameList = ["BOXY", "BUTTONS", "GLADIATOR"];
        cc.find("Canvas/bg/Easy Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(0, 0, 0);
        cc.audioEngine.playMusic(this.night_bgm,true);
    }

    start () {
        //back to menu button handler
        var backBtn = new cc.Component.EventHandler();
        backBtn.target = this.node;
        backBtn.component = "stageMenuMgr";
        backBtn.handler = "backToMenu";
        cc.find("Canvas/bg/Back Button").getComponent(cc.Button).clickEvents.push(backBtn);

        //small left arrow button handler
        var smLeftBtn = new cc.Component.EventHandler();
        smLeftBtn.target = this.node;
        smLeftBtn.component = "stageMenuMgr";
        smLeftBtn.handler = "smLeftArrow";
        cc.find("Canvas/bg/character box/Left Button").getComponent(cc.Button).clickEvents.push(smLeftBtn);

        //small right arrow button handler
        var smRightBtn = new cc.Component.EventHandler();
        smRightBtn.target = this.node;
        smRightBtn.component = "stageMenuMgr";
        smRightBtn.handler = "smRightArrow";
        cc.find("Canvas/bg/character box/Right Button").getComponent(cc.Button).clickEvents.push(smRightBtn);

        if (this.bert2 != null){
            var smLeftBtn2 = new cc.Component.EventHandler();
            smLeftBtn2.target = this.node;
            smLeftBtn2.component = "stageMenuMgr";
            smLeftBtn2.handler = "smLeftArrow2";
            cc.find("Canvas/bg/character box2/Left Button").getComponent(cc.Button).clickEvents.push(smLeftBtn2);

            var smRightBtn2 = new cc.Component.EventHandler();
            smRightBtn2.target = this.node;
            smRightBtn2.component = "stageMenuMgr";
            smRightBtn2.handler = "smRightArrow2";
            cc.find("Canvas/bg/character box2/Right Button").getComponent(cc.Button).clickEvents.push(smRightBtn2);
        }
        
        //big left arrow button handler
        var bgLeftBtn = new cc.Component.EventHandler();
        bgLeftBtn.target = this.node;
        bgLeftBtn.component = "stageMenuMgr";
        bgLeftBtn.handler = "bgLeftArrow";
        cc.find("Canvas/bg/map box/Left Button").getComponent(cc.Button).clickEvents.push(bgLeftBtn);

        //big right arrow button handler
        var bgRightBtn = new cc.Component.EventHandler();
        bgRightBtn.target = this.node;
        bgRightBtn.component = "stageMenuMgr";
        bgRightBtn.handler = "bgRightArrow";
        cc.find("Canvas/bg/map box/Right Button").getComponent(cc.Button).clickEvents.push(bgRightBtn);

        var eBtn = new cc.Component.EventHandler();
        eBtn.target = this.node;
        eBtn.component = "stageMenuMgr";
        eBtn.handler = "easy";
        cc.find("Canvas/bg/Easy Button/Background/Label").getComponent(cc.Button).clickEvents.push(eBtn);

        var mBtn = new cc.Component.EventHandler();
        mBtn.target = this.node;
        mBtn.component = "stageMenuMgr";
        mBtn.handler = "medium";
        cc.find("Canvas/bg/Medium Button/Background/Label").getComponent(cc.Button).clickEvents.push(mBtn);

        var dBtn = new cc.Component.EventHandler();
        dBtn.target = this.node;
        dBtn.component = "stageMenuMgr";
        dBtn.handler = "difficult";
        cc.find("Canvas/bg/Difficult Button/Background/Label").getComponent(cc.Button).clickEvents.push(dBtn);

        var playBtn = new cc.Component.EventHandler();
        playBtn.target = this.node;
        playBtn.component = "stageMenuMgr";
        playBtn.handler = "enterGame";
        cc.find("Canvas/bg/map box/Map1 Button").getComponent(cc.Button).clickEvents.push(playBtn);
        cc.find("Canvas/bg/map box/Map2 Button").getComponent(cc.Button).clickEvents.push(playBtn);
        cc.find("Canvas/bg/map box/Map3 Button").getComponent(cc.Button).clickEvents.push(playBtn);

        var boardBtn = new cc.Component.EventHandler();
        boardBtn.target = this.node;
        boardBtn.component = "stageMenuMgr";
        boardBtn.handler = "goToLeaderBoard";
        cc.find("Canvas/bg/map box/Highscore Button").getComponent(cc.Button).clickEvents.push(boardBtn);
    }

    smLeftArrow(){
        this.characterState = (this.characterState-1+this.totalCharacter)%this.totalCharacter;
        cc.find("Canvas/bg/character box").getComponent(cc.Sprite).spriteFrame = this.characterList[this.characterState];
    }

    smRightArrow(){
        this.characterState = (this.characterState+1)%this.totalCharacter;
        cc.find("Canvas/bg/character box").getComponent(cc.Sprite).spriteFrame = this.characterList[this.characterState];
    }

    smLeftArrow2(){
        this.characterState2 = (this.characterState2-1+this.totalCharacter)%this.totalCharacter;
        cc.find("Canvas/bg/character box2").getComponent(cc.Sprite).spriteFrame = this.characterList2[this.characterState2];
    }

    smRightArrow2(){
        this.characterState2 = (this.characterState2+1)%this.totalCharacter;
        cc.find("Canvas/bg/character box2").getComponent(cc.Sprite).spriteFrame = this.characterList2[this.characterState2];
    }

    bgLeftArrow(){
        this.mapList[this.mapState].active = false;
        this.mapState = (this.mapState-1+this.totalMap)%this.totalMap;
        this.mapList[this.mapState].active = true;
        cc.find("Canvas/bg/map box/Map Name Label").getComponent(cc.Label).string = this.mapNameList[this.mapState];
        cc.find("Canvas/bg/map box/Map Number Label").getComponent(cc.Label).string = (this.mapState+1).toString() + "/" + this.totalMap.toString();
    }

    bgRightArrow(){
        this.mapList[this.mapState].active = false;
        this.mapState = (this.mapState+1)%this.totalMap;
        this.mapList[this.mapState].active = true;
        cc.find("Canvas/bg/map box/Map Name Label").getComponent(cc.Label).string = this.mapNameList[this.mapState];
        cc.find("Canvas/bg/map box/Map Number Label").getComponent(cc.Label).string = (this.mapState+1).toString() + "/" + this.totalMap.toString();
    }

    backToMenu(){
        cc.director.loadScene("main menu");
    }

    easy(){
        this.difficulty = 1;
        cc.find("Canvas/bg/Easy Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(0, 0, 0);
        cc.find("Canvas/bg/Medium Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
        cc.find("Canvas/bg/Difficult Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
    }

    medium(){
        this.difficulty = 2;
        cc.find("Canvas/bg/Easy Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
        cc.find("Canvas/bg/Medium Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(0, 0, 0);
        cc.find("Canvas/bg/Difficult Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
    }

    difficult(){
        this.difficulty = 3;
        cc.find("Canvas/bg/Easy Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
        cc.find("Canvas/bg/Medium Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(180, 160, 160);
        cc.find("Canvas/bg/Difficult Button/Background/Label").getComponent(cc.Button).normalColor = cc.color(0, 0, 0);
    }

    enterGame(){
        cc.find("Load scene").active = true;
        var database = firebase.database();
        database.ref('difficulty').set(this.difficulty);
        if (this.bert2 == null){
            database.ref('mode').set("single");
        }else{
            database.ref('mode').set("cooperate");
        }

        if (this.mapState == 0){
            database.ref('map').set("boxy");
        }else if (this.mapState == 1){
            database.ref('map').set("buttons");
        }else if (this.mapState == 2){
            database.ref('map').set("gladiator");
        }

        if (this.characterState == 0){
            database.ref('character1').set("bert");
        }else if (this.characterState == 1){
            database.ref('character1').set("bambo");
        }else if (this.characterState == 2){
            database.ref('character1').set("bon");
        }

        if (this.characterState2 == 0){
            database.ref('character2').set("bert");
        }else if (this.characterState2 == 1){
            database.ref('character2').set("bambo");
        }else if (this.characterState2 == 2){
            database.ref('character2').set("bon");
        }
        if (cc.find("Canvas/bg/map box/Left Button").position.x == -226.72){
            database.ref('mode').set("night");
        } 
        cc.director.loadScene("daylight game");
    }

    goToLeaderBoard(){
        cc.director.loadScene("leader board");
    }

    update (dt) {
        
    }
}
