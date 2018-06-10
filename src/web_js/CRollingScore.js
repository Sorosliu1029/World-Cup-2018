function CRollingScore() {
    var m = null,
      c = null;
    this.rolling = function(e, g, a) {
      m = createjs.Tween.get(e, { override: !0 })
        .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
        .addEventListener("change", function() {
          e.text = Math.floor(e.text);
        })
        .call(function() {
          createjs.Tween.removeTweens(m);
        });
      null !== g &&
        (c = createjs.Tween.get(g, { override: !0 })
          .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
          .addEventListener("change", function() {
            g.text = Math.floor(g.text);
          })
          .call(function() {
            createjs.Tween.removeTweens(c);
          }));
    };
    return this;
  }