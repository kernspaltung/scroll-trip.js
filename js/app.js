$(document).foundation()

scrollLengths = []
isScrolling = false
lastScrollTop = 0
scrollAmount = 0
step = 100
scrollContainer = $('.scroll-container')
currentElementIndex = -1

$(document).ready(function(){


   totalHeight = getTotalScrollHeight();

   // var tcw = $('.travel').css({ left: - ( width / 2 ) })

   $('.empty-height-container').height( totalHeight )



   setupScroll()

   setupResize()


})



function setupResize() {
   $(window).trigger('resize')
}


draggingPointer = false;

scrollTotal = 0
startY = 0;

function setupScroll() {



   $(window).on("pointerup", function(event) {
      draggingPointer = false
   });

   $(window).on("pointerdown", function(event) {
      draggingPointer = true

      startY = event.pageY
   });


   $(window).on("pointermove", function(event) {

      if ( draggingPointer ) {

         console.log( "scroll", scrollTotal );

         if( startY !== event.pageY ) {

            console.log((event.pageY-startY) * 1.5);

            scrollTotal += ( startY - event.pageY) * 3.5

            doScroll()

            startY = event.pageY

         }

      }

   });


   $(window).on('mousewheel', function(event) {
      scrollTotal += - event.deltaY * (scrollContainer.width() * 0.66)
      scrollTotal = Math.max( scrollTotal, 0 )

      doScroll()
   });



   doScroll( 0 )

}

function doScroll() {
   if( ! isScrolling ) {

      isScrolling = setTimeout(function(){
         isScrolling = false

         // scrollContainer.animate({ scrollTotal: scrollTotal * 20 })

         console.log( "scroll", scrollTotal );

         scrollTravel()

      }, 50 )

   }
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
