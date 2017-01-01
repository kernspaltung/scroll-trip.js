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

console.log(totalHeight);
   // var tcw = $('.travel').css({ left: - ( outerWidth / 2 ) })

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

            var scrollTop = scrollContainer.scrollTop()


            // $('.travel').stop().animate({
            //    marginLeft: (scrollAmount * 200)
            // })

            scrollPct = ( Math.min(totalHeight, scrollTop) / totalHeight )

            // temporary solution: map 0-1.0 range between levels equally.
            // TO-DO: select element considering element width



            for( i in scrollLengths ) {

               if( scrollTop > scrollLengths[i].start && scrollTop < scrollLengths[i].start + scrollLengths[i].length ) {

                  nextElementIndex = i;

                  break;

               }

            }


            nextElementIndex = Math.floor(scrollPct * $('.level').length)
            nextElement = $('.level').eq( nextElementIndex )

            if( currentElementIndex !== nextElementIndex) {


               nextHeight = $('.level').first().outerHeight() * nextElementIndex

               nextHeight *= -1

               $('.travel').animate({
                  marginTop: nextHeight
               })

            } else {


               // to find out how much to scroll horizontally,
               // let's first remove all previous levels' scrollLenghts

               scrollBeforePct = nextElementIndex / $('.level').length

               scrollInLevelPct = scrollPct - scrollBeforePct

               // now interpolate that to the element's pct inside totalHeight

               scrollInLevel = scrollInLevelPct / ( ( nextElement.height() + nextElement.outerWidth() ) / totalHeight )

               // now we multiply that times the extraWidth:
               // extraWidth = 0

               if( nextElement.outerWidth() > scrollContainer.width() ) {

                  // extraWidth = $('.level').width() - scrollContainer.width()
                  //
                  // horizontalScrollTotal = scrollContainer.width() + extraWidth
                  offsetLeft = scrollInLevel * nextElement.outerWidth()
// console.log(offsetLeft, scrollInLevel, nextElement.outerWidth());
                  //
                  nextElement.animate({ left: - offsetLeft });

               }



               // offsetLeft = nextElement.width() - scrollContainer.width() / totalHeight;

               // console.log( nextElement.width() );


            }

            currentElementIndex = nextElementIndex

            // console.log( totalHeight , Math.min(totalHeight, scrollTop) )


            lastScrollTop = scrollTop



         }, 150 )

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
         length: scrollLength
      })

      totalHeight += scrollLength

      if( $(this).index() >= items.length -1 ) {
         totalHeight += scrollLength
      }

   })


   console.log( "totalHeight", totalHeight );

   return totalHeight
}
