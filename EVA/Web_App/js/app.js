requirejs.config({

    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',

    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        "app": 		"../app",
	"jquery":	"//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min",
	"leaflet":	"../../external/leaflet/leaflet",
	"d3":		"d3.min",
	"datatables":	"../../external/DataTables/datatables.min"
    }
});

// Start the main app logic.
requirejs(['jquery','leaflet','d3', 'datatables' , 'app/helper'],
function ($, L, d3){

	var attributionString = '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">';
	var subdomainsToQuery = ['otile1','otile2','otile3','otile4'];


	var center = {lat:51.10, lng:4.20};
	var zoom = 9;	
	var map = L.map('map').setView([center.lat, center.lng], zoom);

	var s1 = 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png'; //map
	var s2 = 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png'; //satellite
			
	var mapLayer = L.tileLayer( s1 , 
		{ 
			attribution: attributionString,
			subdomains: subdomainsToQuery
		});
	var satelliteLayer = L.tileLayer( s2 , 
		{ 
			attribution: attributionString,
    			subdomains: subdomainsToQuery
		});
	//map.addLayer(satelliteLayer);
	map.addLayer(mapLayer);

	addMarkerToMap(51.053905	, 3.722943	, 'Gent'		, map);
	addMarkerToMap(51.02778		, 4.48111	, 'Mechelen'	, map);

	addMarkerToMap(51.2192		, 4.4029	, 'Antwerpen'	, map);
	addMarkerToMap(50.9333 		, 5.3333	, 'Hasselt'		, map);
 	addMarkerToMap(50.85		, 2.7167	, 'Poperinge'	, map); 

 	d3.csv('data/restaurants.csv', function(data){
 		console.log(data.length);
 		var latlon = parseLatLon(""+data[0].latlon);
 		console.log(latlon);



 	})

	

	


});


 

