$(document).ready(function(){ 

$.ajax({ 
     url: "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=db993b31e0525984ac45c7175325d22c", 
	 dataType: 'jsonp', 
     success: function(results) { 
     	$("#temp").html("Temperature: " + Math.floor(results.main.temp_max - 273) + " deg"); 
        $("#percent").html("Humidity: " + results.main.humidity + "%");
     }
    });
});