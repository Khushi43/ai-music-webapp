song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scorerightwrist = 0;
scoreleftwrist = 0;

rightwristx = 0;
rightwristy = 0;

leftwristx = 0;
leftwristy = 0;



function preload(){
    
    song1 = loadSound("music.mp3");
    song2 = loadSound("Hedwigs Theme.mp3");

    
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[9].score;

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx +"leftwristy = "+ leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = "+ rightwristx +"rightwristy = "+ rightwristy);
    }
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("FF0000");
    stroke("FF0000");

    if(scoreleftwrist > 0.2){
    circle(leftwristx, leftwristy, 20);

    song1.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Playing Harry potter theme song ";
    }
    }

    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
    
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing peter pan song ";
        }
        }

}

function Play(){
    song.play();

    song.setVolume(1);
    song.rate(1);
}