function CPreloader() {
    var m, c, e, g, a, d, b, l;
    this._init = function() {
      s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
      s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
      s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
      s_oSpriteLibrary.loadSprites();
      l = new createjs.Container();
      s_oStage.addChild(l);
    };
    this.unload = function() {
      l.removeAllChildren();
    };
    this.hide = function() {
      var a = this;
      setTimeout(function() {
        createjs.Tween.get(b)
          .to({ alpha: 1 }, 500)
          .call(function() {
            a.unload();
            s_oMain.gotoMenu();
          });
      }, 1e3);
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
      this.attachSprites();
      s_oMain.preloaderReady();
    };
    this.attachSprites = function() {
      var k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
      l.addChild(k);
      k = s_oSpriteLibrary.getSprite("progress_bar");
      a = createBitmap(k);
      a.x = CANVAS_WIDTH / 2 - k.width / 2;
      a.y = CANVAS_HEIGHT - 200;
      l.addChild(a);
      m = k.width;
      c = k.height;
      d = new createjs.Shape();
      d.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(a.x, a.y, 1, c);
      l.addChild(d);
      a.mask = d;
      e = new createjs.Text("", "30px " + FONT_GAME, "#fff");
      e.x = CANVAS_WIDTH / 2;
      e.y = CANVAS_HEIGHT - 200;
      e.textBaseline = "alphabetic";
      e.textAlign = "center";
      l.addChild(e);
      g = new createjs.Text("", "30px " + SECONDARY_FONT, "#fff");
      g.x = CANVAS_WIDTH + 200;
      g.y = CANVAS_HEIGHT + 200;
      g.textBaseline = "alphabetic";
      g.textAlign = "center";
      l.addChild(g);
      b = new createjs.Shape();
      b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      b.alpha = 0;
      l.addChild(b);
    };
    this.refreshLoader = function(b) {
      e.text = b + "%";
      g.text = b + "%";
      d.graphics.clear();
      b = Math.floor((b * m) / 100);
      d.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(a.x, a.y, b, c);
    };
    this._init();
  }