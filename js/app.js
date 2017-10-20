// Burger menu
$('#burger_icon, .close').on('click',function(){
   $('.menuburger').toggleClass('open');
}); 

// Effet menu scroll
var scrollTop = 0;
$(window).scroll(function(){
  scrollTop = $(window).scrollTop();
  if (scrollTop >= 200) {
    $('#navbar').addClass('scrolled-nav');
    $('#menu li a').css('color', '#b3b3b3');
    $('#menu .navactive').css('color', 'white');
    $('nav img').attr('src', 'img/smoky_logo_scrolled.svg');
  } else if (scrollTop < 200) {
    $('#navbar').removeClass('scrolled-nav');
    $('#menu li a').css('color', '#012051');
    $('#menu .navactive').css('color', '#b3b3b3');
    $('nav img').attr('src', 'img/smoky_logo.svg');
  } 
}); 

// Carousel
 $(document).ready(function() {
    $('.carousel').carousel({
      interval: 3000
    })
  });


