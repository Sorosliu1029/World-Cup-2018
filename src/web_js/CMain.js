function CMain(m) {
    var c,
      e = 0,
      g = 0,
      a = STATE_LOADING,
      d,
      game;
    this.initContainer = function() {
      var canvas = document.getElementById("canvas");
      s_oStage = new createjs.Stage(canvas);
      createjs.Touch.enable(s_oStage);
      s_oStage.preventSelection = !1;
      s_bMobile = jQuery.browser.mobile;
      !1 === s_bMobile
        ? (s_oStage.enableMouseOver(20),
          $("body").on("contextmenu", "#canvas", function(canvas) {
            return !1;
          }),
          (FPS = FPS_DESKTOP),
          (FPS_TIME = 1 / FPS),
          (PHYSICS_STEP = 1 / (FPS * STEP_RATE)),
          (ROLL_BALL_RATE = 60 / FPS))
        : (BALL_VELOCITY_MULTIPLIER = 0.8);
      s_iPrevTime = new Date().getTime();
      createjs.Ticker.addEventListener("tick", this._update);
      createjs.Ticker.setFPS(FPS);
      navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
      s_oSpriteLibrary = new CSpriteLibrary();
      d = new CPreloader()
      c = !0;
    };
    this._loadImages = function() {
      s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
      s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
      s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
      s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
      s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
      s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
      s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
      s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
      s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
      s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
      s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
      s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
      s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png");
      s_oSpriteLibrary.addSprite("start_ball", "./sprites/start_ball.png");
      s_oSpriteLibrary.addSprite("hand_touch", "./sprites/hand_touch.png");
      s_oSpriteLibrary.addSprite("cursor", "./sprites/cursor.png");
      s_oSpriteLibrary.addSprite("shot_left", "./sprites/shot_left.png");
      s_oSpriteLibrary.addSprite("goal", "./sprites/goal.png");
      for (var b = 0; b < NUM_SPRITE_PLAYER; b++)
        s_oSpriteLibrary.addSprite(
          "player_" + b,
          "./sprites/player/player_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[IDLE]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[IDLE] + b,
          "./sprites/goalkeeper_idle/gk_idle_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[RIGHT]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[RIGHT] + b,
          "./sprites/goalkeeper_save_right/gk_save_right_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[LEFT]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[LEFT] + b,
          "./sprites/goalkeeper_save_left/gk_save_left_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[CENTER_DOWN]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[CENTER_DOWN] + b,
          "./sprites/goalkeeper_save_center_down/gk_save_center_down_" +
            b +
            ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[CENTER_UP]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[CENTER_UP] + b,
          "./sprites/goalkeeper_save_center_up/gk_save_center_up_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[LEFT_DOWN]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[LEFT_DOWN] + b,
          "./sprites/goalkeeper_save_down_left/gk_save_down_left_" + b + ".png"
        );
      for (b = 0; b < NUM_SPRITE_GOALKEEPER[RIGHT_DOWN]; b++)
        s_oSpriteLibrary.addSprite(
          SPRITE_NAME_GOALKEEPER[RIGHT_DOWN] + b,
          "./sprites/goalkeeper_save_down_right/gk_save_down_right_" + b + ".png"
        );
      g += s_oSpriteLibrary.getNumSprites();
      s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function() {
      e++;
      d.refreshLoader(Math.floor((e / g) * 100));
      e === g && this._onRemovePreloader();
    };
    this._onAllImagesLoaded = function() {};
    this.preloaderReady = function() {
      this._loadImages();
      c = !0;
    };
    this._onRemovePreloader = function() {
      d.unload();
      this.gotoMenu();
    };
    this.gotoMenu = function() {
      new CMenu();
      a = STATE_MENU;
    };
    this.gotoGame = function() {
      game = new CGame(l);
      a = STATE_GAME;
    };
    this.stopUpdate = function() {
      c = !1;
      createjs.Ticker.paused = !0;
      $("#block_game").css("display", "block");
    };
    this.startUpdate = function() {
      s_iPrevTime = new Date().getTime();
      c = !0;
      createjs.Ticker.paused = !1;
      $("#block_game").css("display", "none");
    };
    this._update = function(d) {
      if (!1 !== c) {
        var h = new Date().getTime();
        s_iTimeElaps = h - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = h;
        1e3 <= s_iCntTime &&
          ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
        a === STATE_GAME && game.update();
        s_oStage.update(d);
      }
    };
    s_oMain = this;
    var l = m;
    ENABLE_CHECK_ORIENTATION = m.check_orientation;
    ENABLE_FULLSCREEN = m.fullscreen;
    this.initContainer();
  }