
$(document).ready(function(){

let getWeather = function(city){
		return new Promise(function(resolve, reject){
			$.ajax({
				method: 'GET',
				url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cf345f08ce8bcecdc736efbcdd696de`
			}).done(function(data){
				resolve(data);
			}).fail(function(error){
				reject(error);
			});
		});
	}

     $('#weather').on('click', function(ev){
     
     	const city = $('#city').val();

		getWeather(city).then(function(data){
	        $('#Weather').html(`<div><h3 class="whitetext">${city}</h3> temperature: ${Math.round(data.main.temp - 273.15)}&#176;<br />humidity: ${data.main.humidity}%</div>`);
		}).catch(function(error){
			 console.log('Error')

			 		switch(error.status){
                           case 400: $('#Weather').html('<h3 style="color:red;">Error! Check city name!</h3>');break;
                           case 404: $('#Weather').html('<h3 style="color:brown;">Error! Check city name!</h3>');break;
                           
			 		}
		});    
 	});

     $("#city").on('keypress' , function(ev) {
	         if (ev.keyCode === 13){
	         	 $('#weather').trigger('click');
	         }
	}); 

	});