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

scrollLengths = []
isScrolling = false
lastScrollTop = 0
scrollAmount = 0
step = 100
scrollContainer = $('.scroll-container')
currentElementIndex = -1

scrollTotal = 0
startY = 0
startX = 0
nextElementIndex = 0
$(document).ready(function(){


   totalHeight = getTotalScrollHeight();

   // var tcw = $('.travel').css({ left: - ( width / 2 ) })

   $('.empty-height-container').height( totalHeight )



   setupScroll()

   setupResize()

   $('.level').each(function(){

      title = $(this).data('title')

      list = $('#level-menu ul')

      model = $('#level-menu li.hidden')

      copy = model.clone().detach().removeClass('hidden');

      copy.find('a').html( title )

      $('#level-menu ul').append( copy );

      copy.click(function(){
         var i = $(this).index() - 1

         console.log(scrollLengths[i].start);

         scrollTotal = scrollLengths[i].start + 1;

         scrollTravel();

      })


   })


})



function setupResize() {
   $(window).trigger('resize')
}


draggingPointer = false;


function setupScroll() {


   if( scrollContainer.height() >= scrollContainer.width() ) {
      scrollStep = scrollContainer.height() * 1.5
   } else {
      scrollStep = scrollContainer.width() * 1.5
   }


   $('.scroll-container').on("pointerup", function(event) {

      console.log("up", event.pageY, event.pageX );

      if( draggingPointer ){

         var direction;


         if( Math.abs(startY - event.pageY) > Math.abs(startX - event.pageX ) ) {
            direction = startY - event.pageY
         } else {
            direction = startX - event.pageX
         }

         direction = Math.max( -1, direction )
         direction = Math.min( 1, direction )

         increment = direction * scrollStep

         scrollTotal += increment
         scrollTotal = Math.max( scrollTotal, 0 )
         scrollTotal = Math.min( scrollTotal, totalHeight )

         scrollTravel()

      }

      draggingPointer = false

   });

   $('.scroll-container').on("pointerdown", function(event) {

      draggingPointer = true
      console.log(startY, startX );
      startY = event.pageY
      startX = event.pageX

   });

   $('.scroll-container').on("pointermove", function(event) {
      console.log("move");
      //
      // startY = event.pageY
      // startX = event.pageX

   });



   $(window).on('mousewheel', function(event) {

      if( ! isScrolling ) {

         isScrolling = setTimeout(function(){

            isScrolling = false

            scrollTotal += - event.deltaY * scrollStep
            scrollTotal = Math.max( scrollTotal, 0 )
            scrollTotal = Math.min( scrollTotal, totalHeight )

            scrollTravel()

         }, 200 )

      }

   });



   scrollTravel()

}




function getTotalScrollHeight() {

   var items = $('.level')

   var totalHeight = 0;



   items.each(function(i){


      $(this).css({
         top: i / items.length * ( scrollContainer.height() * items.length )
      })

      scrollLength = $(this).height()


      // if( $(this).width() > scrollContainer.width() ) {

      scrollLength += $(this).width()

      // }

      $(this).attr('data-scroll-length', scrollLength);


      scrollLengths.push({
         start: totalHeight,
         size: scrollLength
      })

      totalHeight += scrollLength

      if( $(this).index() >= items.length -1 ) {
         totalHeight += scrollLength
      }

   })


   return totalHeight
}






function scrollTravel() {

   // var scrollTotal = scrollContainer.scrollTotal()
   // console.log(scrollTotal);

   // $('.travel').stop().animate({
   //    marginLeft: (scrollAmount * 200)
   // })

   scrollPct = ( Math.min(totalHeight, scrollTotal) / totalHeight )

   // temporary solution: map 0-1.0 range between levels equally.
   // TO-DO: select element considering element width


   for( i in scrollLengths ) {

      if( scrollTotal > scrollLengths[i].start && scrollTotal < scrollLengths[i].start + scrollLengths[i].size ) {

         nextElementIndex = i;

         break;

      }

   }


   // nextElementIndex = Math.floor(scrollPct * $('.level').length)
   nextElement = $('.level').eq( nextElementIndex )

   if( currentElementIndex !== nextElementIndex) {


      nextHeight = $('.level').first().outerHeight() * nextElementIndex

      nextHeight *= -1

      $('.travel').stop().animate({
         marginTop: nextHeight
      })

   } else {


      scrollBeforePct = scrollLengths[nextElementIndex].start / totalHeight

      scrollInLevelPct = scrollPct - scrollBeforePct

      scrollInLevel = scrollInLevelPct / ( scrollLengths[nextElementIndex].size / totalHeight )

      if( nextElement.width() > scrollContainer.width() ) {

         // extraWidth = $('.level').width() - scrollContainer.width()
         //
         // horizontalScrollTotal = scrollContainer.width() + extraWidth
         offsetLeft = scrollInLevel * ( nextElement.outerWidth() - scrollContainer.width() )

         nextElement.stop().animate({ left: - offsetLeft });

      }



      // offsetLeft = nextElement.width() - scrollContainer.width() / totalHeight;

      // console.log( nextElement.width() );


   }

   currentElementIndex = nextElementIndex

   // console.log( totalHeight , Math.min(totalHeight, scrollTotal) )


   lastScrollTop = scrollTotal


}
