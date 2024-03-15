function preload() {
    alarm = loadSound("alarm.mp3");
}
status = "";
img = "";
obj = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide();
    o_d = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        o_d.detect(video, getResults);
        for (i = 0; i < obj.length; i++) {
            obj_name = obj[i].label;
            obj_con = floor(obj[i].confidence * 100);
            obj_x = obj[i].x;
            obj_y = obj[i].y;
            obj_width = obj[i].width;
            obj_height = obj[i].height;
            if (obj_name == "person") {
                document.getElementById("status").innerHTML = "status: baby found";
                alarm.stop();
            } else {
                document.getElementById("status").innerHTML = "status: baby not found";
                alarm.play();
            }
        }
        if (obj.length == 0) {
            document.getElementById("status").innerHTML = "status: baby not found";
            alarm.play();
        }
    }
}

function modelLoaded() {
    status = true;
    document.getElementById("status").innerHTML = "Status : object detection started";
}

function getResults(e, r) {
    if (e) {
        console.error(e);
    } else {
        console.log(r);
        obj = r;
    }
}