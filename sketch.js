let ball;
let balls = [];
let rightWall = 300;

function detectMax() {
  try {
  
    window.max.outlet('Hello Max!');
    return true;
  }
  catch(e) {  
    console.log('Max, where are you?');
  }
  return false;
}

let s = (function(p) {

  const maxIsDetected = detectMax();

  let background_r = 0; let background_g = 0; let background_b = 0;
  let stroke_r = 255; let stroke_g = 255; let stroke_b = 255;
  let opaqueFlag = true;

  let ball;
  let balls = [];
  let rightWall = 300;

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
  

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    if(maxIsDetected) {
      window.max.bindInlet('set_background_color', function (_r, _g, _b) {
        background_r = _r; background_g = _g; background_b = _b;
        if(opaqueFlag) p.background(background_r, background_g, background_b);
      });
      window.max.bindInlet('set_opaque', function (_flag) {
        opaqueFlag = _flag;
       
        if(!opaqueFlag) p.clear();
      });
      window.max.bindInlet('set_stroke_color', function (_r, _g, _b) {
        stroke_r = _r; stroke_g = _g; stroke_b = _b;
      });
      window.max.bindInlet('parse_dict', function (_dict_name) {
        window.max.getDict(_dict_name, function(_dict) {
          window.max.outlet('parse_dict', 'start parsing...');
          for(let _key in _dict) {
            if (_dict.hasOwnProperty(_key)) {
              window.max.outlet('parse_dict', _key + ' ' + _dict[_key]);
            }
          }
          window.max.outlet('parse_dict', '... parsing finished');
        });
      });
      // remove unwanted scroll bar
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      
      
    }

    
    
    ball = new Walker();

  }

  p.draw = function() {

  
    p.background(background_r, background_g, background_b);

    for (let b of balls) {
      b.update();
      b.display();
      b.checkEdges();
    }

    if (p.mouseIsPressed) {
      // ball.vel add(2,-2);
    }

    if(maxIsDetected) {
      window.max.outlet('status', p.frameCount, p.mouseIsPressed);
      let dict_obj = {
        frame_count: p.frameCount,
        mouse_pressed: p.mouseIsPressed
      };
      window.max.setDict('status_dict', dict_obj);
      window.max.outlet('status_dict_updated');
    }

  }

  p.mousePressed = function() {
    ball.vel.add(5, -5);
    let b = new Walker();
    balls.push(b);
  }
  
  class Walker {
    constructor() {
      this.pos = p.createVector(p.mouseX, p.mouseY);
      this.vel = p.createVector(p.random(-9, 9), (0 - p.mouseY) * 0.05);
      this.acc = p.createVector(0, (p.mouseY - p.height) * -0.003);
      this.w = 30;
      this.t = 0;
      this.op = 250;
    }

    update() {
      this.vel.add(this.acc);
      this.vel.mult(0.99);
      this.pos.add(this.vel);
    }

    checkEdges() {
      if (this.pos.x > p.width || this.pos.x < 0) {
        this.vel.x *= -1;
      }

      if (this.pos.y > p.height || this.pos.y < 0) {
        if (this.pos.y > p.height) {
          this.pos.y = p.height;
        }
        this.vel.y *= -0.9;
        this.op = this.op - 1;
      }
    }

    display() {
      p.fill(255, 180, 55, this.op);
      p.stroke(0, this.op);
      p.ellipse(this.pos.x, this.pos.y, this.w);
    }
  }
});

let myp5 = new p5(s);