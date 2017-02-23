
var levels
var currentLevel
var currentLevel

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

// $(document).foundation()

scrollLengths = []
isScrolling = false
gotMouseWheel = false
lastScrollTop = 0
scrollAmount = 0
step = 100
scrollContainer = $('.scroll-container')
currentLevelIndex = 0

scrollTotal = 0
startY = 0
startX = 0
nextLevelIndex = 0


$(document).ready(function(){

   totalHeight = getTotalScrollHeight();

   // var tcw = $('.travel').css({ left: - ( width / 2 ) })

   $('.empty-height-container').height( totalHeight )

   setupScroll()

   setupResize()

   $('.level').each(function(){

      addLevelToMenu($(this))

   })

   levels = createStructure()

   // scrollTravel()

})




function setupResize() {
   $(window).trigger('resize')
}


draggingPointer = false;


function setupScroll() {


   if( scrollContainer.height() >= scrollContainer.width() ) {
      scrollStep = scrollContainer.height() * 0.85
   } else {
      scrollStep = scrollContainer.width() * 0.85
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
      if( ! gotMouseWheel ) {

         clearTimeout(isScrolling)
         isScrolling = setTimeout(function(){
            scrollTotal += - event.deltaY * scrollStep
            scrollTotal = Math.max( scrollTotal, 0 )
            scrollTotal = Math.min( scrollTotal, totalHeight )
            scrollTravel()

            isScrolling = false

         }, 150 )

         gotMouseWheel = setTimeout(function(){
            gotMouseWheel = false
         },100)

      }

   });



   scrollTravel()

}






function scrollTravel() {
console.log("TrAVEL!");



   // var scrollTotal = scrollContainer.scrollTotal()
   // console.log(scrollTotal);

   // $('.travel').stop().animate({
   //    marginLeft: (scrollAmount * 200)
   // })

   scrollPct = ( Math.min(totalHeight, scrollTotal) / totalHeight )

   $('#scroll-indicator .bar').height( $(window).height() * scrollPct )

   for( i in scrollLengths ) {

      if( scrollTotal >= scrollLengths[i].start && scrollTotal < scrollLengths[i].start + scrollLengths[i].size ) {

         nextLevelIndex = i

         index = parseInt(i) + 1

         $('.current-menu li').removeClass('active')

         .eq( index ).addClass('active')

         break

      }

   }



   // nextLevelIndex = Math.floor(scrollPct * $('.level').length)

   // console.log("diff", currentLevelIndex , nextLevelIndex, scrollTotal)

   nextLevel = $('.level').eq( nextLevelIndex )

   if( currentLevelIndex !== nextLevelIndex) {

      if( currentLevelIndex >= 0  ) {

         // console.log("done?", scrollLengths[ currentLevelIndex ].doneScrolling)

         if( ! scrollLengths[ currentLevelIndex ].doneScrolling ) {

            console.log("Done!");

            scrollLengths[ currentLevelIndex ].doneScrolling = true

            currentLevel = $('.level').eq( currentLevelIndex )

            offsetLeft = 0

            if( nextLevelIndex > currentLevelIndex ) {
               scrollToPct = (scrollLengths[currentLevelIndex].start+scrollLengths[currentLevelIndex].length-1) / totalHeight
               offsetLeft = currentLevel.outerWidth() - scrollContainer.width()
            }
            if( nextLevelIndex < currentLevelIndex ) {
               scrollToPct = (scrollLengths[currentLevelIndex].start) / totalHeight
               offsetLeft = 0
            }
            // scrollTotal = scrollToPct


            currentLevel.stop().animate({ left: - offsetLeft },1200)


         } else {

            scrollLengths[ currentLevelIndex ].doneScrolling = false

            nextHeight = $('.level').first().outerHeight() * nextLevelIndex

            nextHeight *= -1


            $('.travel').stop().animate({
               marginTop: nextHeight
            },1200)


            scrollLengths[ currentLevelIndex ].doneScrolling = false

            currentLevelIndex = nextLevelIndex

            nextLevel = $('.level').eq(nextLevelIndex)

            loadLevelImage( nextLevel )

            // console.log("nextLevel",nextLevel.children().first().children());

            if(nextLevel.length>0) {

               numChildren = nextLevel.children().first().children().length

               if(numChildren>1) {


                  scrollStep = nextLevel.width() / numChildren

                  // scrollStep *= 2
                  scrollStep = Math.max( scrollContainer.width(), scrollStep)
                  console.log("scrollStep::",scrollStep)

               }
            }

            currentLevel = $('.level').eq( currentLevelIndex )



         }


      }
   } else {

      scrollBeforePct = scrollLengths[nextLevelIndex].start / totalHeight

      scrollInLevelPct = scrollPct - scrollBeforePct

      scrollInLevel = scrollInLevelPct / ( scrollLengths[nextLevelIndex].size / totalHeight )

      if( nextLevel.width() > scrollContainer.width() ) {

         // extraWidth = $('.level').width() - scrollContainer.width()
         //
         // horizontalScrollTotal = scrollContainer.width() + extraWidth
         offsetLeft = scrollInLevel * ( nextLevel.innerWidth() - scrollContainer.outerWidth() )

         nextLevel.stop().animate({ left: - offsetLeft },1200)

      }



      // offsetLeft = nextLevel.width() - scrollContainer.width() / totalHeight;

      // console.log( nextLevel.width() );

      currentLevelIndex = nextLevelIndex

   }

   // console.log(currentLevelIndex);



   // console.log( totalHeight , Math.min(totalHeight, scrollTotal) )


   lastScrollTop = scrollTotal


}



