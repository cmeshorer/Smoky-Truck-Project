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



 //Contact form validator
// Wait for the DOM to be ready

/*$(documt).ready(function() {
  $('#contact_name').on('input', function(){
    var input = $(this);
    var is_name = input.val();
    if (is_name){input.removeClass("invalid").addClass("valid");}
    else {input.removeClass("valid").addClass("invalid");}
  });
  $('#contact_email').on('input', function(){
    var input=$(this);
    var re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    var is_email=re.test(input.val());
    if (is_email){input.removeClass("invalid").addClass("valid");}
    else {input.removeClass("valid").addClass("invalid");}
  });
  $('#contact_message').keyup(function(event) {
  var input=$(this);
  var message=$(this).val();
  console.log(message);
  if(message){input.removeClass("invalid").addClass("valid");}
  else{input.removeClass("valid").addClass("invalid");} 
});

  $("#contact_submit button").click(function(event){

    var form_data=$("#contact").serializeArray();
  var error_free=true;
  for (var input in form_data){
    var element=$("#contact_"+form_data[input]['name']);
    var valid=element.hasClass("valid");
    var error_element=$("span", element.parent());
    if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
    else{error_element.removeClass("error_show").addClass("error");}
  }
  if (!error_free){
    event.preventDefault(); 
  }
  else{
    alert('No errors: Form will be submitted');
  }
}); 

});*/



