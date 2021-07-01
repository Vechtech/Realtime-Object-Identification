status = "";
objects = [];

function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(450, 200);
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "status:detecting object";
}

function modelloaded() {
    console.log("model has been loaded successfully");
    status = true;
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 600, 400);

    if (status != "") {
        object_detector.detect(video, gotresults);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("noo").innerHTML = "no. of objects dected are " + objects.length;
            document.getElementById("status").innerHTML = "status: objects detected";
            obj_name = (objects[i].label).toUpperCase();
            per = floor(objects[i].confidence * 100);
            pos_x = objects[i].x;
            pos_y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;

            fill("lime");
            textSize(22);
            text(obj_name + " " + per + " %", pos_x + 15, pos_y + 30);
            noFill();
            stroke("red");
            rect(pos_x, pos_y, width, height);
        }
    }
}