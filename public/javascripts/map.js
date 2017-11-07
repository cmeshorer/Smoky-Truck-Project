var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 48.873,
			lng: 2.358
		},
		zoom: 13
	});
}



function initMap() {

var adresse1 = {
		info: '<strong>Smoky Rive Droite</strong><br>\
					4 Rue Eugène Spuller<br> Paris, 75003<br>\
					<a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
		lat: 48.864,
		long: 2.362
	};

var adresse2 = {
		info: '<strong>Smoky Rive Gauche</strong><br>\
					11 Rue de Poissy<br> Paris, 75005<br>\
					<a href="https://goo.gl/maps/ZYHjd6tngxK2">Get Directions</a>',
		lat: 48.849,
		long: 2.352
	};

	var adresse3 = {
		info: '<strong>Smoky 104</strong><br>\r\
					104 Rue dAuberviliers<br> Paris 75019<br>\
					<a href="https://goo.gl/maps/UYMHaC1NWWq">Get Directions</a>',
		lat: 48.890,
		long: 2.368
	};

var locations = [
      [adresse1.info, adresse1.lat, adresse1.long, 0],
      [adresse2.info, adresse2.lat, adresse2.long, 1],
      [adresse3.info, adresse3.lat, adresse3.long, 2],
    ];

var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(48.873, 2.358),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

var infowindow = new google.maps.InfoWindow({});


	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}

}
