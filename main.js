status = "";
objects = [];

function setup() {
    canvas = createCanvas(450, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(450, 350);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("word").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw() {
    image(video, 0, 0, 450, 350);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("obn").innerHTML = object_name + " " + "Found";
                synth = window.speechSynthesis;
                uT = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(uT);
            }
            else{
                document.getElementById("obn").innerHTML = object_name + "Not Found";
            }
        }
    }
}