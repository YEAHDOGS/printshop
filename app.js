/* DOGS Print Shop — snap-panel interactions.
   transform/opacity only. Reveals fire per-panel on entry; input never blocked. */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = document.querySelector(".snap");
  var panels = document.querySelectorAll(".panel");

  /* Staggered clip reveals: when a panel enters, reveal its children in --d order. */
  if (reduced || !("IntersectionObserver" in window) || !stage) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      });
    }, { root: stage, threshold: 0.35 });
    panels.forEach(function (p) {
      /* panels with a full-set stagger keep reveals until re-entry for replay */
      io.observe(p);
    });
  }

  /* Honest waitlist: saved to this device only. No backend, no tracking. */
  var form = document.getElementById("waitform");
  var ok = document.getElementById("wait-ok");
  var input = document.getElementById("wait-email");
  if (form && ok && input) {
    try {
      var saved = localStorage.getItem("printshop-waitlist");
      if (saved) { form.hidden = true; ok.hidden = false; ok.textContent = "You're on the list. No spam, no tracking."; }
    } catch (err) { /* storage unavailable — form still works visually */ }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var v = input.value.trim();
      if (!v || v.indexOf("@") < 0) { input.focus(); return; }
      try { localStorage.setItem("printshop-waitlist", v); } catch (err) {}
      form.hidden = true; ok.hidden = false;
    });
  }

  /* Live parametric wedge preview (dims remapped to pixel geometry). */
  var sLen = document.getElementById("s-len");
  if (!sLen) return;
  var sWid = document.getElementById("s-wid");
  var sHt = document.getElementById("s-ht");
  var oLen = document.getElementById("o-len");
  var oWid = document.getElementById("o-wid");
  var oHt = document.getElementById("o-ht");
  var pTop = document.getElementById("live-top");
  var pSide = document.getElementById("live-side");
  var pMid = document.getElementById("live-mid");
  var lenLabel = document.getElementById("live-len-label");
  var wLabel = document.getElementById("live-w-label");
  var bedNote = document.getElementById("bed-note");

  function draw() {
    var L = +sLen.value, W = +sWid.value, H = +sHt.value;
    oLen.textContent = L + " mm";
    oWid.textContent = W + " mm";
    oHt.textContent = H + " mm";

    var x0 = 60, x1 = 400, yBase = 240;
    var hPx = 40 + ((H - 25) / 35) * 110;      /* 25-60 mm -> 40-150 px */
    var depth = 14 + ((W - 40) / 60) * 46;     /* 40-100 mm -> 14-60 px */
    var taper = hPx * 0.37;

    var top = x0 + "," + (yBase - hPx) + " " + x1 + "," + (yBase - taper) + " " +
              x1 + "," + yBase + " " + x0 + "," + yBase;
    pTop.setAttribute("d", "M" + top.split(" ").join(" L") + " Z");

    var sx = x0 - depth, sy = yBase - depth * 0.6;
    var side = sx + "," + (sy - hPx) + " " + x0 + "," + (yBase - hPx) + " " +
               x0 + "," + yBase + " " + sx + "," + sy;
    pSide.setAttribute("d", "M" + side.split(" ").join(" L") + " Z");

    pMid.setAttribute("d", "M" + x0 + "," + (yBase - hPx) + " L" + x1 + "," + (yBase - taper));

    lenLabel.textContent = L + " mm";
    lenLabel.setAttribute("x", (x0 + x1) / 2);
    lenLabel.setAttribute("y", yBase + 42);

    wLabel.textContent = W + " mm";
    wLabel.setAttribute("x", sx + depth * 0.5);
    wLabel.setAttribute("y", sy - hPx - 10);
    wLabel.setAttribute("text-anchor", "middle");

    bedNote.hidden = L <= 220;
  }
  ["input", "change"].forEach(function (ev) {
    sLen.addEventListener(ev, draw);
    sWid.addEventListener(ev, draw);
    sHt.addEventListener(ev, draw);
  });
  draw();
})();
