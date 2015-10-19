function initMap() {
	var mapCanvas = document.getElementById('map');
	var mapOptions = {
		zoom: 15, // уровень приближения
		center: {lat: 49.9933, lng: 36.2375},
		mapTypeId: google.maps.MapTypeId.ROADMAP, // тип карты ROADMAP, SATELLITE, HYBRID или TERRAIN
		//disableDefaultUI: true,
		// или
		mapTypeControl: false, // переключатель типа карты - ROADMAP, SATELLITE, HYBRID или TERRAIN
		streetViewControl: false, // человечек
		panControl: false, // круг с позиционированием
		zoomControl: false,
		scrollwheel: false, // ползунок для масштабирования
		scaleControl: false // шкала масштаба
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	// стилизируем карту. https://snazzymaps.com/
	map.set('styles', 
		[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
	);

// Маркер
	var marker = new google.maps.Marker({
	map: map,
		// Define the place with a location, and a query string.
		place: {
			location: {lat: 49.9933, lng: 36.2375},
			query: 'Строка для определения'
		}
	});

	// Construct a new InfoWindow.
	var infoWindow = new google.maps.InfoWindow({
		content: 'Hello my friends :)'
	});

	// Opens the InfoWindow when marker is clicked.
	marker.addListener('click', function() {
		infoWindow.open(map, marker);
	});
}


// Загружаем карту
google.maps.event.addDomListener(window, 'load', initLibs);


function initLibs(){
	initMap();
	/* id - id of element that should be animated
* radius - radius of the circle 
* color - color of the circle
* quart - start position
*/
runCircle({id:'myCanvas',radius:92,endPercent: 15,lineWidth:16, color:'#81c2d6',quart:-2});
runCircle({id:'myCanvas1',radius:117,endPercent: 77,lineWidth:16,color:'#f0dc6d',quart:-2});

runCircle({id:'myCanvas2',radius:90,endPercent: 25,lineWidth:16, color:'#81c2d6',quart:-2});
runCircle({id:'myCanvas3',radius:117,endPercent: 25,lineWidth:16,color:'#f0dc6d',quart:-2});

runCircle({id:'myCanvas4',radius:90,endPercent: 75,lineWidth:16, color:'#81c2d6',quart:-2});
runCircle({id:'myCanvas5',radius:117,endPercent: 15,lineWidth:16,color:'#f0dc6d',quart:-2});
}
// requestAnimationFrame Shim
(function() {
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;
})();


function runCircle(options){
var canvas = document.getElementById(options.id);
var context = canvas.getContext('2d');
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = options.radius;
var endPercent = options.endPercent;
var curPerc = 0;
var counterClockwise = false;
var circ = Math.PI * 2;
var quart = Math.PI / options.quart;

context.lineWidth = options.lineWidth;
context.strokeStyle = options.color;


function animate(current) {
context.clearRect(0, 0, canvas.width, canvas.height);
context.beginPath();
context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
context.stroke();
curPerc++;
if (curPerc < endPercent) {
requestAnimationFrame(function () {
animate(curPerc / 100)
});
}
}
animate();
}
