window.addEventListener("load", function(){
  let editor = theWYSIWYG.document;
  editor.designMode = "on";


  italicButton.addEventListener("click", function(){
    editor.execCommand("Italic", false, null);
  }, false);

  underlinedButton.addEventListener("click", function(){
    editor.execCommand("underline", false, null);
  }, false);

  boldButton.addEventListener("click", function(){
    editor.execCommand("Bold", false, null);
  }, false);

  orderedListButton.addEventListener("click", function(){
    editor.execCommand("insertOrderedList", false, null);
  }, false);

  unorderedListButton.addEventListener("click", function(){
    editor.execCommand("insertUnorderedList", false, null);
  }, false);

  centerButton.addEventListener("click", function(){
    editor.execCommand("justifyCenter", false, null);
  }, false);

  justifyButton.addEventListener("click", function(){
    editor.execCommand("justifyFull", false, null);
  }, false);

  leftButton.addEventListener("click", function(){
    editor.execCommand("justifyLeft", false, null);
  }, false);

  rightButton.addEventListener("click", function(){
    editor.execCommand("justifyRight", false, null);
  }, false);

    fontColorButton.addEventListener("change", function(event){
    editor.execCommand("foreColor", false, event.target.value);
  }, false);

  fontSizeChanger.addEventListener("change", function(event){
    editor.execCommand("fontSize", false, event.target.value);
  }, false);

}, false);