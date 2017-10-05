// Burger menu
$('#burger_icon, .close').on('click',function(){
   $('.menuburger').toggleClass('open');
}); 

// Effet barre défilante
$(document).ready(function(){
  $('#navbar_social').slideDown();
});