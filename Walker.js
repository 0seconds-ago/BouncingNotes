class Walker {
  
  constructor() {
    this.pos = createVector(mouseX, mouseY);
    this.vel = createVector(random(-9,9), (0-mouseY)*0.05);
    this.acc = createVector(0, (mouseY - height) * -0.003);
  	this.w = 30;
    this.t = 0;
    this.op = 250;
  }
  
  update() {

    this.vel.add(this.acc);
    this.vel.mult(0.99);
    // this.vel.mult(height - mouseY);
    this.pos.add(this.vel);
    
    
  }
  
  
  checkEdges() {
    if (this.pos.x > width || this.pos.x < 0 ) {
      
      this.vel.x *= -1;
      
    }

    
    if (this.pos.y > height || this.pos.y < 0 ) {
      if (this.pos.y > height){
        this.pos.y = height;
      }
      
      this.vel.y *= -0.9;
      this.op = this.op -1;
      
    }

   }

  
  display() {
    fill(255,180,55,this.op );
    stroke(0,this.op);
	ellipse(this.pos.x, this.pos.y, this.w);
  }
}