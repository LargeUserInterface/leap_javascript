// Store frame for motion functions
var previousFrame = null;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var colorMap = ["red", "blue", "green", "black", "purple"];
var lastThreePositions = [0, 1, 2];
var tempPositions = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var counter = 0;
var change = false;

Leap.loop({frameEventName: "animationFrame"}, function(frame) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        frame.pointables.forEach(function(pointable) {

          var position = pointable.stabilizedTipPosition;
          var normalized = frame.interactionBox.normalizePoint(position);

          var x = ctx.canvas.width * normalized[0];
          var y = ctx.canvas.height * (1 - normalized[1]);
          tempPositions[pointable.type] = [x, y]
          ctx.beginPath();
          ctx.fillStyle = colorMap[pointable.type];
          ctx.fillRect(x, y, 20, 20);
        });
        
        
});

setInterval(function() {
          lastThreePositions[counter % 3] = tempPositions.slice();
          counter += 1;
          // console.log(lastThreePositions[0])
          // console.log(lastThreePositions)
          checkMovement(lastThreePositions);
}, 400);

function toggle() {
    var x = document.getElementById("sidebar");
    if (x.style.display === "none") {
        console.log("display");
        x.style.display = "block";
    } else {
        console.log("hide");
        x.style.display = "none";
    }
}

function checkMovement(lastThreePositions) {
    var fingers_one = lastThreePositions[0];
    var fingers_two = lastThreePositions[1];
    var fingers_three = lastThreePositions[2];
    // console.log("This is fingers one", fingers_one)
    // console.log(fingers_one[2][0], " | ", fingers_two[2][0], " | ", fingers_three[2][0])
    for (var i = 0; i < fingers_one.length; i++){
       if(fingers_one[2][0] < fingers_two[2][0] && fingers_two[2][0] < fingers_three[2][0]) {
          toggle();
          console.log("hit");
       }
    }
}