function addLevelToMenu( level ) {

   title = level.data('title')

   list = $('.current-menu ul')

   model = $('.current-menu li.hidden')

   copy = model.clone().detach().removeClass('hidden');

   copy.find('a').html( title )

   $('.current-menu ul').append( copy )

   copy.click(function(){

      $(this).addClass('active')
      .siblings().removeClass('active')

      goTo( level.index(), 0 )

   })

}






function goTo( levelIndex, elementIndex ) {

   levels = createStructure()
   // console.log( levels )
   currentLevel = $('.level').eq( levelIndex )
   currentLevelIndex = levelIndex

   nextLevel = currentLevel

   scrollTravel( nextLevel )

   nextHeight = $('.level').first().outerHeight() * levelIndex

   nextHeight *= -1

   offsetLeft = 0

   totalScrolled = nextHeight


   if( (elementIndex in levels[levelIndex].children) ) {

      currentElementIndex = elementIndex
      nextElementIndex = elementIndex

      for (var i = 0; i < elementIndex; i++) {
         offsetLeft += levels[levelIndex].children[i].width
      }

      offsetLeft = Math.min( offsetLeft, currentLevel.width() - scrollContainer.width() )

      totalScrolled += offsetLeft

   }
console.log("anim", nextHeight, offsetLeft);
   scrollTotal = totalScrolled


   $('.travel').stop().animate({

      marginTop: nextHeight

   },1200, function(){

         currentLevel.stop().animate({ left: - offsetLeft }, 600)

   })

   scrollTotal = (scrollLengths[levelIndex].start + offsetLeft)

   scrollTravel()

}




function createStructure() {

   levelsArray = []

   $('.level').each(function(){

      level = $(this)

      title = level.data('title')

      width = level.width

      children_elements = level.children().first().children()

      children = []

      if( children_elements.length > 1 ) {

         children_elements.each( function() {

            var child_element = $(this)

            children.push({
               title: child_element.data('title'),
               width: child_element.width()
            })

         })
      }

      levelsArray.push({
         title: title,
         width: width,
         children: children
      })

   })

   return levelsArray

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

      scrollLength += $(this).width()// #level-4 {
//    width: $container_width * 6;
// }

      // }

      $(this).attr('data-scroll-length', scrollLength)


      scrollLengths.push({
         start: totalHeight,
         size: scrollLength,
         doneScrolling: false
      })

      totalHeight += scrollLength

      if( $(this).index() >= items.length -1 ) {
         totalHeight += scrollLength
      }

   })


   return totalHeight

}



function loadLevelImage( level ) {

   var imagesrc = level.data('image')

   if(imagesrc != ""
      ||
      imagesrc != "undefined") {

         image = $('<div>')

         img = $('<img>').attr('src', imagesrc )


         image.addClass('imgLiquidFill')

         image.append( img )

         lastimage = $('.scroll-trip-bg')

         image.css({
            position: 'absolute',
            top:     0,
            left:    0,
            width:   $('.scroll-container').innerWidth(),
            height:  $('.scroll-container').innerHeight(),
            zIndex:  -1,
            opacity: 0
         })



         $('#scroll-container').prepend( image )

         image.stop().animate({

            opacity: 1

         }, 600, function(){
            image.addClass('scroll-trip-bg')
            lastimage.removeClass('scroll-trip-bg').fadeOut(600,function(){
               lastimage.remove()
            })

         })

         image.imgLiquid()

   }

}
