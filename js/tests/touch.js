window.requestAnimFrame = (function(){
   return  window.requestAnimationFrame       ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame    ||
   window.oRequestAnimationFrame      ||
   window.msRequestAnimationFrame     ||
   function( callback ){
      window.setTimeout(callback, 1000 / 60);
   };
})();

$(document).foundation()


$('.test-container').on("pointermove", function(event) {
   console.log("move");
   //
   // startY = event.pageY
   // startX = event.pageX

});
