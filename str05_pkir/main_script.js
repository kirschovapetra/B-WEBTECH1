var min,max,worker;
var primes = new Array();

function clear(){
    document.getElementById("progress-indicator").width = "0.5%";
    document.getElementById("primes-textarea").innerHTML = "";
}

//info o stave vypoctu
function moveProgressIndicator(number){
    var progressIndicator = document.getElementById("progress-indicator");
    var barWidth = Math.round((number - min) / (max - min) * 100);

    document.getElementById("progress").innerHTML = barWidth+ "%";
    progressIndicator.style.width = barWidth+ "%";
}

//nacitanie minima a maxima
function loadInput() {
    var tmpMin = parseInt(document.getElementById("min").value);
    var tmpMax = parseInt(document.getElementById("max").value);

    if (tmpMin==NaN || tmpMax==NaN){
        min=0;
        max=0;
    }

    min = (tmpMin <= tmpMax) ? tmpMin : tmpMax;
    max = (tmpMin > tmpMax) ? tmpMin : tmpMax;
}

function receiveMessage(event){
     document.getElementById("primes-textarea").innerHTML = primes;

    if(event.data == null){
        stopWebWorker();
        moveProgressIndicator(max);
    }
    else{
        primes.push(event.data);
        moveProgressIndicator(event.data);
    }
}

function setButtonState(isEnabled){
    var button = document.getElementById("startButton");
    button.enabled = isEnabled;
    if (!isEnabled) {
        button.style.opacity="0.6";
    }
    else {
        button.style.opacity="1";
    }
}

function startWebWorker() {
    clear();
    loadInput();
    setButtonState(false);

    if (typeof(Worker) == "undefined") {
        alert("WebWorker nie je podporovaný vaším prehliadačom.");
    }
    else {
        if(typeof(worker) == "undefined") {
            worker = new Worker("primes_script.js");
            worker.postMessage(
                {
                    start: min,
                    end: max
                }
            );
        }
        worker.onmessage = receiveMessage;
    }
}

function stopWebWorker() {
    primes = [];
    worker.terminate();
    worker = undefined;
    setButtonState(true);
}

