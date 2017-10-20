// Burger menu
$('#burger_icon, .close').on('click',function(){
   $('.menuburger').toggleClass('open');
}); 

// Effet barre défilante
/*$(function() {
    var header = $("#navbar_social");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 200) {
            header.css('top', '59px') ;
        } else {
            header.css('top', '541px');
        }
    });
}); */

// Carousel
 $(document).ready(function() {
    $('.carousel').carousel({
      interval: 3000
    })
  });



