var sinCoords = {
    x: [],
    y: [],
    mode: 'lines',
    line:{
        color:'rgb(255, 0, 0)'
    },
    name: 'Sin'
};
var cosCoords = {
    x: [],
    y: [],
    mode: 'lines',
    line:{
        color:'rgb(0, 0, 255)'
    },
    name: 'Cos'
};
var src;
var isStopped = false;

function plotGraph(){
    var selectedSin = document.getElementById('sin').checked;
    var selectedCos = document.getElementById('cos').checked;

    var layout = {
        title:'Goniometricke funkcie'
    };

    if (selectedSin && selectedCos){
        Plotly.newPlot('graph', [sinCoords, cosCoords],layout);
    }
    else if (selectedSin){
        Plotly.newPlot('graph', [sinCoords],layout);
    }
    else if (selectedCos){
        Plotly.newPlot('graph', [cosCoords],layout);
    }
    else{
        Plotly.newPlot('graph',{
            x: [],
            y: []
        }, layout);
    }
}

function getCoords(){
    if(typeof(EventSource) == "undefined"){
        document.getElementById("graph").innerHTML = "Not supported";
    }
    else{
        src = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
        src.addEventListener("message", function(event){
            var receivedData = JSON.parse(event.data);

            sinCoords.x.push(receivedData.x);
            cosCoords.x.push(receivedData.x);
            sinCoords.y.push(receivedData.y1);
            cosCoords.y.push(receivedData.y2);

            if (!isStopped){
                plotGraph();
                document.getElementById("coords").innerHTML = 'x: '+receivedData.x +' y1:'+ receivedData.y1+' y2:'+ receivedData.y2;
            }
        });
    }
}

function stop(){
    isStopped = true;
}
