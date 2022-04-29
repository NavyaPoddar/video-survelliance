carvideo = "";
cocossd = "";
modelstatus = "";
results = [];

function preload() {
    carvideo = createVideo("video.mp4");
    carvideo.hide();
}


function setup() {
    canvas = createCanvas(500, 350);
    canvas.center();
}

function draw() {
    image(carvideo, 0, 0, 500, 350);
    if (modelstatus != "") {
        cocossd.detect(carvideo, getresults);
        for (loopvalue = 0; loopvalue < results.length; loopvalue = loopvalue + 1) {
            object_name = results[loopvalue].label;
            object_x = results[loopvalue].x;
            object_y = results[loopvalue].y;
            object_width = results[loopvalue].width;
            object_height = results[loopvalue].height;
            fill("purple");
            stroke("purple");
            text(object_name, object_x + 15, object_y + 15);
            stroke("pink");
            noFill();
            rect(object_x, object_y, object_width, object_height);
            document.getElementById("modelstatus_tag").innerHTML = "Objects Detected"

        }
    }
}

function startapp() {
    cocossd = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("modelstatus_tag").innerHTML = "Status: Detecting Objects..."
}

function modelloaded() {
    console.log("model has loaded");
    modelstatus = true;
    carvideo.loop();
    carvideo.volume(0);
    carvideo.speed(1);
}

function getresults(error, resultsarray) {
    if (error) {
        console.error(error);
    } else {
        console.log(resultsarray);
        results = resultsarray;
    }
}