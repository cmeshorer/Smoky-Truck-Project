// Burger menu
$('#burger_icon, .close').on('click',function(){
   $('.menuburger').toggleClass('open');
}); 

// Effet menu scroll
/*var scrollTop = 0;
$(window).scroll(function(){
  scrollTop = $(window).scrollTop();
  if (scrollTop >= 200) {
    $('#navbar').addClass('scrolled-nav');
    $('#menu li a').css('color', '#b3b3b3');
    $('#menu .navactive').css('color', 'white');
    $("#logo1").css("display", "none");
    $("#logo2").css("display", "none");
    $("#scrolled_logo").css("display", "block");
  } else if (scrollTop < 200) {
    $('#navbar').removeClass('scrolled-nav');
    $('#menu li a').css('color', '#012051');
    $("#logo1").css("display", "block");
    $("#logo2").css("display", "block");
    $("#scrolled_logo").css("display", "none");
    $('#menu .navactive').css('color', '#b3b3b3');
  } 
}); */

$(window).scroll(function(){
  scrollTop = $(window).scrollTop();
  if (scrollTop >= 200) {
    $('header').css('opacity', 0.8);
  } else if (scrollTop < 200) {

  }

// Carousel
 $(document).ready(function() {
    $('.carousel').carousel({
      interval: 3000
    })
  });


