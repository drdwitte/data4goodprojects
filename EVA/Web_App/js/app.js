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
	"jqueryUI":	"../../external/jquery-ui/jquery-ui.min",
	//"datatables":	"../../external/DataTables/datatables.min"
    }
});

// Start the main app logic.
requirejs(['jquery','leaflet','d3', "jqueryUI", /*'datatables' ,*/ 'app/helper'],
function ($, L, d3){
		

	var map;	

	function drawMap(){

		console.log('drawmap');
		
		mapcont = $('<div id="mapcontainer" style="width: 1400px; height: 500px"></div>');
		$('#map').append(mapcont)

		var center = {lat:51.05, lng:4.20};
		var zoom = 9;	
		map = L.map('mapcontainer', {
	    	center: center,
	    	zoom: zoom,
	    
		});	

		
		//$('#map').empty();

		

		base = createBaseLayer();
		base.addTo(map);

		var ALL = "All";

		eva_tags = ["Eethuis", "EVA voordeel", "100% vegetarisch", "Snack", "Cateraar", "Approved by EVA", "Veganvriendelijk", 
		"100% plantaardig", "Gastronomisch", ALL];
		
		var eva_layers = createLayersForTags(eva_tags);

		for (t in eva_layers){
			eva_layers[t].addTo(map);
		}
	
		L.control.layers(eva_layers,[]).addTo(map);

	 	d3.json('data/restodata.json', function(data){
	 		console.log(data.length);

	 		//stats1 = {};
	 		//stats2 = {};
	 		//console.log(data[0].tags);

	 		for (var i=0; i<data.length; i++){
	 		
	 			var desc = "<p> " + data[i].name + "</p>"  + "<p> " + data[i].street + " " + data[i].zip + " " + data[i].city +   "</p>";
	 			var lat = data[i].lat;
	 			var lon = data[i].lon;


	 			var tags = data[i].tags;

	 			tags.forEach(function(el){
	 				addMarkerToGroup(lat,lon,desc,eva_layers[el]);
	 			});
	 			addMarkerToGroup(lat,lon,desc,eva_layers[ALL]);

	 			/*prov = Math.floor(parseInt(data[i].zip)/1000);
	 			reg = Math.floor(parseInt(data[i].zip)/100);

	 			incMapValue(stats1,prov,1);
				incMapValue(stats2,reg,1);*/
	 		}

	 		/*console.log(stats1);
	 		console.log(stats2);


	 		row_bi1 = createCanvasRow("body div#bi1",1,2,row);
	 		row_bi2 = createCanvasRow("body div#bi2",1,1,row);

	 		stats1_f = filterFreqTable(stats1,5)
	 		stats1_ren = renameKeys(stats1_f, ['Brussel','Antwerpen','Limburg/Vlaams-Brabant','West-Vlaanderen','Oost-Vlaanderen'])
	 		stats2_f = filterFreqTable(stats2,2)

	 		visualize_ordlin(stats1_ren,  row_bi1[0], "Veggie locations per province");
	 		visualize_ordlin(stats2_f,  row_bi2[0], "Veggie locations per region");
			*/

			





 		});
	};

	drawMap();

	$('#draw_circle').on('click', function(){
		alert('You clicked "Draw Region"');

		var lat = parseFloat($('input#lat').val());
		var lon = parseFloat($('input#lon').val());

		lat_radius = 1000*parseFloat($('input#rad').val());
		//radius = lat_radius * 110.574;
		var circle = L.circle([lat, lon], lat_radius, {
					color: 'red',
					fillColor: 'green',
					fillOpacity: 0.5
		}).addTo(map);
	});

	$('#submit_searchaddress').on('click', function(){
		alert('You clicked "Check nearby"');
	});


	$('#submit_searchname').on('click', function(){
		alert('You clicked "Find"');
	});

	$('#reset_map').on('click', function(){
		console.log('reset')
		$('#map').empty();			
		drawMap();
	});

});
	

 

