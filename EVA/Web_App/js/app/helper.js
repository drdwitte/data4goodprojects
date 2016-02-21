function addMarkersToMap(datapoints, map){

	for ( var i=0; i < datapoints.length; ++i )
	{

	   	L.marker( [datapoints[i].Lattitude, datapoints[i].Longitude] )
	      	.bindPopup(datapoints[i].Description)
	      	.addTo(map);
	}
}

function addMarkerToMap(lat, lon, desc, map){

	L.marker( [lat,lon])
	.bindPopup(desc)
	.addTo(map);
	
}

function parseLatLon(strTuple){

	console.log(strTuple)
	var parts  = strTuple.substr(1,strTuple.length()-1).split(',');
	console.log(parts)
	var latlon = {
		'lat'	: parts[0],
		'lon'	: parts[1]
	}	
 
	return latlon;






}
