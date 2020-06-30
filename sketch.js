var canvas;
var database;
var linedraw=[];
var currentPath=[];
var isDrawing= false;
var clearButton;

function setup(){
    canvas = createCanvas(500,500);
    canvas.parent('canvascontainer');
    database = firebase.database();
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    clearButton= select('clearButton');
    clearButton.mousePressed(clearDrawing);
}

function startPath(){
    currentPath=[];
    linedraw.push(currentPath);
    isDrawing= true;
}

 function endPath(){
    isDrawing= false;
 }
function draw(){
backgound(0);

if(isDrawing){
    var point={
        x:mouseX,
        y:mouseY
    }
    currentPath.push(point);
}

stroke(255);
strokeWeight(4);
Fill("red");
for(var i=0; i<linedraw.length; i++){
    path= linedraw[i];
    beginShape();
    for(var j =0; j< path.length; j++){
        vertex(path[j].x, path[j].y);
    }
    endShape();
}

}

function clearDrawing(){
    var ref= database.ref("drawings");
    var data={
        drawing: linedraw
    }
    ref.pop(drawing);
}