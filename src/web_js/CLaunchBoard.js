function CLaunchBoard(m) {
    var c, e, g, a, d, b;
    this._init = function() {
      c = { x: CANVAS_WIDTH_HALF + 660, y: CANVAS_HEIGHT - 60 };
      d = new createjs.Container();
      d.x = c.x;
      d.y = c.y;
      m.addChild(d);
      e = new createjs.Text(
        "99" + TEXT_OF + NUM_OF_PENALTY,
        "50px " + FONT_GAME,
        TEXT_COLOR
      );
      e.textAlign = "right";
      e.y = -4;
      d.addChild(e);
      d.y = c.y;
      m.addChild(d);
      g = new createjs.Text(
        "99" + TEXT_OF + NUM_OF_PENALTY,
        "50px " + FONT_GAME,
        TEXT_COLOR_STROKE
      );
      g.textAlign = "right";
      g.y = e.y;
      g.outline = OUTLINE_WIDTH;
      d.addChild(g);
      var l = s_oSpriteLibrary.getSprite("shot_left");
      a = createBitmap(l);
      a.x = 1.4 * -e.getBounds().width;
      a.regX = 0.5 * l.width;
      a.regY = 10;
      d.addChild(a);
      b = d.getBounds();
      this.updateCache();
    };
    this.updateCache = function() {
      d.cache(-b.width, -b.height, 2 * b.width, 2 * b.height);
    };
    this.getStartPos = function() {
      return c;
    };
    this.setPos = function(a, b) {
      d.x = a;
      d.y = b;
    };
    this.refreshTextLaunch = function(b, c) {
      e.text = b + TEXT_OF + c;
      g.text = e.text;
      a.x = 1.4 * -e.getBounds().width;
      this.updateCache();
    };
    this._init();
    return this;
  }