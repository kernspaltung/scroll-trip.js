$(document).foundation()

scrollLengths = []
isResizing = false
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
function setupScroll() {

   scrollContainer.scroll( function(){

      if( ! isResizing ) {

         isResizing = setTimeout(function(){

            isResizing = false

            scrollTravel()

         }, 50 )

      }

   })

   scrollContainer.trigger('scroll')

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

   var scrollTop = scrollContainer.scrollTop()


   // $('.travel').stop().animate({
   //    marginLeft: (scrollAmount * 200)
   // })

   scrollPct = ( Math.min(totalHeight, scrollTop) / totalHeight )

   // temporary solution: map 0-1.0 range between levels equally.
   // TO-DO: select element considering element width


   for( i in scrollLengths ) {

      if( scrollTop > scrollLengths[i].start && scrollTop < scrollLengths[i].start + scrollLengths[i].size ) {

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

         offsetLeft = scrollInLevel * ( nextElement.outerWidth() - scrollContainer.innerWidth() )

         nextElement.stop().animate({ left: - offsetLeft });

      }



      // offsetLeft = nextElement.width() - scrollContainer.width() / totalHeight;

      // console.log( nextElement.width() );


   }

   currentElementIndex = nextElementIndex

   // console.log( totalHeight , Math.min(totalHeight, scrollTop) )


   lastScrollTop = scrollTop


}
