const { GestureDescription, Finger, FingerCurl } = fp;

// create new gesture with id "rock"
const RockGesture = new GestureDescription('rock');

// all fingers must be curled
RockGesture.addCurl(Finger.Index, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Middle, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Ring, FingerCurl.FullCurl);
RockGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl);

// thumb can be either stretched out or half curled
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl);
RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);