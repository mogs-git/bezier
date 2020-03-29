// bezier curve demo. drag the anchor/control points.
const main = document.getElementById("main");
const desc = document.getElementById("desc");
let code_desc = document.createElement("p");
let pts = [];

function setup (){
  let canvas = createCanvas(800, 500);

  canvas.parent('sketch-holder');

  pts = [
    createVector(50, 200),
    createVector(100, 300),
    createVector(300, 300),
    createVector(350, 200)
  ];
  checkbox = createCheckbox('Mirror bezier control points', false);
}

function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(4);

  beginShape();
  vertex(pts[0].x, pts[0].y);

  bezierVertex(
         pts[1].x, pts[1].y,
         pts[2].x, pts[2].y,
         pts[3].x, pts[3].y);

  if (checkbox.checked()) {
        pts_mirror = [];

    for (let i = pts.length-2; i > 0; i--) {
      pts_mirror.push(createVector(pts[i].x, pts[0].y+(pts[0].y - pts[i].y)));
    }
    pts_mirror.push(pts[0])

    bezierVertex(
           pts_mirror[0].x, pts_mirror[0].y,
           pts_mirror[1].x, pts_mirror[1].y,
           pts_mirror[2].x, pts_mirror[2].y);

  }
  endShape();

  noStroke();
  fill(255);
  for (let pt of pts) {
    fill("red");
    ellipse(pt.x, pt.y, 20, 20);
  }

  if (checkbox.checked()) {
    for (let pt of pts_mirror) {
      fill(255); 
      ellipse(pt.x, pt.y, 20, 20);
    }
  }

  if (mouseIsPressed) {
    for (let pt of pts) {
      if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
        pt.x = mouseX;
        pt.y = mouseY;
        break;
      }
    }
  }
  
  noStroke();
  fill(0);
  textSize(12);
  text("bezier curve demo / drag the handles to change the curve", 4, height-4);
  code_desc.textContent = String("Code to produce bezier: \n" +
    "let x = "+pts[0].x+";\n let y = "+pts[0].y+";\n"+
    "beginShape();\n" +
    "vertex(x,y);\n"+
    "bezierVertex("+"x + " + (pts[1].x-pts[0].x)+", y + "+(pts[1].y-pts[0].y)+",\n"+
    "x + " + (pts[2].x-pts[0].x) + ", y + "+(pts[2].y-pts[0].y)+",\n"+
    "x + " + (pts[3].x-pts[0].x) + ", y + "+(pts[3].y-pts[0].y)+")\n"+ ((checkbox.checked() == true) ? ("bezierVertex(x + "+(pts[2].x-pts[0].x)+", y + (y - "+ Math.round((pts[2].y), 1) +"),\n"+
    "x + " + (pts[1].x-pts[0].x)+", y + (y - "+ Math.round((pts[1].y), 1)+"),\n"+
    "x, y);\n" +"endShape();") : "endShape();"));


  text("x: " + String(pts[0].x), pts[0].x, pts[0].y);
  text("y: " + String(pts[0].y), pts[0].x, pts[0].y+10);
  for (let i = 1; i < pts.length; i++) { 
    text("x: " + String(Math.round(pts[i].x-pts[0].x, 1)), pts[i].x, pts[i].y);
    text("y: " + String(Math.round(pts[i].y-pts[0].y, 1)), pts[i].x, pts[i].y+10);
  }
  if (checkbox.checked()) {
      for (let i = 0; i < pts_mirror.length-1; i++) {
    text("x: " + String(pts_mirror[i].x-pts[0].x), pts_mirror[i].x, pts_mirror[i].y);
    text("y: " + String(Math.round(pts_mirror[i].y-pts[0].y, 1)), pts_mirror[i].x, pts_mirror[i].y+10);
  }
  }
}

let intro = document.createElement("p");
intro.textContent = "Ever wanted to make a bezier curve in processing but not know what coordinates to use to get the curve you want?\n" +
"Well here is my solution: make the curve by moving the control points, then this tool prints the code to produce the bezier curve you just made,\n"+
"The code is designed to give a Bezier relative to a desired start point, so you can position instances of the Bezier curve dynamically.\n" +
"This was inspired by me trying to make leaves for https://mogs-git.github.io//perlin_vine/"
desc.appendChild(intro);
desc.appendChild(code_desc);

let acknowledgement = document.createElement("p");
acknowledgement.textContent = "This tool is largely based on a p5.js sketch by Allison Parrish at https://www.decontextualize.com/, which can be found here https://editor.p5js.org/allison.parrish/sketches/H1QQ3Nt67";
desc.appendChild(acknowledgement);