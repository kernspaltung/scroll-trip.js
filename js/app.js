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


               // to find out how much to scroll horizontally,
               // let's first remove all previous levels' scrollLenghts
               scrollBeforePct = scrollLengths[nextElementIndex].start / totalHeight
               // scrollBeforePct = nextElementIndex / $('.level').length
               scrollInLevelPct = scrollPct - scrollBeforePct
console.log(scrollInLevelPct);
               scrollInLevel = scrollInLevelPct / ( scrollLengths[nextElementIndex].size / totalHeight )

               // now interpolate that to the element's pct inside totalHeight

               // scrollInLevel = scrollInLevelPct * scrollLengths[nextElementIndex].size

               // now we multiply that times the extraWidth:
               // extraWidth = 0
console.log(scrollInLevel);
               if( nextElement.width() > scrollContainer.width() ) {

                  // extraWidth = $('.level').width() - scrollContainer.width()
                  //
                  // horizontalScrollTotal = scrollContainer.width() + extraWidth
                  offsetLeft = scrollInLevel * ( nextElement.outerWidth() - scrollContainer.width() )
// console.log(offset   Left);
// console.log( scrollPct, scrollInLevelPct, scrollInLevel, nextElement.width() );
// console.log(offsetLeft, scrollInLevel, nextElement.width());
                  //
                  nextElement.stop().animate({ left: - offsetLeft });

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
         size: scrollLength
      })

      totalHeight += scrollLength

      if( $(this).index() >= items.length -1 ) {
         totalHeight += scrollLength
      }

   })


   console.log( "totalHeight", totalHeight );

   return totalHeight
}
