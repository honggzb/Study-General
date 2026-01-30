var flight_points = [
	{
		"name" : "Vienna",
		"lat" : 48.197263, 
		"lon" : 16.391724
	},
	{
		"name" : "Scotland",
		"lat" : 55.933125, 
		"lon" : -3.787912
	},
	{
		"name" : "Vienna",
		"lat" : 48.197263, 
		"lon" : 16.391724
	},
	{
		"name" : "Stockholm",
		"lat" : 59.323965, 
		"lon" : 18.071310
	},
	{
		"name" : "Lofoten",
		"lat" : 68.446253, 
		"lon" : 14.909798
	},
	{
		"name" : "Stockholm",
		"lat" : 59.323965, 
		"lon" : 18.071310
	},
	{
		"name" : "Slovakia",
		"lat" : 49.215660,
		"lon" :  18.721484
	},
	{
		"name" : "Romania",
		"lat" : 45.651977, 
		"lon" : 25.612940
	},
	{
		"name" : "Bulgaria",
		"lat" : 42.144100, 
		"lon" : 24.718899
	},
	{
		"name" : "Albania",
		"lat" : 42.450599,
		"lon" : 19.889063
	},
	{
		"name" : "Montenegro",
		"lat" : 42.423035, 
		"lon" : 18.770391
	},
	{
		"name" : "Slovakia",
		"lat" : 49.215660,
		"lon" :  18.721484
	},
	{
		"name" : "Florida",
		"lat" : 25.766849, 
		"lon" : -80.206630
	},
	{
		"name" : "Lima",
		"lat" : -12.010380, 
		"lon" : -77.092202
	},
	{
		"name" : "La Paz",
		"lat" : -18.191219, 
		"lon" : -65.432876
	},
	{
		"name" : "Cusco",
		"lat" : -13.545364, 
		"lon" : -71.966375
	},
	{
		"name" : "Huaraz",
		"lat" : -9.522837, 
		"lon" : -77.530068
	},
];

function make_flight_data(flight_points){	
	var coors = [];
	
	for(var i=0, len=flight_points.length-1; i<len; i++){
	
		coors.push([flight_points[i].lon, flight_points[i].lat ]);

	}
	// (note: loop until length - 1 since we're getting the next
    //  item with i+1)
    var flight_paths = {
            type: "LineString",
            coordinates: coors
        };
	
	return flight_paths;

}

var flight_paths = make_flight_data(flight_points);
