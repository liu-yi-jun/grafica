class ChannelBar {
  constructor(_p, _channelIndex, _x, _y, _w, _h, _numSeconds, _sampleRate) {
    this.p = _p;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
   
    this.numSeconds = _numSeconds;
    this.sampleRate = _sampleRate;
    this.setup();
  }

  setup() {
    this.plot = new GPlot(this.p);
    this.plot.setPos(this.x, this.y);
    console.log(this.w, this.h,this.x, this.y);
    this.plot.setDim(this.w, this.h);
    this.plot.setXLim(-this.numSeconds, 0);
    this.plot.setMar(0, 0, 0, 0);
    this.plot.setYLim(10, 80);
    this.plot.getXAxis().setAxisLabelText("x axis");
    this.plot.getYAxis().setAxisLabelText("y axis");
    this.plot.setTitleText("A very simple example");
  }

  setPoints(points) {
    this.plot.setPoints(points);
  }

  draw() {
   
    this.plot.beginDraw();
    this.plot.drawBox();
    this.plot.drawXAxis();
    this.plot.drawYAxis();
    // plot.drawTopAxis();
    // plot.drawRightAxis();
    this.plot.drawTitle();
    // plot.drawPoints();
    this.plot.drawLines();
    this.plot.endDraw();
  }
}

var defaultPlotSketch = function (p) {
  // Initial setup
  var channelBars = [];
  let points = [];
  const numSeconds = 30;
  const sampleRate = 250;
  const nPoints = sampleRate * numSeconds;
  const timeBetweenPoints = numSeconds / nPoints;
  p.setup = function () {
    p.createCanvas(1000, 600);
    for (var i = 0; i < 2; i++) {
      channelBars[i] = new ChannelBar(
        p,
        i,
        50,
        i * 260 + 60,
        900,
        200,
        numSeconds,
        sampleRate
      );
    
    }
    setInterval(() => {
      for (var channel = 0; channel < 2; channel++) {
        for (var i = 0; i < nPoints; i++) {
          let time = -numSeconds + i * timeBetweenPoints;
          points[i] = new GPoint(time, 10 * p.noise(0.1 * i + p.random()));
        }
        channelBars[channel].setPoints(points);
      }
    }, 40);
  };
  p.draw = function () {
    p.background(150);
    for (var i = 0; i < 2; i++) {
      channelBars[i].draw();
    }
  };
};
