let videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const scoreElement = document.querySelector('#score');
const model = await handpose.load();

async function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0,
        0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx,
                landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
    }
    canvasCtx.restore();
    try {
        let predictions = await model.estimateHands(videoElement, true);
        let estimatedGestures = GE.estimate(predictions[0].landmarks, 8.5);
        console.log(estimatedGestures);
        let score = estimatedGestures.poseData.filter(item => { return item[1] === "No Curl" }).length;
        console.log(score);
        scoreElement.textContent = `${score}`;
    } catch (error) {
        console.log("No hands!!");
        scoreElement.textContent = "0";
    }
}
const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.5, minTrackingConfidence: 0.5 });
hands.onResults(onResults);
const camera = new Camera(videoElement, {
    onFrame: async() => {
        await hands.send({
            image: videoElement
        });
    },
    width: 1280,
    height: 720
});
camera.start();

videoElement = document.getElementsByClassName('input_video')[0];

// add "✌🏻" and "👍" as sample gestures
const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
]);