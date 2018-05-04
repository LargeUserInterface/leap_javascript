// Store frame for motion functions
var previousFrame = null;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var colorMap = ["red", "blue", "green", "black", "purple"]
var lastThreePositions = [0, 1, 2]
var tempPositions = [0, 1, 2, 3, 4]
var counter = 0
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
          lastThreePositions[counter % 3] = tempPositions;
          counter += 1;
          console.log(lastThreePositions)
}, 1000);