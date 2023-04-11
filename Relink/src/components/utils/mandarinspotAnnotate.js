export default function () {
  function z(a, b, d) {
    "class" == b
      ? (a.className = d)
      : "style" == b
      ? (a.style.cssText = d)
      : "for" == b
      ? (a.htmlFor = d)
      : "checked" == b
      ? (a.defaultChecked = d)
      : a.setAttribute(b, d);
  }
  function W(a, b) {
    var d = document.createElement("style");
    z(d, "id", b);
    z(d, "title", b);
    z(d, "type", "text/css");
    d.styleSheet
      ? (d.styleSheet.cssText = a)
      : d.appendChild(document.createTextNode(a));
    X.appendChild(d);
  }
  function H(a) {
    a = a.charCodeAt(0);
    return 19968 <= a && 40879 >= a;
  }
  function P(a) {
    var b = [];
    if (3 == a.nodeType) {
      if (void 0 == a.nodeValue) return;
      var d = a.nodeValue;
      for (var c = [], e = 0; e < d.length; ) {
        for (
          var g = e + 1, f = H(d.charAt(e));
          g < d.length && H(d.charAt(g)) == f;

        )
          ++g;
        c.push([f, e, g]);
        e = g;
      }
      d = (1 == c.length && !H(d.charAt(c[0][1]))) || 0 == c.length ? [] : c;
      d.length && b.push([a, d]);
    } else if (1 == a.nodeType) {
      if (
        a.nodeName.toLowerCase() in
        { textarea: 1, "x-mspot": 1, ruby: 1, script: 1, style: 1, option: 1 }
      )
        return;
      c = 0;
      for (e = a.childNodes.length; c < e; ++c)
        (d = P(a.childNodes[c])) && (b = b.concat(d));
    }
    return b;
  }
  function I() {
    document.getElementById("mandarinspot-progress").parentNode.style.display =
      "none";
  }
  function Q(a, b, d, c) {
    var e = [],
      g;
    for (g in d) {
      var f = d[g];
      void 0 != f && e.push(g + "=" + f);
    }
    e = e.join("&");
    var k = new XMLHttpRequest();
    "withCredentials" in k
      ? (k.open(a, b, !0),
        "POST" == a &&
          (k.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          ),
          k.setRequestHeader("Content-Length", String(e.length))))
      : "undefined" != typeof XDomainRequest
      ? ((k = new XDomainRequest()), k.open(a, b))
      : (k = null);
    k.onload = function () {
      if (399 < k.status) c(k.status);
      else {
        var q = eval("(" + k.responseText + ")");
        J = !!(k.getResponseHeader("mspot-flags") & 1);
        c(null, q);
      }
    };
    k.send(e);
  }
  function Y(a, b, d) {
    Q("GET", a, b, d);
  }
  function Z(a, b, d) {
    Q("POST", a, b, d);
  }
  function aa(a, b, d) {
    var c = ["\r\n"],
      e;
    for (e in b) {
      var g = b[e];
      void 0 != g &&
        c.push(
          'Content-Disposition: form-data; name="' +
            e +
            '"\r\n\r\n' +
            g +
            "\r\n"
        );
    }
    c = c.join("--boundary\r\n") + "--boundary--\r\n";
    var f = new XMLHttpRequest();
    f.open("POST", a, !0);
    f.setRequestHeader(
      "Content-Type",
      "multipart/form-data; boundary=boundary"
    );
    f.setRequestHeader("Content-Length", String(c.length));
    f.onreadystatechange = function () {
      if (4 == f.readyState && 200 == f.status) {
        var k = eval("(" + f.responseText + ")");
        J = !!(f.getResponseHeader("mspot-flags") & 1);
        d(null, k);
      }
    };
    f.send(c);
  }
  function ba(a) {
    for (var b = [], d = 0, c = a.length; d < c; ++d) {
      for (var e = a[d], g = "", f = 0, k = e.length; f < k; ++f)
        g += (e.charCodeAt(f) - 8192).toString(32);
      b.push(g);
    }
    return b;
  }
  function ca(a) {
    for (var b = [], d = 0, c = a.length; d < c; ++d) {
      for (var e = a[d], g = "", f = 0, k = e.length; f < k; ++f) {
        var q = e.charCodeAt(f);
        g += String.fromCharCode(224 | (15 & (q >>> 12)));
        g += String.fromCharCode(128 | (63 & (q >>> 6)));
        g += String.fromCharCode(128 | (63 & q));
      }
      b.push(g);
    }
    return b;
  }
  function da(a, b) {
    function d(l) {
      var p = l.seg,
        m = E;
      l = l.defs;
      for (var n in l) m[n] = l[n];
      m = 0;
      for (n = b.length; m < n; ++m) {
        l = b[m][0];
        for (var u = b[m][1], r = 0, C = u.length; r < C; ++r) {
          var v = u[r],
            A = l.nodeValue.slice(v[1], v[2]),
            w = document.createTextNode(A);
          if (v[0]) {
            v = p.shift();
            for (var K = 0, L = 0, ea = v.length; L < ea; ++L) {
              var R = parseInt(v[L], 32),
                fa = document.createElement("wbr"),
                D = A.slice(K, K + R);
              w = document.createTextNode(D);
              var M = document.createElement("ruby"),
                S = document.createElement("rt"),
                N = document.createElement("rb");
              try {
                S.appendChild(document.createTextNode(E[D][0][0]));
              } catch (ka) {}
              N.appendChild(w);
              M.appendChild(S);
              M.appendChild(N);
              w = N;
              D = ha;
              w.addEventListener
                ? w.addEventListener("mouseover", D, !1)
                : w.attachEvent
                ? w.attachEvent("onmouseover", D)
                : (w.onmouseover = D);
              l.parentNode.insertBefore(fa, l);
              l.parentNode.insertBefore(M, l);
              K += R;
            }
          } else l.parentNode.insertBefore(w, l);
        }
        l.parentNode && l.parentNode.removeChild(l);
      }
      I();
    }
    if (b.length) {
      for (var c = [], e = 0, g = b.length; e < g; ++e) {
        var f = b[e],
          k = f[0];
        f = f[1];
        for (var q = 0, t = f.length; q < t; ++q) {
          var h = f[q];
          h[0] && c.push(k.nodeValue.slice(h[1], h[2]));
        }
      }
      e = ia(ca(c).join(",") + a);
      Y("https://api.mandarinspot.com/cache/" + e, {}, function (l, p) {
        404 == l
          ? (G.i
              ? ((l = Z), (c = ba(c).join(",")))
              : ((l = aa), (c = c.join(","))),
            l(
              "https://api.mandarinspot.com/getdefs",
              { str: c, phs: a },
              function (m, n) {
                d(n);
              }
            ))
          : d(p);
      });
    } else I();
  }
  function ha(a, b) {
    if (O) {
      var d = a.target || a.srcElement;
      d.onmouseout = function () {
        /*  B.style.visibility = "hidden";
        B.style.left = "-1000px";
        B.style.top = "-1000px";
        B.style.width = ""; */
        G.j(d);
      };
      G.l(d);
      b = b
        ? b
        : d.lastChild.nodeValue
        ? d.lastChild.nodeValue
        : d.lastChild.lastChild.nodeValue;
      a = E[b][0];
      var c = E[b][1],
        e = E[b][2],
        g = "";
      if (b !== e) {
        for (var f = 0; f < b.length; ++f) g += b[f] !== e[f] ? e[f] : "-";
        g = " [" + g + "]";
      }
      b = '<div id="mandarinspot-tip-hz">' + b + g + "</div>";
      f = 0;
      for (e = a.length; f < e; ++f)
        (g = F
          ? c[f].replace(/([^<])\//g, "$1 / ")
          : "â€¢ " + c[f].replace(/([^<])\//g, "$1<br />â€¢ ")),
          (b +=
            '<div id="mandarinspotspot-tip-py">' +
            a[f] +
            '</div><div id="mandarinspotspot-tip-en">' +
            g +
            "</div>" +
            "<p>fuck my bussy daddy</p>");
      x.bookmark ||
        J ||
        (b +=
          '<div id="mandarinspotspot-tip-fo" style="font-size:xx-small;color:#777;text-align:center;margin-top:1ex">MandarinSpot.com</div>');
      B.innerHTML = b;
      G.m(d, B);
      B.style.visibility = "visible";
    }
  }
  function ja(a) {
    if ("undefined" == typeof a) return [document.body];
    if ("string" == typeof a) {
      var b = a[0],
        d = a.slice(1);
      if ("#" == b) return [document.getElementById(d)];
      if ("." == b) {
        b = document.body;
        if (b.getElementsByClassName) a = b.getElementsByClassName(d);
        else {
          a = [];
          d = new RegExp("(?:^| )" + d + "(?: |$)");
          b = b.getElementsByTagName("*");
          for (var c = 0, e = b.length; c < e; ++c)
            d.test(b[c].className) && a.push(b[c]);
        }
        return a;
      }
    }
    if ("object" == typeof a) return [a];
  }
  function T(a, b) {
    b = b || {};
    var d = b.phonetic || "pinyin",
      c = b.show || !0;
    U(b.inline);
    a = ja(a);
    b = [];
    x.bookmark
      ? (document.getElementById(
          "mandarinspot-progress"
        ).parentNode.style.display = "block")
      : I();
    for (var e = 0, g = a.length; e < g; ++e) b = b.concat(P(a[e]));
    document.getElementById("mandarinspot-progress").innerHTML = "Loading...";
    da(d, b);
    O = c;
  }
  function U(a) {
    for (var b = 0; b < document.styleSheets.length; ++b) {
      var d = document.styleSheets[b];
      if ("mandarinspot-style" == d.title)
        for (var c = 0; c < d.cssRules.length; ++c) {
          var e = d.cssRules[c];
          if ("ruby > rt" == e.selectorText) {
            e.style.display = a ? "block" : "none";
            e.style.visibility = a;
            return;
          }
        }
    }
  }
  function ia(a) {
    function b(C) {
      var v = "",
        A;
      for (A = 7; 0 <= A; A--) {
        var w = (C >>> (4 * A)) & 15;
        v += w.toString(16);
      }
      return v;
    }
    function d(C, v) {
      return (C << v) | (C >>> (32 - v));
    }
    var c,
      e = Array(80),
      g = 1732584193,
      f = 4023233417,
      k = 2562383102,
      q = 271733878,
      t = 3285377520;
    var h = a.length;
    var l = [];
    for (c = 0; c < h - 3; c += 4) {
      var p =
        (a.charCodeAt(c) << 24) |
        (a.charCodeAt(c + 1) << 16) |
        (a.charCodeAt(c + 2) << 8) |
        a.charCodeAt(c + 3);
      l.push(p);
    }
    switch (h % 4) {
      case 0:
        c = 2147483648;
        break;
      case 1:
        c = (a.charCodeAt(h - 1) << 24) | 8388608;
        break;
      case 2:
        c = (a.charCodeAt(h - 2) << 24) | (a.charCodeAt(h - 1) << 16) | 32768;
        break;
      case 3:
        c =
          (a.charCodeAt(h - 3) << 24) |
          (a.charCodeAt(h - 2) << 16) |
          (a.charCodeAt(h - 1) << 8) |
          128;
    }
    for (l.push(c); 14 != l.length % 16; ) l.push(0);
    l.push(h >>> 29);
    l.push((h << 3) & 4294967295);
    for (a = 0; a < l.length; a += 16) {
      for (c = 0; 16 > c; c++) e[c] = l[a + c];
      for (c = 16; 79 >= c; c++)
        e[c] = d(e[c - 3] ^ e[c - 8] ^ e[c - 14] ^ e[c - 16], 1);
      p = g;
      h = f;
      var m = k;
      var n = q;
      var u = t;
      for (c = 0; 19 >= c; c++) {
        var r =
          (d(p, 5) + ((h & m) | (~h & n)) + u + e[c] + 1518500249) & 4294967295;
        u = n;
        n = m;
        m = d(h, 30);
        h = p;
        p = r;
      }
      for (c = 20; 39 >= c; c++)
        (r = (d(p, 5) + (h ^ m ^ n) + u + e[c] + 1859775393) & 4294967295),
          (u = n),
          (n = m),
          (m = d(h, 30)),
          (h = p),
          (p = r);
      for (c = 40; 59 >= c; c++)
        (r =
          (d(p, 5) + ((h & m) | (h & n) | (m & n)) + u + e[c] + 2400959708) &
          4294967295),
          (u = n),
          (n = m),
          (m = d(h, 30)),
          (h = p),
          (p = r);
      for (c = 60; 79 >= c; c++)
        (r = (d(p, 5) + (h ^ m ^ n) + u + e[c] + 3395469782) & 4294967295),
          (u = n),
          (n = m),
          (m = d(h, 30)),
          (h = p),
          (p = r);
      g = (g + p) & 4294967295;
      f = (f + h) & 4294967295;
      k = (k + m) & 4294967295;
      q = (q + n) & 4294967295;
      t = (t + u) & 4294967295;
    }
    r = b(g) + b(f) + b(k) + b(q) + b(t);
    return r.toLowerCase();
  }
  window.mandarinspot || (window.mandarinspot = {});
  var X =
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0] ||
      document.documentElement,
    V = document.getElementsByTagName("body")[0] || document.documentElement,
    F = -1 != navigator.userAgent.toLowerCase().indexOf("mobile");
  document.getElementById("mandarinspot-style") ||
    W(
      "#mandarinspot-tip{text-align:center;z-index:999999;border:1px solid #773;border-radius:3px;background-color:#ffc;color:#000;padding:5px;padding-bottom:2px;font:normal 14px sans-serif,arial;visibility:hidden;position:absolute}#mandarinspot-tip-hz{font-size:150%;border:none}#mandarinspotspot-tip-py{font-weight:bold;border:none}#mandarinspotspot-tip-en{text-align:left;font-size:90%;border:none}#mandarinspotspot-tip-fo{font-size:xx-small;color:#777;text-align:center;margin-top:1ex;border:none}.mspot{margin:0;padding:0;border:none;width:auto;height:auto}ruby{display:inline-block;margin:0 0.2ex}ruby>rt{display:none;font-size:70%;text-align:center;width:100%}ruby>rb{display:block;width:100%}#mandarinspot-progressslot{position:fixed;display:block;z-index:1000;top:0;left:0;width:100%;border:none}#mandarinspot-progress{margin:0 " +
        (F ? "0" : "auto") +
        ";padding:.4ex 0;background-color:#ff9;color:#000;width:22ex;text-align:center;font:normal 14px sans-serif,arial;border:none}",
      "mandarinspot-style"
    );
  if (!document.getElementById("mandarinspot-tip")) {
    var y = document.createElement("div");
    z(y, "id", "mandarinspot-tip");
    z(y, "class", "mspot");
    V.appendChild(y);
  }
  document.getElementById("mandarinspot-progressslot") ||
    ((y = document.createElement("div")),
    z(y, "id", "mandarinspot-progressslot"),
    z(y, "class", "mspot"),
    (y.style.display = "none"),
    (y.innerHTML = '<div id="mandarinspot-progress">Loading..</div>'),
    V.appendChild(y));
  var E = {},
    J = !1,
    G = {
      f: F ? 200 : 300,
      g: F ? 50 : 100,
      c: "",
      l: function (a) {
        this.c = a.style.backgroundColor;
        a.style.backgroundColor = "#fe7";
      },
      j: function (a) {
        a.style.backgroundColor = this.c;
      },
      h: function (a) {
        return a.getBoundingClientRect
          ? ((a = a.getBoundingClientRect()),
            [
              a.left +
                (window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft),
              a.top +
                (window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop),
            ])
          : [this.a(a), this.b(a)];
      },
      a: function (a) {
        return (
          (a.offsetLeft || 0) +
          ((a.offsetParent && this.a(a.offsetParent)) || 0)
        );
      },
      b: function (a) {
        return (
          (a.offsetTop || 0) + ((a.offsetParent && this.b(a.offsetParent)) || 0)
        );
      },
      m: function (a, b) {
        var d =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
          c =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight,
          e =
            window.pageXOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft,
          g =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop,
          f = this.h(a),
          k = f[0];
        f = f[1];
        var q = !1,
          t;
        b.offsetWidth > this.f
          ? (b.style.width = this.f + "px")
          : b.offsetWidth < this.g && (b.style.width = this.g + "px");
        f - g > b.offsetHeight + 15
          ? (t = f - 3 - b.offsetHeight)
          : (t = f + 3 + a.offsetHeight);
        if (t < g || t + b.offsetHeight > g + c) (t = g), (q = !0);
        b.style.top = t + "px";
        if (F) var h = Math.max(e, k - b.offsetWidth);
        else
          q
            ? 0 > a.offsetWidth || k < b.offsetWidth
              ? (h = k + a.offsetWidth)
              : (h = k - b.offsetWidth)
            : ((c = Math.min(30, Math.abs(a.offsetWidth) / 2)),
              d + e - k - a.offsetWidth < b.offsetWidth + 15
                ? (h = k + c - b.offsetWidth)
                : (h = k + c),
              0 > h && (h = 0));
        b.style.left = h + "px";
      },
      i: document.all,
    },
    B = document.getElementById("mandarinspot-tip"),
    O = !0;
  window.mandarinspot || (window.mandarinspot = {});
  var x = window.mandarinspot;
  x.annotate = T;
  x.showPopups = function (a) {
    O = a;
  };
  x.showInline = U;
  x.supported = function () {
    return "withCredentials" in new XMLHttpRequest() ? !0 : !!XDomainRequest;
  };
  x.run = function () {
    T(document.body, { phonetic: x.phonetic, show: !0, inline: x.inline });
  };
  x.bookmark && x.run();
}
