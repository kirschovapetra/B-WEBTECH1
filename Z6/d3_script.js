var isStopped = false;
var src;
var receivedData;
var svg;
var sinCoords = [];
var cosCoords = [];
var x_axis,y_axis;

function plotGraph(){
	var selectedSin = document.getElementById('sin').checked;
    var selectedCos = document.getElementById('cos').checked;

	var margin = {top: 50, right: 50, bottom: 50, left: 50};
	var width = 800 - margin.left - margin.right ;
	var height = 400 - margin.top - margin.bottom;
	var trans = height/2+20;

	d3.select("svg").remove();

	svg = d3.select("#graph").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.bottom + margin.top )
		.call(d3.zoom().on("zoom", function () {
			svg.attr("transform", d3.event.transform)
		}));

	x_axis = d3.scaleLinear()
		.range([0, width])
		.domain([0, receivedData.x]);

	y_axis = d3.scaleLinear()
		.range([height, 0])
		.domain([-1.3,1.3]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(50,"+ trans + ")")
		.call(d3.axisBottom(x_axis));

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(50,20)")
		.call(d3.axisLeft(y_axis));

    if (selectedSin && selectedCos){
		plotSin();
		plotCos();
    }
    else if (selectedSin){
		plotSin();
    }
    else if (selectedCos){
		plotCos();
    }
}

function plotSin() {

	var lineSin = d3.line()
		.x(
			function(d, k) {
			return x_axis(k);
			}
		)
		.y(
			function(d) {
			return y_axis(d.y);
			}
		);

		svg.append("path")
			.style("stroke", "rgb(255, 0, 0)")
			.style("fill", "none")
			.datum(sinCoords)
			.attr("class","line")
			.attr("transform", "translate(50,20)")
			.attr("d", lineSin);
}

function plotCos(){
	var lineCos = d3.line()
		.x(function(d, k) {
			return x_axis(k);
		})
		.y(function(d) {
			return y_axis(d.y);
		});

	svg.append("path")
		.style("stroke", "rgb(0, 0, 255)")
		.style("fill", "none")
		.datum(cosCoords)
		.attr("class","line")
		.attr("transform", "translate(50,20)")
		.attr("d", lineCos);
}

function getCoords(){
	if(typeof(EventSource) == "undefined"){
        document.getElementById("graph").innerHTML = "Not supported";
    }
	else{
		src = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
		src.addEventListener("message", function(event) {
			receivedData = JSON.parse(event.data);

			sinCoords[+receivedData.x] = {"y": +receivedData.y1};
			cosCoords[+receivedData.x] = {"y": +receivedData.y2};

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