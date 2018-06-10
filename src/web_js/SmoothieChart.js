function SmoothieChart(m) {
    m = m || {};
    m.grid = m.grid || {
      fillStyle: "#000000",
      strokeStyle: "#777777",
      lineWidth: 1,
      millisPerLine: 1e3,
      verticalSections: 2
    };
    m.millisPerPixel = m.millisPerPixel || 20;
    m.fps = m.fps || 50;
    m.maxValueScale = m.maxValueScale || 1;
    m.minValue = m.minValue;
    m.maxValue = m.maxValue;
    m.labels = m.labels || { fillStyle: "#ffffff" };
    m.interpolation = m.interpolation || "bezier";
    m.scaleSmoothing = m.scaleSmoothing || 0.125;
    m.maxDataSetLength = m.maxDataSetLength || 2;
    m.timestampFormatter = m.timestampFormatter || null;
    this.options = m;
    this.seriesSet = [];
    this.currentValueRange = 1;
    this.currentVisMinValue = 0;
  }
  SmoothieChart.prototype.addTimeSeries = function(m, c) {
    this.seriesSet.push({ timeSeries: m, options: c || {} });
  };
  SmoothieChart.prototype.removeTimeSeries = function(m) {
    this.seriesSet.splice(this.seriesSet.indexOf(m), 1);
  };
  SmoothieChart.prototype.streamTo = function(m, c) {
    var e = this;
    this.render_on_tick = function() {
      e.render(m, e.seriesSet[0].timeSeries.lastTimeStamp);
    };
    this.start();
  };
  SmoothieChart.prototype.start = function() {
    this.timer ||
      (this.timer = setInterval(this.render_on_tick, 1e3 / this.options.fps));
  };
  SmoothieChart.prototype.stop = function() {
    this.timer && (clearInterval(this.timer), (this.timer = void 0));
  };
  SmoothieChart.timeFormatter = function(m) {
    function c(c) {
      return (10 > c ? "0" : "") + c;
    }
    return c(m.getHours()) + ":" + c(m.getMinutes()) + ":" + c(m.getSeconds());
  };
  SmoothieChart.prototype.render = function(m, c) {
    var e = m.getContext("2d"),
      g = this.options,
      a = m.clientWidth,
      d = m.clientHeight;
    e.save();
    c -= c % g.millisPerPixel;
    e.translate(0, 0);
    e.beginPath();
    e.rect(0, 0, a, d);
    e.clip();
    e.save();
    e.fillStyle = g.grid.fillStyle;
    e.clearRect(0, 0, a, d);
    e.fillRect(0, 0, a, d);
    e.restore();
    e.save();
    e.lineWidth = g.grid.lineWidth || 1;
    e.strokeStyle = g.grid.strokeStyle || "#ffffff";
    if (0 < g.grid.millisPerLine)
      for (
        var b = c - (c % g.grid.millisPerLine);
        b >= c - a * g.millisPerPixel;
        b -= g.grid.millisPerLine
      ) {
        e.beginPath();
        var l = Math.round(a - (c - b) / g.millisPerPixel);
        e.moveTo(l, 0);
        e.lineTo(l, d);
        e.stroke();
        if (g.timestampFormatter) {
          var k = g.timestampFormatter(new Date(b)),
            h = e.measureText(k).width / 2 + e.measureText(v).width + 4;
          l < a - h &&
            ((e.fillStyle = g.labels.fillStyle),
            e.fillText(k, l - e.measureText(k).width / 2, d - 2));
        }
        e.closePath();
      }
    for (v = 1; v < g.grid.verticalSections; v++)
      (b = Math.round((v * d) / g.grid.verticalSections)),
        e.beginPath(),
        e.moveTo(0, b),
        e.lineTo(a, b),
        e.stroke(),
        e.closePath();
    e.beginPath();
    e.strokeRect(0, 0, a, d);
    e.closePath();
    e.restore();
    v = l = Number.NaN;
    for (k = 0; k < this.seriesSet.length; k++) {
      var f = this.seriesSet[k].timeSeries;
      isNaN(f.maxValue) || (l = isNaN(l) ? f.maxValue : Math.max(l, f.maxValue));
      isNaN(f.minValue) || (v = isNaN(v) ? f.minValue : Math.min(v, f.minValue));
    }
    if (!isNaN(l) || !isNaN(v)) {
      l = null != g.maxValue ? g.maxValue : l * g.maxValueScale;
      null != g.minValue && (v = g.minValue);
      this.currentValueRange +=
        g.scaleSmoothing * (l - v - this.currentValueRange);
      this.currentVisMinValue += g.scaleSmoothing * (v - this.currentVisMinValue);
      h = this.currentValueRange;
      var q = this.currentVisMinValue;
      for (k = 0; k < this.seriesSet.length; k++) {
        e.save();
        f = this.seriesSet[k].timeSeries;
        f = f.data;
        for (
          var n = this.seriesSet[k].options;
          f.length >= g.maxDataSetLength && f[1][0] < c - a * g.millisPerPixel;
  
        )
          f.splice(0, 1);
        e.lineWidth = n.lineWidth || 1;
        e.fillStyle = n.fillStyle;
        e.strokeStyle = n.strokeStyle || "#ffffff";
        e.beginPath();
        var p = 0,
          u = 0,
          r = 0;
        for (b = 0; b < f.length; b++) {
          var w = Math.round(a - (c - f[b][0]) / g.millisPerPixel),
            t = f[b][1] - q;
          t = Math.max(Math.min(d - (h ? Math.round((t / h) * d) : 0), d - 1), 1);
          if (0 == b) (p = w), e.moveTo(w, t);
          else
            switch (g.interpolation) {
              case "line":
                e.lineTo(w, t);
                break;
              default:
                e.bezierCurveTo(
                  Math.round((u + w) / 2),
                  r,
                  Math.round(u + w) / 2,
                  t,
                  w,
                  t
                );
            }
          u = w;
          r = t;
        }
        0 < f.length &&
          n.fillStyle &&
          (e.lineTo(a + n.lineWidth + 1, r),
          e.lineTo(a + n.lineWidth + 1, d + n.lineWidth + 1),
          e.lineTo(p, d + n.lineWidth),
          e.fill());
        e.stroke();
        e.closePath();
        e.restore();
      }
      if (!g.labels.disabled) {
        g.labelOffsetY || (g.labelOffsetY = 0);
        e.fillStyle = g.labels.fillStyle;
        b = parseFloat(l).toFixed(2);
        var v = parseFloat(v).toFixed(2);
        e.fillText(b, a - e.measureText(b).width - 2, 10);
        e.fillText(v, a - e.measureText(v).width - 2, d - 2);
        for (b = 0; b < this.seriesSet.length; b++)
          (f = this.seriesSet[b].timeSeries),
            (a = f.label),
            (e.fillStyle = f.options.fillStyle || "rgb(255,255,255)"),
            a && e.fillText(a, 2, 10 * (b + 1) + g.labelOffsetY);
      }
    }
    e.restore();
  };