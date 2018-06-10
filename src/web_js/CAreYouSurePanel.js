function CAreYouSurePanel(m) {
    var c, e, g, a, d, b;
    this._init = function() {
      d = new createjs.Container();
      d.alpha = 0;
      l.addChild(d);
      b = new createjs.Shape();
      b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      b.alpha = 0.5;
      b.on("click", function() {});
      d.addChild(b);
      var k = s_oSpriteLibrary.getSprite("msg_box");
      c = createBitmap(k);
      c.x = CANVAS_WIDTH_HALF;
      c.y = CANVAS_HEIGHT_HALF;
      c.regX = 0.5 * k.width;
      c.regY = 0.5 * k.height;
      d.addChild(c);
      e = new createjs.Text(TEXT_ARE_SURE, "70px " + FONT_GAME, "#ffffff");
      e.x = CANVAS_WIDTH / 2;
      e.y = CANVAS_HEIGHT_HALF - 50;
      e.textAlign = "center";
      e.textBaseline = "middle";
      d.addChild(e);
      g = new CGfxButton(
        CANVAS_WIDTH / 2 + 250,
        0.5 * CANVAS_HEIGHT + 120,
        s_oSpriteLibrary.getSprite("but_yes"),
        d
      );
      g.addEventListener(ON_MOUSE_UP, this._onButYes, this);
      a = new CGfxButton(
        CANVAS_WIDTH / 2 - 250,
        0.5 * CANVAS_HEIGHT + 120,
        s_oSpriteLibrary.getSprite("but_no"),
        d
      );
      a.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    this.show = function() {
      createjs.Tween.get(d)
        .to({ alpha: 1 }, 150, createjs.Ease.quartOut)
        .call(function() {
          s_oGame.pause(!0);
        });
    };
    this.unload = function() {
      createjs.Tween.get(d)
        .to({ alpha: 0 }, 150, createjs.Ease.quartOut)
        .call(function() {
          l.removeChild(d, b);
        });
    };
    this._onButYes = function() {
      createjs.Ticker.paused = !1;
      this.unload();
      s_oGame.onExit();
      b.removeAllEventListeners();
    };
    this._onButNo = function() {
      s_oGame.pause(!1);
      this.unload();
      d.visible = !1;
      b.removeAllEventListeners();
    };
    var l = m;
    this._init();
  }