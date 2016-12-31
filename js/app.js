$(document).foundation()

isResizing = false
lastScrollTop = 0
scrollAmount = 0
step = 100
scrollContainer = $('.scroll-container')
currentElement = -1

$(document).ready(function(){


   totalHeight = getTotalScrollHeight();

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

            nextElement = Math.ceil(scrollPct * $('.level').length)

            if(currentElement !== nextElement) {

               nextHeight = $('.level').first().outerHeight() * currentElement

               nextHeight *= -1
               console.log( nextHeight )
               $('.travel').animate({
                  marginTop: nextHeight
               })

            }

            currentElement = nextElement

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



   items.each(function(){

      if( $(this).index() < items.length -1 ) {

         $(this).css({backgroundColor: '#0bc1ed'})

         scrollLength = $(this).height()


         if( $(this).width() > scrollContainer.width() ) {

            scrollLength += $(this).width() - scrollContainer.width()

         }

         $(this).attr('data-scroll-length', scrollLength);

         totalHeight += scrollLength

      }

   })


   console.log( "totalHeight", totalHeight );

   return totalHeight
}
