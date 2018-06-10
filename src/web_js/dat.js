var dat = dat || {}
dat.gui = dat.gui || {}
dat.utils = dat.utils || {}
dat.controllers = dat.controllers || {}
dat.dom = dat.dom || {}
dat.color = dat.color || {}
dat.utils.css = (function() {
  return {
    load: function(m, c) {
      c = c || document
      var e = c.createElement('link')
      e.type = 'text/css'
      e.rel = 'stylesheet'
      e.href = m
      c.getElementsByTagName('head')[0].appendChild(e)
    },
    inject: function(m, c) {
      c = c || document
      var e = document.createElement('style')
      e.type = 'text/css'
      e.innerHTML = m
      c.getElementsByTagName('head')[0].appendChild(e)
    },
  }
})()
dat.utils.common = (function() {
  var m = Array.prototype.forEach,
    c = Array.prototype.slice
  return {
    BREAK: {},
    extend: function(e) {
      this.each(
        c.call(arguments, 1),
        function(c) {
          for (var a in c) this.isUndefined(c[a]) || (e[a] = c[a])
        },
        this,
      )
      return e
    },
    defaults: function(e) {
      this.each(
        c.call(arguments, 1),
        function(c) {
          for (var a in c) this.isUndefined(e[a]) && (e[a] = c[a])
        },
        this,
      )
      return e
    },
    compose: function() {
      var e = c.call(arguments)
      return function() {
        for (var g = c.call(arguments), a = e.length - 1; 0 <= a; a--) g = [e[a].apply(this, g)]
        return g[0]
      }
    },
    each: function(c, g, a) {
      if (m && c.forEach === m) c.forEach(g, a)
      else if (c.length === c.length + 0)
        for (var d = 0, b = c.length; d < b && !(d in c && g.call(a, c[d], d) === this.BREAK); d++);
      else for (d in c) if (g.call(a, c[d], d) === this.BREAK) break
    },
    defer: function(c) {
      setTimeout(c, 0)
    },
    toArray: function(e) {
      return e.toArray ? e.toArray() : c.call(e)
    },
    isUndefined: function(c) {
      return void 0 === c
    },
    isNull: function(c) {
      return null === c
    },
    isNaN: function(c) {
      return c !== c
    },
    isArray:
      Array.isArray ||
      function(c) {
        return c.constructor === Array
      },
    isObject: function(c) {
      return c === Object(c)
    },
    isNumber: function(c) {
      return c === c + 0
    },
    isString: function(c) {
      return c === c + ''
    },
    isBoolean: function(c) {
      return !1 === c || !0 === c
    },
    isFunction: function(c) {
      return '[object Function]' === Object.prototype.toString.call(c)
    },
  }
})()
dat.controllers.Controller = (function(m) {
  var c = function(c, g) {
    this.initialValue = c[g]
    this.domElement = document.createElement('div')
    this.object = c
    this.property = g
    this.__onFinishChange = this.__onChange = void 0
  }
  m.extend(c.prototype, {
    onChange: function(c) {
      this.__onChange = c
      return this
    },
    onFinishChange: function(c) {
      this.__onFinishChange = c
      return this
    },
    setValue: function(c) {
      this.object[this.property] = c
      this.__onChange && this.__onChange.call(this, c)
      this.updateDisplay()
      return this
    },
    getValue: function() {
      return this.object[this.property]
    },
    updateDisplay: function() {
      return this
    },
    isModified: function() {
      return this.initialValue !== this.getValue()
    },
  })
  return c
})(dat.utils.common)
dat.dom.dom = (function(m) {
  function c(a) {
    if ('0' === a || m.isUndefined(a)) return 0
    a = a.match(g)
    return m.isNull(a) ? 0 : parseFloat(a[1])
  }
  var e = {}
  m.each(
    {
      HTMLEvents: ['change'],
      MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
      KeyboardEvents: ['keydown'],
    },
    function(a, b) {
      m.each(a, function(a) {
        e[a] = b
      })
    },
  )
  var g = /(\d+(\.\d+)?)px/,
    a = {
      makeSelectable: function(a, b) {
        void 0 !== a &&
          void 0 !== a.style &&
          ((a.onselectstart = b
            ? function() {
                return !1
              }
            : function() {}),
          (a.style.MozUserSelect = b ? 'auto' : 'none'),
          (a.style.KhtmlUserSelect = b ? 'auto' : 'none'),
          (a.unselectable = b ? 'on' : 'off'))
      },
      makeFullscreen: function(a, b, c) {
        m.isUndefined(b) && (b = !0)
        m.isUndefined(c) && (c = !0)
        a.style.position = 'absolute'
        b && ((a.style.left = 0), (a.style.right = 0))
        c && ((a.style.top = 0), (a.style.bottom = 0))
      },
      fakeEvent: function(a, b, c, g) {
        c = c || {}
        var d = e[b]
        if (!d) throw Error('Event type ' + b + ' not supported.')
        var f = document.createEvent(d)
        switch (d) {
          case 'MouseEvents':
            f.initMouseEvent(
              b,
              c.bubbles || !1,
              c.cancelable || !0,
              window,
              c.clickCount || 1,
              0,
              0,
              c.x || c.clientX || 0,
              c.y || c.clientY || 0,
              !1,
              !1,
              !1,
              !1,
              0,
              null,
            )
            break
          case 'KeyboardEvents':
            d = f.initKeyboardEvent || f.initKeyEvent
            m.defaults(c, {
              cancelable: !0,
              ctrlKey: !1,
              altKey: !1,
              shiftKey: !1,
              metaKey: !1,
              keyCode: void 0,
              charCode: void 0,
            })
            d(
              b,
              c.bubbles || !1,
              c.cancelable,
              window,
              c.ctrlKey,
              c.altKey,
              c.shiftKey,
              c.metaKey,
              c.keyCode,
              c.charCode,
            )
            break
          default:
            f.initEvent(b, c.bubbles || !1, c.cancelable || !0)
        }
        m.defaults(f, g)
        a.dispatchEvent(f)
      },
      bind: function(c, b, e, g) {
        c.addEventListener
          ? c.addEventListener(b, e, g || !1)
          : c.attachEvent && c.attachEvent('on' + b, e)
        return a
      },
      unbind: function(c, b, e, g) {
        c.removeEventListener
          ? c.removeEventListener(b, e, g || !1)
          : c.detachEvent && c.detachEvent('on' + b, e)
        return a
      },
      addClass: function(c, b) {
        if (void 0 === c.className) c.className = b
        else if (c.className !== b) {
          var d = c.className.split(/ +/)
          ;-1 == d.indexOf(b) &&
            (d.push(b),
            (c.className = d
              .join(' ')
              .replace(/^\s+/, '')
              .replace(/\s+$/, '')))
        }
        return a
      },
      removeClass: function(c, b) {
        if (b) {
          if (void 0 !== c.className)
            if (c.className === b) c.removeAttribute('class')
            else {
              var d = c.className.split(/ +/),
                e = d.indexOf(b)
              ;-1 != e && (d.splice(e, 1), (c.className = d.join(' ')))
            }
        } else c.className = void 0
        return a
      },
      hasClass: function(a, b) {
        return new RegExp('(?:^|\\s+)' + b + '(?:\\s+|$)').test(a.className) || !1
      },
      getWidth: function(a) {
        a = getComputedStyle(a)
        return (
          c(a['border-left-width']) +
          c(a['border-right-width']) +
          c(a['padding-left']) +
          c(a['padding-right']) +
          c(a.width)
        )
      },
      getHeight: function(a) {
        a = getComputedStyle(a)
        return (
          c(a['border-top-width']) +
          c(a['border-bottom-width']) +
          c(a['padding-top']) +
          c(a['padding-bottom']) +
          c(a.height)
        )
      },
      getOffset: function(a) {
        var b = { left: 0, top: 0 }
        if (a.offsetParent) {
          do (b.left += a.offsetLeft), (b.top += a.offsetTop)
          while ((a = a.offsetParent))
        }
        return b
      },
      isActive: function(a) {
        return a === document.activeElement && (a.type || a.href)
      },
    }
  return a
})(dat.utils.common)
dat.controllers.OptionController = (function(m, c, e) {
  var g = function(a, d, b) {
    g.superclass.call(this, a, d)
    var l = this
    this.__select = document.createElement('select')
    if (e.isArray(b)) {
      var k = {}
      e.each(b, function(a) {
        k[a] = a
      })
      b = k
    }
    e.each(b, function(a, b) {
      var c = document.createElement('option')
      c.innerHTML = b
      c.setAttribute('value', a)
      l.__select.appendChild(c)
    })
    this.updateDisplay()
    c.bind(this.__select, 'change', function() {
      l.setValue(this.options[this.selectedIndex].value)
    })
    this.domElement.appendChild(this.__select)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    setValue: function(a) {
      a = g.superclass.prototype.setValue.call(this, a)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      return a
    },
    updateDisplay: function() {
      this.__select.value = this.getValue()
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.controllers.NumberController = (function(m, c) {
  var e = function(g, a, d) {
    e.superclass.call(this, g, a)
    d = d || {}
    this.__min = d.min
    this.__max = d.max
    this.__step = d.step
    c.isUndefined(this.__step)
      ? (this.__impliedStep =
          0 == this.initialValue
            ? 1
            : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10)
      : (this.__impliedStep = this.__step)
    g = this.__impliedStep
    g = g.toString()
    g = -1 < g.indexOf('.') ? g.length - g.indexOf('.') - 1 : 0
    this.__precision = g
  }
  e.superclass = m
  c.extend(e.prototype, m.prototype, {
    setValue: function(c) {
      void 0 !== this.__min && c < this.__min
        ? (c = this.__min)
        : void 0 !== this.__max && c > this.__max && (c = this.__max)
      void 0 !== this.__step &&
        0 != c % this.__step &&
        (c = Math.round(c / this.__step) * this.__step)
      return e.superclass.prototype.setValue.call(this, c)
    },
    min: function(c) {
      this.__min = c
      return this
    },
    max: function(c) {
      this.__max = c
      return this
    },
    step: function(c) {
      this.__step = c
      return this
    },
  })
  return e
})(dat.controllers.Controller, dat.utils.common)
dat.controllers.NumberControllerBox = (function(m, c, e) {
  var g = function(a, d, b) {
    function l() {
      var a = parseFloat(f.__input.value)
      e.isNaN(a) || f.setValue(a)
    }
    function k(a) {
      var b = m - a.clientY
      f.setValue(f.getValue() + b * f.__impliedStep)
      m = a.clientY
    }
    function h() {
      c.unbind(window, 'mousemove', k)
      c.unbind(window, 'mouseup', h)
    }
    this.__truncationSuspended = !1
    g.superclass.call(this, a, d, b)
    var f = this,
      m
    this.__input = document.createElement('input')
    this.__input.setAttribute('type', 'text')
    c.bind(this.__input, 'change', l)
    c.bind(this.__input, 'blur', function() {
      l()
      f.__onFinishChange && f.__onFinishChange.call(f, f.getValue())
    })
    c.bind(this.__input, 'mousedown', function(a) {
      c.bind(window, 'mousemove', k)
      c.bind(window, 'mouseup', h)
      m = a.clientY
    })
    c.bind(this.__input, 'keydown', function(a) {
      13 === a.keyCode &&
        ((f.__truncationSuspended = !0), this.blur(), (f.__truncationSuspended = !1))
    })
    this.updateDisplay()
    this.domElement.appendChild(this.__input)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    updateDisplay: function() {
      var a = this.__input
      if (this.__truncationSuspended) var c = this.getValue()
      else {
        c = this.getValue()
        var b = Math.pow(10, this.__precision)
        c = Math.round(c * b) / b
      }
      a.value = c
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.NumberController, dat.dom.dom, dat.utils.common)
dat.controllers.NumberControllerSlider = (function(m, c, e, g, a) {
  function d(a, b, c, d, e) {
    return d + ((a - b) / (c - b)) * (e - d)
  }
  var b = function(a, e, g, f, m) {
    function h(a) {
      a.preventDefault()
      var b = c.getOffset(l.__background),
        e = c.getWidth(l.__background)
      l.setValue(d(a.clientX, b.left, b.left + e, l.__min, l.__max))
      return !1
    }
    function k() {
      c.unbind(window, 'mousemove', h)
      c.unbind(window, 'mouseup', k)
      l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
    }
    b.superclass.call(this, a, e, { min: g, max: f, step: m })
    var l = this
    this.__background = document.createElement('div')
    this.__foreground = document.createElement('div')
    c.bind(this.__background, 'mousedown', function(a) {
      c.bind(window, 'mousemove', h)
      c.bind(window, 'mouseup', k)
      h(a)
    })
    c.addClass(this.__background, 'slider')
    c.addClass(this.__foreground, 'slider-fg')
    this.updateDisplay()
    this.__background.appendChild(this.__foreground)
    this.domElement.appendChild(this.__background)
  }
  b.superclass = m
  b.useDefaultStyles = function() {
    e.inject(a)
  }
  g.extend(b.prototype, m.prototype, {
    updateDisplay: function() {
      var a = (this.getValue() - this.__min) / (this.__max - this.__min)
      this.__foreground.style.width = 100 * a + '%'
      return b.superclass.prototype.updateDisplay.call(this)
    },
  })
  return b
})(
  dat.controllers.NumberController,
  dat.dom.dom,
  dat.utils.css,
  dat.utils.common,
  ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}",
)
dat.controllers.FunctionController = (function(m, c, e) {
  var g = function(a, d, b) {
    g.superclass.call(this, a, d)
    var e = this
    this.__button = document.createElement('div')
    this.__button.innerHTML = void 0 === b ? 'Fire' : b
    c.bind(this.__button, 'click', function(a) {
      a.preventDefault()
      e.fire()
      return !1
    })
    c.addClass(this.__button, 'button')
    this.domElement.appendChild(this.__button)
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    fire: function() {
      this.__onChange && this.__onChange.call(this)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      this.getValue().call(this.object)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.controllers.BooleanController = (function(m, c, e) {
  var g = function(a, d) {
    g.superclass.call(this, a, d)
    var b = this
    this.__prev = this.getValue()
    this.__checkbox = document.createElement('input')
    this.__checkbox.setAttribute('type', 'checkbox')
    c.bind(
      this.__checkbox,
      'change',
      function() {
        b.setValue(!b.__prev)
      },
      !1,
    )
    this.domElement.appendChild(this.__checkbox)
    this.updateDisplay()
  }
  g.superclass = m
  e.extend(g.prototype, m.prototype, {
    setValue: function(a) {
      a = g.superclass.prototype.setValue.call(this, a)
      this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
      this.__prev = this.getValue()
      return a
    },
    updateDisplay: function() {
      !0 === this.getValue()
        ? (this.__checkbox.setAttribute('checked', 'checked'), (this.__checkbox.checked = !0))
        : (this.__checkbox.checked = !1)
      return g.superclass.prototype.updateDisplay.call(this)
    },
  })
  return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common)
dat.color.toString = (function(m) {
  return function(c) {
    if (1 == c.a || m.isUndefined(c.a)) {
      for (c = c.hex.toString(16); 6 > c.length; ) c = '0' + c
      return '#' + c
    }
    return (
      'rgba(' + Math.round(c.r) + ',' + Math.round(c.g) + ',' + Math.round(c.b) + ',' + c.a + ')'
    )
  }
})(dat.utils.common)
dat.color.interpret = (function(m, c) {
  var e,
    g,
    a = [
      {
        litmus: c.isString,
        conversions: {
          THREE_CHAR_HEX: {
            read: function(a) {
              a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i)
              return null === a
                ? !1
                : {
                    space: 'HEX',
                    hex: parseInt(
                      '0x' +
                        a[1].toString() +
                        a[1].toString() +
                        a[2].toString() +
                        a[2].toString() +
                        a[3].toString() +
                        a[3].toString(),
                    ),
                  }
            },
            write: m,
          },
          SIX_CHAR_HEX: {
            read: function(a) {
              a = a.match(/^#([A-F0-9]{6})$/i)
              return null === a ? !1 : { space: 'HEX', hex: parseInt('0x' + a[1].toString()) }
            },
            write: m,
          },
          CSS_RGB: {
            read: function(a) {
              a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
              return null === a
                ? !1
                : {
                    space: 'RGB',
                    r: parseFloat(a[1]),
                    g: parseFloat(a[2]),
                    b: parseFloat(a[3]),
                  }
            },
            write: m,
          },
          CSS_RGBA: {
            read: function(a) {
              a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/)
              return null === a
                ? !1
                : {
                    space: 'RGB',
                    r: parseFloat(a[1]),
                    g: parseFloat(a[2]),
                    b: parseFloat(a[3]),
                    a: parseFloat(a[4]),
                  }
            },
            write: m,
          },
        },
      },
      {
        litmus: c.isNumber,
        conversions: {
          HEX: {
            read: function(a) {
              return { space: 'HEX', hex: a, conversionName: 'HEX' }
            },
            write: function(a) {
              return a.hex
            },
          },
        },
      },
      {
        litmus: c.isArray,
        conversions: {
          RGB_ARRAY: {
            read: function(a) {
              return 3 != a.length ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2] }
            },
            write: function(a) {
              return [a.r, a.g, a.b]
            },
          },
          RGBA_ARRAY: {
            read: function(a) {
              return 4 != a.length ? !1 : { space: 'RGB', r: a[0], g: a[1], b: a[2], a: a[3] }
            },
            write: function(a) {
              return [a.r, a.g, a.b, a.a]
            },
          },
        },
      },
      {
        litmus: c.isObject,
        conversions: {
          RGBA_OBJ: {
            read: function(a) {
              return c.isNumber(a.r) && c.isNumber(a.g) && c.isNumber(a.b) && c.isNumber(a.a)
                ? { space: 'RGB', r: a.r, g: a.g, b: a.b, a: a.a }
                : !1
            },
            write: function(a) {
              return { r: a.r, g: a.g, b: a.b, a: a.a }
            },
          },
          RGB_OBJ: {
            read: function(a) {
              return c.isNumber(a.r) && c.isNumber(a.g) && c.isNumber(a.b)
                ? { space: 'RGB', r: a.r, g: a.g, b: a.b }
                : !1
            },
            write: function(a) {
              return { r: a.r, g: a.g, b: a.b }
            },
          },
          HSVA_OBJ: {
            read: function(a) {
              return c.isNumber(a.h) && c.isNumber(a.s) && c.isNumber(a.v) && c.isNumber(a.a)
                ? { space: 'HSV', h: a.h, s: a.s, v: a.v, a: a.a }
                : !1
            },
            write: function(a) {
              return { h: a.h, s: a.s, v: a.v, a: a.a }
            },
          },
          HSV_OBJ: {
            read: function(a) {
              return c.isNumber(a.h) && c.isNumber(a.s) && c.isNumber(a.v)
                ? { space: 'HSV', h: a.h, s: a.s, v: a.v }
                : !1
            },
            write: function(a) {
              return { h: a.h, s: a.s, v: a.v }
            },
          },
        },
      },
    ]
  return function() {
    g = !1
    var d = 1 < arguments.length ? c.toArray(arguments) : arguments[0]
    c.each(a, function(a) {
      if (a.litmus(d))
        return (
          c.each(a.conversions, function(a, b) {
            e = a.read(d)
            if (!1 === g && !1 !== e)
              return (g = e), (e.conversionName = b), (e.conversion = a), c.BREAK
          }),
          c.BREAK
        )
    })
    return g
  }
})(dat.color.toString, dat.utils.common)
dat.GUI = dat.gui.GUI = (function(m, c, e, g, a, d, b, l, k, h, f, q, n, p, u) {
  function r(b, c, d, e) {
    if (void 0 === c[d]) throw Error('Object ' + c + ' has no property "' + d + '"')
    e.color ? (c = new f(c, d)) : ((c = [c, d].concat(e.factoryArgs)), (c = g.apply(b, c)))
    e.before instanceof a && (e.before = e.before.__li)
    v(b, c)
    p.addClass(c.domElement, 'c')
    d = document.createElement('span')
    p.addClass(d, 'property-name')
    d.innerHTML = c.property
    var h = document.createElement('div')
    h.appendChild(d)
    h.appendChild(c.domElement)
    e = w(b, h, e.before)
    p.addClass(e, F.CLASS_CONTROLLER_ROW)
    p.addClass(e, typeof c.getValue())
    t(b, e, c)
    b.__controllers.push(c)
    return c
  }
  function w(a, b, c) {
    var d = document.createElement('li')
    b && d.appendChild(b)
    c ? a.__ul.insertBefore(d, params.before) : a.__ul.appendChild(d)
    a.onResize()
    return d
  }
  function t(a, c, e) {
    e.__li = c
    e.__gui = a
    u.extend(e, {
      options: function(b) {
        if (1 < arguments.length)
          return (
            e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [u.toArray(arguments)],
            })
          )
        if (u.isArray(b) || u.isObject(b))
          return (
            e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [b],
            })
          )
      },
      name: function(a) {
        e.__li.firstElementChild.firstElementChild.innerHTML = a
        return e
      },
      listen: function() {
        e.__gui.listen(e)
        return e
      },
      remove: function() {
        e.__gui.remove(e)
        return e
      },
    })
    if (e instanceof k) {
      var g = new l(e.object, e.property, {
        min: e.__min,
        max: e.__max,
        step: e.__step,
      })
      u.each(['updateDisplay', 'onChange', 'onFinishChange'], function(a) {
        var b = e[a],
          c = g[a]
        e[a] = g[a] = function() {
          var a = Array.prototype.slice.call(arguments)
          b.apply(e, a)
          return c.apply(g, a)
        }
      })
      p.addClass(c, 'has-slider')
      e.domElement.insertBefore(g.domElement, e.domElement.firstElementChild)
    } else if (e instanceof l) {
      var h = function(b) {
        return u.isNumber(e.__min) && u.isNumber(e.__max)
          ? (e.remove(),
            r(a, e.object, e.property, {
              before: e.__li.nextElementSibling,
              factoryArgs: [e.__min, e.__max, e.__step],
            }))
          : b
      }
      e.min = u.compose(
        h,
        e.min,
      )
      e.max = u.compose(
        h,
        e.max,
      )
    } else
      e instanceof d
        ? (p.bind(c, 'click', function() {
            p.fakeEvent(e.__checkbox, 'click')
          }),
          p.bind(e.__checkbox, 'click', function(a) {
            a.stopPropagation()
          }))
        : e instanceof b
          ? (p.bind(c, 'click', function() {
              p.fakeEvent(e.__button, 'click')
            }),
            p.bind(c, 'mouseover', function() {
              p.addClass(e.__button, 'hover')
            }),
            p.bind(c, 'mouseout', function() {
              p.removeClass(e.__button, 'hover')
            }))
          : e instanceof f &&
            (p.addClass(c, 'color'),
            (e.updateDisplay = u.compose(
              function(a) {
                c.style.borderLeftColor = e.__color.toString()
                return a
              },
              e.updateDisplay,
            )),
            e.updateDisplay())
    e.setValue = u.compose(
      function(b) {
        a.getRoot().__preset_select && e.isModified() && G(a.getRoot(), !0)
        return b
      },
      e.setValue,
    )
  }
  function v(a, b) {
    var c = a.getRoot(),
      d = c.__rememberedObjects.indexOf(b.object)
    if (-1 != d) {
      var e = c.__rememberedObjectIndecesToControllers[d]
      void 0 === e && ((e = {}), (c.__rememberedObjectIndecesToControllers[d] = e))
      e[b.property] = b
      if (c.load && c.load.remembered) {
        c = c.load.remembered
        if (c[a.preset]) c = c[a.preset]
        else if (c.Default) c = c.Default
        else return
        c[d] &&
          void 0 !== c[d][b.property] &&
          ((d = c[d][b.property]), (b.initialValue = d), b.setValue(d))
      }
    }
  }
  function x(a) {
    var b = (a.__save_row = document.createElement('li'))
    p.addClass(a.domElement, 'has-save')
    a.__ul.insertBefore(b, a.__ul.firstChild)
    p.addClass(b, 'save-row')
    var c = document.createElement('span')
    c.innerHTML = '&nbsp;'
    p.addClass(c, 'button gears')
    var d = document.createElement('span')
    d.innerHTML = 'Save'
    p.addClass(d, 'button')
    p.addClass(d, 'save')
    var e = document.createElement('span')
    e.innerHTML = 'New'
    p.addClass(e, 'button')
    p.addClass(e, 'save-as')
    var f = document.createElement('span')
    f.innerHTML = 'Revert'
    p.addClass(f, 'button')
    p.addClass(f, 'revert')
    var g = (a.__preset_select = document.createElement('select'))
    a.load && a.load.remembered
      ? u.each(a.load.remembered, function(b, c) {
          D(a, c, c == a.preset)
        })
      : D(a, 'Default', !1)
    p.bind(g, 'change', function() {
      for (var b = 0; b < a.__preset_select.length; b++)
        a.__preset_select[b].innerHTML = a.__preset_select[b].value
      a.preset = this.value
    })
    b.appendChild(g)
    b.appendChild(c)
    b.appendChild(d)
    b.appendChild(e)
    b.appendChild(f)
    if (J) {
      var h = function() {
        k.style.display = a.useLocalStorage ? 'block' : 'none'
      }
      b = document.getElementById('dg-save-locally')
      var k = document.getElementById('dg-local-explain')
      b.style.display = 'block'
      b = document.getElementById('dg-local-storage')
      'true' === localStorage.getItem(document.location.href + '.isLocal') &&
        b.setAttribute('checked', 'checked')
      h()
      p.bind(b, 'change', function() {
        a.useLocalStorage = !a.useLocalStorage
        h()
      })
    }
    var l = document.getElementById('dg-new-constructor')
    p.bind(l, 'keydown', function(a) {
      !a.metaKey || (67 !== a.which && 67 != a.keyCode) || O.hide()
    })
    p.bind(c, 'click', function() {
      l.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2)
      O.show()
      l.focus()
      l.select()
    })
    p.bind(d, 'click', function() {
      a.save()
    })
    p.bind(e, 'click', function() {
      var b = prompt('Enter a new preset name.')
      b && a.saveAs(b)
    })
    p.bind(f, 'click', function() {
      a.revert()
    })
  }
  function z(a) {
    function b(b) {
      b.preventDefault()
      e = b.clientX
      p.addClass(a.__closeButton, F.CLASS_DRAG)
      p.bind(window, 'mousemove', c)
      p.bind(window, 'mouseup', d)
      return !1
    }
    function c(b) {
      b.preventDefault()
      a.width += e - b.clientX
      a.onResize()
      e = b.clientX
      return !1
    }
    function d() {
      p.removeClass(a.__closeButton, F.CLASS_DRAG)
      p.unbind(window, 'mousemove', c)
      p.unbind(window, 'mouseup', d)
    }
    a.__resize_handle = document.createElement('div')
    u.extend(a.__resize_handle.style, {
      width: '6px',
      marginLeft: '-3px',
      height: '200px',
      cursor: 'ew-resize',
      position: 'absolute',
    })
    var e
    p.bind(a.__resize_handle, 'mousedown', b)
    p.bind(a.__closeButton, 'mousedown', b)
    a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild)
  }
  function C(a, b) {
    a.domElement.style.width = b + 'px'
    a.__save_row && a.autoPlace && (a.__save_row.style.width = b + 'px')
    a.__closeButton && (a.__closeButton.style.width = b + 'px')
  }
  function A(a, b) {
    var c = {}
    u.each(a.__rememberedObjects, function(d, e) {
      var f = {}
      u.each(a.__rememberedObjectIndecesToControllers[e], function(a, c) {
        f[c] = b ? a.initialValue : a.getValue()
      })
      c[e] = f
    })
    return c
  }
  function D(a, b, c) {
    var d = document.createElement('option')
    d.innerHTML = b
    d.value = b
    a.__preset_select.appendChild(d)
    c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1)
  }
  function G(a, b) {
    var c = a.__preset_select[a.__preset_select.selectedIndex]
    c.innerHTML = b ? c.value + '*' : c.value
  }
  function B(a) {
    0 != a.length &&
      q(function() {
        B(a)
      })
    u.each(a, function(a) {
      a.updateDisplay()
    })
  }
  m.inject(e)
  try {
    var J = 'localStorage' in window && null !== window.localStorage
  } catch (y) {
    J = !1
  }
  var O,
    M = !0,
    K,
    H = !1,
    L = [],
    F = function(a) {
      function b() {
        localStorage.setItem(document.location.href + '.gui', JSON.stringify(d.getSaveObject()))
      }
      function c() {
        var a = d.getRoot()
        a.width += 1
        u.defer(function() {
          --a.width
        })
      }
      var d = this
      this.domElement = document.createElement('div')
      this.__ul = document.createElement('ul')
      this.domElement.appendChild(this.__ul)
      p.addClass(this.domElement, 'dg')
      this.__folders = {}
      this.__controllers = []
      this.__rememberedObjects = []
      this.__rememberedObjectIndecesToControllers = []
      this.__listening = []
      a = a || {}
      a = u.defaults(a, { autoPlace: !0, width: F.DEFAULT_WIDTH })
      a = u.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace })
      u.isUndefined(a.load)
        ? (a.load = { preset: 'Default' })
        : a.preset && (a.load.preset = a.preset)
      u.isUndefined(a.parent) && a.hideable && L.push(this)
      a.resizable = u.isUndefined(a.parent) && a.resizable
      a.autoPlace && u.isUndefined(a.scrollable) && (a.scrollable = !0)
      var e = J && 'true' === localStorage.getItem(document.location.href + '.isLocal')
      Object.defineProperties(this, {
        parent: {
          get: function() {
            return a.parent
          },
        },
        scrollable: {
          get: function() {
            return a.scrollable
          },
        },
        autoPlace: {
          get: function() {
            return a.autoPlace
          },
        },
        preset: {
          get: function() {
            return d.parent ? d.getRoot().preset : a.load.preset
          },
          set: function(b) {
            d.parent ? (d.getRoot().preset = b) : (a.load.preset = b)
            for (b = 0; b < this.__preset_select.length; b++)
              this.__preset_select[b].value == this.preset &&
                (this.__preset_select.selectedIndex = b)
            d.revert()
          },
        },
        width: {
          get: function() {
            return a.width
          },
          set: function(b) {
            a.width = b
            C(d, b)
          },
        },
        name: {
          get: function() {
            return a.name
          },
          set: function(b) {
            a.name = b
            g && (g.innerHTML = a.name)
          },
        },
        closed: {
          get: function() {
            return a.closed
          },
          set: function(b) {
            a.closed = b
            a.closed ? p.addClass(d.__ul, F.CLASS_CLOSED) : p.removeClass(d.__ul, F.CLASS_CLOSED)
            this.onResize()
            d.__closeButton && (d.__closeButton.innerHTML = b ? F.TEXT_OPEN : F.TEXT_CLOSED)
          },
        },
        load: {
          get: function() {
            return a.load
          },
        },
        useLocalStorage: {
          get: function() {
            return e
          },
          set: function(a) {
            J &&
              ((e = a) ? p.bind(window, 'unload', b) : p.unbind(window, 'unload', b),
              localStorage.setItem(document.location.href + '.isLocal', a))
          },
        },
      })
      if (u.isUndefined(a.parent)) {
        a.closed = !1
        p.addClass(this.domElement, F.CLASS_MAIN)
        p.makeSelectable(this.domElement, !1)
        if (J && e) {
          d.useLocalStorage = !0
          var f = localStorage.getItem(document.location.href + '.gui')
          f && (a.load = JSON.parse(f))
        }
        this.__closeButton = document.createElement('div')
        this.__closeButton.innerHTML = F.TEXT_CLOSED
        p.addClass(this.__closeButton, F.CLASS_CLOSE_BUTTON)
        this.domElement.appendChild(this.__closeButton)
        p.bind(this.__closeButton, 'click', function() {
          d.closed = !d.closed
        })
      } else {
        void 0 === a.closed && (a.closed = !0)
        var g = document.createTextNode(a.name)
        p.addClass(g, 'controller-name')
        f = w(d, g)
        p.addClass(this.__ul, F.CLASS_CLOSED)
        p.addClass(f, 'title')
        p.bind(f, 'click', function(a) {
          a.preventDefault()
          d.closed = !d.closed
          return !1
        })
        a.closed || (this.closed = !1)
      }
      a.autoPlace &&
        (u.isUndefined(a.parent) &&
          (M &&
            ((K = document.createElement('div')),
            p.addClass(K, 'dg'),
            p.addClass(K, F.CLASS_AUTO_PLACE_CONTAINER),
            document.body.appendChild(K),
            (M = !1)),
          K.appendChild(this.domElement),
          p.addClass(this.domElement, F.CLASS_AUTO_PLACE)),
        this.parent || C(d, a.width))
      p.bind(window, 'resize', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'webkitTransitionEnd', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'transitionend', function() {
        d.onResize()
      })
      p.bind(this.__ul, 'oTransitionEnd', function() {
        d.onResize()
      })
      this.onResize()
      a.resizable && z(this)
      d.getRoot()
      a.parent || c()
    }
  F.toggleHide = function() {
    H = !H
    u.each(L, function(a) {
      a.domElement.style.zIndex = H ? -999 : 999
      a.domElement.style.opacity = H ? 0 : 1
    })
  }
  F.CLASS_AUTO_PLACE = 'a'
  F.CLASS_AUTO_PLACE_CONTAINER = 'ac'
  F.CLASS_MAIN = 'main'
  F.CLASS_CONTROLLER_ROW = 'cr'
  F.CLASS_TOO_TALL = 'taller-than-window'
  F.CLASS_CLOSED = 'closed'
  F.CLASS_CLOSE_BUTTON = 'close-button'
  F.CLASS_DRAG = 'drag'
  F.DEFAULT_WIDTH = 245
  F.TEXT_CLOSED = 'Close Controls'
  F.TEXT_OPEN = 'Open Controls'
  p.bind(
    window,
    'keydown',
    function(a) {
      'text' === document.activeElement.type ||
        (72 !== a.which && 72 != a.keyCode) ||
        F.toggleHide()
    },
    !1,
  )
  u.extend(F.prototype, {
    add: function(a, b) {
      return r(this, a, b, {
        factoryArgs: Array.prototype.slice.call(arguments, 2),
      })
    },
    addColor: function(a, b) {
      return r(this, a, b, { color: !0 })
    },
    remove: function(a) {
      this.__ul.removeChild(a.__li)
      this.__controllers.slice(this.__controllers.indexOf(a), 1)
      var b = this
      u.defer(function() {
        b.onResize()
      })
    },
    destroy: function() {
      this.autoPlace && K.removeChild(this.domElement)
    },
    addFolder: function(a) {
      if (void 0 !== this.__folders[a])
        throw Error('You already have a folder in this GUI by the name "' + a + '"')
      var b = { name: a, parent: this }
      b.autoPlace = this.autoPlace
      this.load &&
        this.load.folders &&
        this.load.folders[a] &&
        ((b.closed = this.load.folders[a].closed), (b.load = this.load.folders[a]))
      b = new F(b)
      this.__folders[a] = b
      a = w(this, b.domElement)
      p.addClass(a, 'folder')
      return b
    },
    open: function() {
      this.closed = !1
    },
    close: function() {
      this.closed = !0
    },
    onResize: function() {
      var a = this.getRoot()
      if (a.scrollable) {
        var b = p.getOffset(a.__ul).top,
          c = 0
        u.each(a.__ul.childNodes, function(b) {
          ;(a.autoPlace && b === a.__save_row) || (c += p.getHeight(b))
        })
        window.innerHeight - b - 20 < c
          ? (p.addClass(a.domElement, F.CLASS_TOO_TALL),
            (a.__ul.style.height = window.innerHeight - b - 20 + 'px'))
          : (p.removeClass(a.domElement, F.CLASS_TOO_TALL), (a.__ul.style.height = 'auto'))
      }
      a.__resize_handle &&
        u.defer(function() {
          a.__resize_handle.style.height = a.__ul.offsetHeight + 'px'
        })
      a.__closeButton && (a.__closeButton.style.width = a.width + 'px')
    },
    remember: function() {
      u.isUndefined(O) && ((O = new n()), (O.domElement.innerHTML = c))
      if (this.parent) throw Error('You can only call remember on a top level GUI.')
      var a = this
      u.each(Array.prototype.slice.call(arguments), function(b) {
        0 == a.__rememberedObjects.length && x(a)
        ;-1 == a.__rememberedObjects.indexOf(b) && a.__rememberedObjects.push(b)
      })
      this.autoPlace && C(this, this.width)
    },
    getRoot: function() {
      for (var a = this; a.parent; ) a = a.parent
      return a
    },
    getSaveObject: function() {
      var a = this.load
      a.closed = this.closed
      0 < this.__rememberedObjects.length &&
        ((a.preset = this.preset),
        a.remembered || (a.remembered = {}),
        (a.remembered[this.preset] = A(this)))
      a.folders = {}
      u.each(this.__folders, function(b, c) {
        a.folders[c] = b.getSaveObject()
      })
      return a
    },
    save: function() {
      this.load.remembered || (this.load.remembered = {})
      this.load.remembered[this.preset] = A(this)
      G(this, !1)
    },
    saveAs: function(a) {
      this.load.remembered ||
        ((this.load.remembered = {}), (this.load.remembered.Default = A(this, !0)))
      this.load.remembered[a] = A(this)
      this.preset = a
      D(this, a, !0)
    },
    revert: function(a) {
      u.each(
        this.__controllers,
        function(b) {
          this.getRoot().load.remembered ? v(a || this.getRoot(), b) : b.setValue(b.initialValue)
        },
        this,
      )
      u.each(this.__folders, function(a) {
        a.revert(a)
      })
      a || G(this.getRoot(), !1)
    },
    listen: function(a) {
      var b = 0 == this.__listening.length
      this.__listening.push(a)
      b && B(this.__listening)
    },
  })
  return F
})(
  dat.utils.css,
  '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
  ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
  (dat.controllers.factory = (function(m, c, e, g, a, d, b) {
    return function(l, k, h, f) {
      var q = l[k]
      if (b.isArray(h) || b.isObject(h)) return new m(l, k, h)
      if (b.isNumber(q))
        return b.isNumber(h) && b.isNumber(f) ? new e(l, k, h, f) : new c(l, k, { min: h, max: f })
      if (b.isString(q)) return new g(l, k)
      if (b.isFunction(q)) return new a(l, k, '')
      if (b.isBoolean(q)) return new d(l, k)
    }
  })(
    dat.controllers.OptionController,
    dat.controllers.NumberControllerBox,
    dat.controllers.NumberControllerSlider,
    (dat.controllers.StringController = (function(m, c, e) {
      var g = function(a, d) {
        function b() {
          e.setValue(e.__input.value)
        }
        g.superclass.call(this, a, d)
        var e = this
        this.__input = document.createElement('input')
        this.__input.setAttribute('type', 'text')
        c.bind(this.__input, 'keyup', b)
        c.bind(this.__input, 'change', b)
        c.bind(this.__input, 'blur', function() {
          e.__onFinishChange && e.__onFinishChange.call(e, e.getValue())
        })
        c.bind(this.__input, 'keydown', function(a) {
          13 === a.keyCode && this.blur()
        })
        this.updateDisplay()
        this.domElement.appendChild(this.__input)
      }
      g.superclass = m
      e.extend(g.prototype, m.prototype, {
        updateDisplay: function() {
          c.isActive(this.__input) || (this.__input.value = this.getValue())
          return g.superclass.prototype.updateDisplay.call(this)
        },
      })
      return g
    })(dat.controllers.Controller, dat.dom.dom, dat.utils.common)),
    dat.controllers.FunctionController,
    dat.controllers.BooleanController,
    dat.utils.common,
  )),
  dat.controllers.Controller,
  dat.controllers.BooleanController,
  dat.controllers.FunctionController,
  dat.controllers.NumberControllerBox,
  dat.controllers.NumberControllerSlider,
  dat.controllers.OptionController,
  (dat.controllers.ColorController = (function(m, c, e, g, a) {
    function d(b, c, d, e) {
      b.style.background = ''
      a.each(k, function(a) {
        b.style.cssText +=
          'background: ' + a + 'linear-gradient(' + c + ', ' + d + ' 0%, ' + e + ' 100%); '
      })
    }
    function b(a) {
      a.style.background = ''
      a.style.cssText +=
        'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
      a.style.cssText +=
        'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
      a.style.cssText +=
        'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
    }
    var l = function(h, f) {
      function k(a) {
        r(a)
        c.bind(window, 'mousemove', r)
        c.bind(window, 'mouseup', n)
      }
      function n() {
        c.unbind(window, 'mousemove', r)
        c.unbind(window, 'mouseup', n)
      }
      function m() {
        var a = g(this.value)
        !1 !== a
          ? ((t.__color.__state = a), t.setValue(t.__color.toOriginal()))
          : (this.value = t.__color.toString())
      }
      function u() {
        c.unbind(window, 'mousemove', w)
        c.unbind(window, 'mouseup', u)
      }
      function r(a) {
        a.preventDefault()
        var b = c.getWidth(t.__saturation_field),
          d = c.getOffset(t.__saturation_field),
          e = (a.clientX - d.left + document.body.scrollLeft) / b
        a = 1 - (a.clientY - d.top + document.body.scrollTop) / b
        1 < a ? (a = 1) : 0 > a && (a = 0)
        1 < e ? (e = 1) : 0 > e && (e = 0)
        t.__color.v = a
        t.__color.s = e
        t.setValue(t.__color.toOriginal())
        return !1
      }
      function w(a) {
        a.preventDefault()
        var b = c.getHeight(t.__hue_field),
          d = c.getOffset(t.__hue_field)
        a = 1 - (a.clientY - d.top + document.body.scrollTop) / b
        1 < a ? (a = 1) : 0 > a && (a = 0)
        t.__color.h = 360 * a
        t.setValue(t.__color.toOriginal())
        return !1
      }
      l.superclass.call(this, h, f)
      this.__color = new e(this.getValue())
      this.__temp = new e(0)
      var t = this
      this.domElement = document.createElement('div')
      c.makeSelectable(this.domElement, !1)
      this.__selector = document.createElement('div')
      this.__selector.className = 'selector'
      this.__saturation_field = document.createElement('div')
      this.__saturation_field.className = 'saturation-field'
      this.__field_knob = document.createElement('div')
      this.__field_knob.className = 'field-knob'
      this.__field_knob_border = '2px solid '
      this.__hue_knob = document.createElement('div')
      this.__hue_knob.className = 'hue-knob'
      this.__hue_field = document.createElement('div')
      this.__hue_field.className = 'hue-field'
      this.__input = document.createElement('input')
      this.__input.type = 'text'
      this.__input_textShadow = '0 1px 1px '
      c.bind(this.__input, 'keydown', function(a) {
        13 === a.keyCode && m.call(this)
      })
      c.bind(this.__input, 'blur', m)
      c.bind(this.__selector, 'mousedown', function(a) {
        c.addClass(this, 'drag').bind(window, 'mouseup', function(a) {
          c.removeClass(t.__selector, 'drag')
        })
      })
      var v = document.createElement('div')
      a.extend(this.__selector.style, {
        width: '122px',
        height: '102px',
        padding: '3px',
        backgroundColor: '#222',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.3)',
      })
      a.extend(this.__field_knob.style, {
        position: 'absolute',
        width: '12px',
        height: '12px',
        border: this.__field_knob_border + (0.5 > this.__color.v ? '#fff' : '#000'),
        boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
        borderRadius: '12px',
        zIndex: 1,
      })
      a.extend(this.__hue_knob.style, {
        position: 'absolute',
        width: '15px',
        height: '2px',
        borderRight: '4px solid #fff',
        zIndex: 1,
      })
      a.extend(this.__saturation_field.style, {
        width: '100px',
        height: '100px',
        border: '1px solid #555',
        marginRight: '3px',
        display: 'inline-block',
        cursor: 'pointer',
      })
      a.extend(v.style, {
        width: '100%',
        height: '100%',
        background: 'none',
      })
      d(v, 'top', 'rgba(0,0,0,0)', '#000')
      a.extend(this.__hue_field.style, {
        width: '15px',
        height: '100px',
        display: 'inline-block',
        border: '1px solid #555',
        cursor: 'ns-resize',
      })
      b(this.__hue_field)
      a.extend(this.__input.style, {
        outline: 'none',
        textAlign: 'center',
        color: '#fff',
        border: 0,
        fontWeight: 'bold',
        textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)',
      })
      c.bind(this.__saturation_field, 'mousedown', k)
      c.bind(this.__field_knob, 'mousedown', k)
      c.bind(this.__hue_field, 'mousedown', function(a) {
        w(a)
        c.bind(window, 'mousemove', w)
        c.bind(window, 'mouseup', u)
      })
      this.__saturation_field.appendChild(v)
      this.__selector.appendChild(this.__field_knob)
      this.__selector.appendChild(this.__saturation_field)
      this.__selector.appendChild(this.__hue_field)
      this.__hue_field.appendChild(this.__hue_knob)
      this.domElement.appendChild(this.__input)
      this.domElement.appendChild(this.__selector)
      this.updateDisplay()
    }
    l.superclass = m
    a.extend(l.prototype, m.prototype, {
      updateDisplay: function() {
        var b = g(this.getValue())
        if (!1 !== b) {
          var c = !1
          a.each(
            e.COMPONENTS,
            function(d) {
              if (
                !a.isUndefined(b[d]) &&
                !a.isUndefined(this.__color.__state[d]) &&
                b[d] !== this.__color.__state[d]
              )
                return (c = !0), {}
            },
            this,
          )
          c && a.extend(this.__color.__state, b)
        }
        a.extend(this.__temp.__state, this.__color.__state)
        this.__temp.a = 1
        var k = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0,
          l = 255 - k
        a.extend(this.__field_knob.style, {
          marginLeft: 100 * this.__color.s - 7 + 'px',
          marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
          backgroundColor: this.__temp.toString(),
          border: this.__field_knob_border + 'rgb(' + k + ',' + k + ',' + k + ')',
        })
        this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + 'px'
        this.__temp.s = 1
        this.__temp.v = 1
        d(this.__saturation_field, 'left', '#fff', this.__temp.toString())
        a.extend(this.__input.style, {
          backgroundColor: (this.__input.value = this.__color.toString()),
          color: 'rgb(' + k + ',' + k + ',' + k + ')',
          textShadow: this.__input_textShadow + 'rgba(' + l + ',' + l + ',' + l + ',.7)',
        })
      },
    })
    var k = ['-moz-', '-o-', '-webkit-', '-ms-', '']
    return l
  })(
    dat.controllers.Controller,
    dat.dom.dom,
    (dat.color.Color = (function(m, c, e, g) {
      function a(a, c, d) {
        Object.defineProperty(a, c, {
          get: function() {
            if ('RGB' === this.__state.space) return this.__state[c]
            b(this, c, d)
            return this.__state[c]
          },
          set: function(a) {
            'RGB' !== this.__state.space && (b(this, c, d), (this.__state.space = 'RGB'))
            this.__state[c] = a
          },
        })
      }
      function d(a, b) {
        Object.defineProperty(a, b, {
          get: function() {
            if ('HSV' === this.__state.space) return this.__state[b]
            l(this)
            return this.__state[b]
          },
          set: function(a) {
            'HSV' !== this.__state.space && (l(this), (this.__state.space = 'HSV'))
            this.__state[b] = a
          },
        })
      }
      function b(a, b, d) {
        if ('HEX' === a.__state.space) a.__state[b] = c.component_from_hex(a.__state.hex, d)
        else if ('HSV' === a.__state.space)
          g.extend(a.__state, c.hsv_to_rgb(a.__state.h, a.__state.s, a.__state.v))
        else throw 'Corrupted color state'
      }
      function l(a) {
        var b = c.rgb_to_hsv(a.r, a.g, a.b)
        g.extend(a.__state, { s: b.s, v: b.v })
        g.isNaN(b.h) ? g.isUndefined(a.__state.h) && (a.__state.h = 0) : (a.__state.h = b.h)
      }
      var k = function() {
        this.__state = m.apply(this, arguments)
        if (!1 === this.__state) throw 'Failed to interpret color arguments'
        this.__state.a = this.__state.a || 1
      }
      k.COMPONENTS = 'r g b h s v hex a'.split(' ')
      g.extend(k.prototype, {
        toString: function() {
          return e(this)
        },
        toOriginal: function() {
          return this.__state.conversion.write(this)
        },
      })
      a(k.prototype, 'r', 2)
      a(k.prototype, 'g', 1)
      a(k.prototype, 'b', 0)
      d(k.prototype, 'h')
      d(k.prototype, 's')
      d(k.prototype, 'v')
      Object.defineProperty(k.prototype, 'a', {
        get: function() {
          return this.__state.a
        },
        set: function(a) {
          this.__state.a = a
        },
      })
      Object.defineProperty(k.prototype, 'hex', {
        get: function() {
          this.__state.hex = c.rgb_to_hex(this.r, this.g, this.b)
          return this.__state.hex
        },
        set: function(a) {
          this.__state.space = 'HEX'
          this.__state.hex = a
        },
      })
      return k
    })(
      dat.color.interpret,
      (dat.color.math = (function() {
        var m
        return {
          hsv_to_rgb: function(c, e, g) {
            var a = c / 60 - Math.floor(c / 60),
              d = g * (1 - e),
              b = g * (1 - a * e)
            e = g * (1 - (1 - a) * e)
            c = [[g, e, d], [b, g, d], [d, g, e], [d, b, g], [e, d, g], [g, d, b]][
              Math.floor(c / 60) % 6
            ]
            return { r: 255 * c[0], g: 255 * c[1], b: 255 * c[2] }
          },
          rgb_to_hsv: function(c, e, g) {
            var a = Math.max(c, e, g),
              d = a - Math.min(c, e, g)
            if (0 == a) return { h: NaN, s: 0, v: 0 }
            c = (c == a ? (e - g) / d : e == a ? 2 + (g - c) / d : 4 + (c - e) / d) / 6
            0 > c && (c += 1)
            return { h: 360 * c, s: d / a, v: a / 255 }
          },
          rgb_to_hex: function(c, e, g) {
            c = this.hex_with_component(0, 2, c)
            c = this.hex_with_component(c, 1, e)
            return (c = this.hex_with_component(c, 0, g))
          },
          component_from_hex: function(c, e) {
            return (c >> (8 * e)) & 255
          },
          hex_with_component: function(c, e, g) {
            return (g << (m = 8 * e)) | (c & ~(255 << m))
          },
        }
      })()),
      dat.color.toString,
      dat.utils.common,
    )),
    dat.color.interpret,
    dat.utils.common,
  )),
  (dat.utils.requestAnimationFrame = (function() {
    return (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(m, c) {
        window.setTimeout(m, 1e3 / 60)
      }
    )
  })()),
  (dat.dom.CenteredDiv = (function(m, c) {
    var e = function() {
      this.backgroundElement = document.createElement('div')
      c.extend(this.backgroundElement.style, {
        backgroundColor: 'rgba(0,0,0,0.8)',
        top: 0,
        left: 0,
        display: 'none',
        zIndex: '1000',
        opacity: 0,
        WebkitTransition: 'opacity 0.2s linear',
      })
      m.makeFullscreen(this.backgroundElement)
      this.backgroundElement.style.position = 'fixed'
      this.domElement = document.createElement('div')
      c.extend(this.domElement.style, {
        position: 'fixed',
        display: 'none',
        zIndex: '1001',
        opacity: 0,
        WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      })
      document.body.appendChild(this.backgroundElement)
      document.body.appendChild(this.domElement)
      var e = this
      m.bind(this.backgroundElement, 'click', function() {
        e.hide()
      })
    }
    e.prototype.show = function() {
      var e = this
      this.backgroundElement.style.display = 'block'
      this.domElement.style.display = 'block'
      this.domElement.style.opacity = 0
      this.domElement.style.webkitTransform = 'scale(1.1)'
      this.layout()
      c.defer(function() {
        e.backgroundElement.style.opacity = 1
        e.domElement.style.opacity = 1
        e.domElement.style.webkitTransform = 'scale(1)'
      })
    }
    e.prototype.hide = function() {
      var c = this,
        a = function() {
          c.domElement.style.display = 'none'
          c.backgroundElement.style.display = 'none'
          m.unbind(c.domElement, 'webkitTransitionEnd', a)
          m.unbind(c.domElement, 'transitionend', a)
          m.unbind(c.domElement, 'oTransitionEnd', a)
        }
      m.bind(this.domElement, 'webkitTransitionEnd', a)
      m.bind(this.domElement, 'transitionend', a)
      m.bind(this.domElement, 'oTransitionEnd', a)
      this.backgroundElement.style.opacity = 0
      this.domElement.style.opacity = 0
      this.domElement.style.webkitTransform = 'scale(1.1)'
    }
    e.prototype.layout = function() {
      this.domElement.style.left = window.innerWidth / 2 - m.getWidth(this.domElement) / 2 + 'px'
      this.domElement.style.top = window.innerHeight / 2 - m.getHeight(this.domElement) / 2 + 'px'
    }
    return e
  })(dat.dom.dom, dat.utils.common)),
  dat.dom.dom,
  dat.utils.common,
)
