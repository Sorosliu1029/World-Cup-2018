function CHandSwipeAnim(m, c, e, g) {
    var a,
      d,
      b = !1;
    this._init = function(b) {
      d = new createjs.Container();
      a = createBitmap(b);
      a.x = m.x;
      a.y = m.y;
      a.regX = 0.5 * b.width;
      a.regY = 0.5 * b.height;
      a.alpha = 0;
      g.addChild(d);
      d.addChild(a);
    };
    this.animAllSwipe = function() {
      b = !0;
      var d = this;
      createjs.Tween.get(a)
        .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
        .wait(0.3 * MS_TIME_SWIPE_END)
        .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
      createjs.Tween.get(a)
        .to({ x: c[0].x, y: c[0].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
        .call(function() {
          a.x = m.x;
          a.y = m.y;
          createjs.Tween.get(a)
            .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
            .wait(0.3 * MS_TIME_SWIPE_END)
            .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
          createjs.Tween.get(a)
            .to(
              { x: c[1].x, y: c[1].y },
              MS_TIME_SWIPE_END,
              createjs.Ease.quartOut
            )
            .call(function() {
              a.x = m.x;
              a.y = m.y;
              createjs.Tween.get(a)
                .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
                .wait(0.3 * MS_TIME_SWIPE_END)
                .to(
                  { alpha: 0 },
                  0.5 * MS_TIME_SWIPE_END,
                  createjs.Ease.quartOut
                );
              createjs.Tween.get(a)
                .to(
                  { x: c[2].x, y: c[2].y },
                  MS_TIME_SWIPE_END,
                  createjs.Ease.quartOut
                )
                .call(function() {
                  a.x = m.x;
                  a.y = m.y;
                  d.animAllSwipe();
                });
            });
        });
    };
    this.fadeAnim = function(a) {
      createjs.Tween.get(d, { override: !0 }).to({ alpha: a }, 250);
    };
    this.isAnimate = function() {
      return b;
    };
    this.setVisible = function(b) {
      a.visible = b;
    };
    this.removeTweens = function() {
      createjs.Tween.removeTweens(a);
      b = !1;
    };
    this._init(e);
    return this;
  }