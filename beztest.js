function setup() {
  createCanvas(800, 500);
 }

 function draw() {
 	  background(220);
	  noFill();
	  stroke(0);
	  strokeWeight(4);

let x = 50;
let y = 200;
beginShape();
vertex(x,y);
bezierVertex(x + 133, y + 79,
x + 250, y + 100,
x + 300, y + 0)
bezierVertex(x + 250, y + (y - 300),
x + 133, y + (y - 279),
x, y);
endShape();


 }