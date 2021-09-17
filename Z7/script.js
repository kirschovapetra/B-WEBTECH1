var token = 'pk.eyJ1IjoicGV0cmFraXJzY2hvdmEiLCJhIjoiY2s0MXU5eTZkMDR1ODNtbzR1OXFmcDkxOSJ9.g4qETiZrfPjHolkQ4KkFgw';
var attrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

var customMap;
var wayPoints;

var source;
var destination = L.latLng(48.152666, 17.073285);


var tramIcon = L.icon({
	iconUrl: 'images/tram.png',
	iconSize:     [35, 50]
});
var busIcon = L.icon({
	iconUrl: 'images/bus.png',
	iconSize:     [35, 50]
});
var schoolIcon = L.icon({
	iconUrl: 'images/school.png',
	iconSize:     [50, 50]
});

var control;

var geoCoder = new L.Control.Geocoder.Nominatim();
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+token, {id: 'mapbox/streets-v11', attribution: attrib});
var satellite   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+token, {id: 'mapbox/satellite-v9', attribution: attrib});

//pridanie markerov
function addMarkers(){
	L.marker([48.15269, 17.073087], {icon: schoolIcon}).addTo(customMap)
		.bindPopup("<b>Slovenská technická univerzita</b><br />Fakulta elektrotechniky a informatiky").openPopup();
	L.marker([48.154594, 17.074572], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Zoo</b><br>Autobusy:<br>31, 39, N31, X31");
	L.marker([48.15428, 17.07511], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Zoo</b><br>Autobusy:<br>31, 39, N31, X31");
	L.marker([48.15432, 17.07578], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Zoo</b><br>Autobusy:<br>30, 32, 37, 92, 192, N29");
	L.marker([48.154133, 17.076875], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Zoo</b><br>Autobusy:<br>30, 32, 37, 92, 192, N29");

	L.marker([48.14833, 17.0721], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Botanická záhrada</b><br>Autobusy:<br>29, 32, N29, N33, N34");
	L.marker([48.14810, 17.07229], {icon: busIcon}).addTo(customMap)
		.bindPopup("<b>Botanická záhrada</b><br>Autobusy:<br>29, 32, N29, N33, N34");
	L.marker([48.14822, 17.07213], {icon: tramIcon}).addTo(customMap)
		.bindPopup("<b>Botanická záhrada</b><br>Električky:<br>X6");
	L.marker([48.14812, 17.07244], {icon: tramIcon}).addTo(customMap)
		.bindPopup("<b>Botanická záhrada</b><br>Električky:<br>X6");
}

//pridanie oznacenia blokov cez GeoJSON
function addBlocks(){
	var blockA = {
		"type": "Feature",
		"properties": {
			"popupContent": "Blok A",
			"style": {
				weight: 2,
				color: "#999",
				opacity: 1,
				fillColor: "#B0DE5C",
				fillOpacity: 0.8
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[17.07256,48.151818],
					[ 17.072567, 48.151969],
					[17.073859, 48.151951],
					[17.073891, 48.151822]

				]
			]
		}
	};
	var blockB = {
		"type": "Feature",
		"properties": {
			"popupContent": "Blok B",
			"style": {
				weight: 2,
				color: "#999",
				opacity: 1,
				fillColor: "#B0DE5C",
				fillOpacity: 0.8
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[17.073001, 48.152334],
					[17.073011, 48.152462],
					[17.074347, 48.152459],
					[17.074353, 48.152323]

				]
			]
		}
	};
	var blockC = {
		"type": "Feature",
		"properties": {
			"popupContent": "Blok D",
			"style": {
				weight: 2,
				color: "#999",
				opacity: 1,
				fillColor: "#B0DE5C",
				fillOpacity: 0.8
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[17.072819,48.152827],
					[ 17.072828, 48.152971],
					[17.073876, 48.15296],
					[17.073869, 48.152831]

				]
			]
		}
	};
	var blockD = {
		"type": "Feature",
		"properties": {
			"popupContent": "Blok C",
			"style": {
				weight: 2,
				color: "#999",
				opacity: 1,
				fillColor: "#B0DE5C",
				fillOpacity: 0.8
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[17.073199, 48.153332],
					[17.073199, 48.153472],
					[17.074353, 48.153468],
					[17.074358, 48.153336]

				]
			]
		}
	};
	var blockE = {
		"type": "Feature",
		"properties": {
			"popupContent": "Blok C",
			"style": {
				weight: 2,
				color: "#999",
				opacity: 1,
				fillColor: "#B0DE5C",
				fillOpacity: 0.8
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[17.072826, 48.153826],
					[17.07282, 48.153976],
					[17.073888, 48.153966],
					[17.073883, 48.15383]

				]
			]
		}
	};

	L.geoJSON(blockA).addTo(customMap).bindPopup("<b>Blok A</b><br>Ústav jadrového a fyzikálneho inžinierstva, <br>Inštitút komunikácie a aplikovanej lingvistiky");
	L.geoJSON(blockB).addTo(customMap).bindPopup("<b>Blok B</b><br>Ústav elektrotechniky, <br>Ústav multimediálnych informačných a komunikačných technológií");
	L.geoJSON(blockC).addTo(customMap).bindPopup("<b>Blok C</b><br>Ústav informatiky a matematiky, <br>Ústav elektroenergetiky a aplikovanej elektrotechniky");
	L.geoJSON(blockD).addTo(customMap).bindPopup("<b>Blok D</b><br>Ústav automobilovej mechatroniky, <br>Ústav robotiky a kybernetiky");
	L.geoJSON(blockE).addTo(customMap).bindPopup("<b>Blok E</b><br>Ústav elektroniky a fotoniky");
}

function createMap(){
	customMap = L.map('mapid').setView([48.151965, 17.072995], 15);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='+token, {
		attribution: attrib,
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		//router: L.Routing.mapbox(token),
		accessToken: token,
		layers: [streets, satellite]
	}).addTo(customMap);

	var baseMaps = {
		"Streets": streets,
		"Satellite": satellite
	};

	L.control.layers(baseMaps).addTo(customMap);

    addMarkers();
    addBlocks();
}

function findRoute(){
	var addressInput = document.getElementById("address-input").value;

	if (addressInput==undefined || !addressInput){
		return;
	}

	geoCoder.geocode(addressInput, function(results) {
		source = L.latLng(results[0].center.lat, results[0].center.lng);
		wayPoints = [source, destination];

		if (control) {
			control.remove();
		}

		control = L.Routing.control({
			waypoints: wayPoints,
			geocoder: L.Control.Geocoder.nominatim()
		}).addTo(customMap)
			.on('routingerror', function(e) {
				try {
					customMap.getCenter();
				} catch (e) {
					customMap.fitBounds(L.latLngBounds(wayPoints));
				}
			});
	});
}

