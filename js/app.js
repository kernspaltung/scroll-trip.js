var levels
var currentLevel

var travelAxis
var travelDirection

var scrollingHorizontalLevel
var horizontalScrollLevel
var horizontalScrollingDone

var lastScrolledChild

window.requestAnimFrame = (function() {
   return window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   function(callback) {
      window.setTimeout(callback, 1000 / 60);
   };
})();

// $(document).foundation()

levelsInfo = []
startedDrag = false
draggingPointer = false;
isScrolling = false
gotMouseWheel = false
lastScrollTop = 0
scrollAmount = 0
step = 100
currentLevelIndex = 0

scrollTotal = 0
startY = 0
startX = 0
nextLevelIndex = 0


$(document).ready(function() {

   scrollContainer = $('.scroll-container')

   totalHeight = getTotalScrollHeight();

   // var tcw = $('.travel').css({ left: - ( width / 2 ) })

   $('.empty-height-container').height(totalHeight)

   setupScroll()

   setupResize()

   levels = createStructure()

   // set levels' widths
   $('.level.auto-w').each(function() {
      i = $(this).index()
      // console.log('levelsInfo[',i,'].childrenWidth',levelsInfo[i].childrenWidth)
      $(this).width(levelsInfo[i].childrenWidth)
      $(this).children().first().width(levelsInfo[i].childrenWidth)

   })




   $('.level').each(function() {

      addLevelToMenu($(this))

   })


   setupHorizontalScrollWidth()

   // scrollTravel()

   fadeOnVisible()

   sxsw.init();

   $(window).resize(function() {

      var browserHeight = Math.round($(window).height());
      var browserWidth = Math.round($(window).width());
      var videoHeight = $('.wd-thumb-list li a').eq(0).attr('data-wd-height');
      var videoWidth = $('.wd-thumb-list li a').eq(0).attr('data-wd-width');

      var new_size = sxsw.full_bleed(browserWidth, browserHeight, videoWidth, videoHeight);

      if($('video').length>0) {

         $('video')
         .width(new_size.width)
         .height(new_size.height);

         document.querySelector('video').defaultPlaybackRate = 0.3;
         document.querySelector('video').playbackRate = 0.3;
      }
   });

   goTo(0, 0)

})

function fadeOnVisible() {

   $('.fadeOnVisible').css({
      opacity: 0
   })
   $('.appear').css({
      opacity: 0
   })

}



function setupResize() {
   $(window).trigger('resize')
}





function setupScroll() {


   if (scrollContainer.height() >= scrollContainer.width()) {
      scrollStep = scrollContainer.height() * 0.85
   } else {
      scrollStep = scrollContainer.width() * 0.85
   }



   $('.scroll-container').on("pointerup", function(event) {

      console.log("up", draggingPointer, event.pageY, event.pageX);

      if (draggingPointer && startedDrag) {

         var direction;


         if (Math.abs(startY - event.pageY) > Math.abs(startX - event.pageX)) {
            direction = startY - event.pageY
            travelAxis = "vertical"
            if (direction < 0) travelDirection = "up"
            if (direction > 0) travelDirection = "down"
         } else {
            direction = startX - event.pageX
            travelAxis = "horizontal"
            if (direction < 0) travelDirection = "left"
            if (direction > 0) travelDirection = "right"
         }


         direction = Math.max(-1, direction)
         direction = Math.min(1, direction)

         increment = direction * scrollStep

         scrollTotal += increment
         scrollTotal = Math.max(scrollTotal, 0)
         scrollTotal = Math.min(scrollTotal, totalHeight)

         scrollTravel()

      }

      draggingPointer = false
      startedDrag = false
      travelAxis = undefined
      travelDirection = undefined
   });


   $('.scroll-container').on("pointerdown", function(event) {
      startedDrag = true
      // console.log(startY, startX );
      startY = event.pageY
      startX = event.pageX

   });

   $('.scroll-container').on("pointermove", function(event) {
      if (startedDrag) draggingPointer = true
      // console.log("move");
      //
      // startY = event.pageY
      // startX = event.pageX

   });


   $(window).on('mousewheel', function(event) {
      if (!gotMouseWheel) {

         clearTimeout(isScrolling)
         isScrolling = setTimeout(function() {
            scrollTotal += -event.deltaY * scrollStep
            scrollTotal = Math.max(scrollTotal, 0)
            scrollTotal = Math.min(scrollTotal, totalHeight)


            travelAxis = "vertical";

            if (event.deltaY === -1) {
               travelDirection = "down";
            }
            if (event.deltaY === 1) {
               travelDirection = "up";
            }

            scrollTravel()

            isScrolling = false

         }, 150)

         gotMouseWheel = setTimeout(function() {
            gotMouseWheel = false
         }, 100)

      }

   });



   scrollTravel()

}






function scrollTravel() {

   scrollPct = (Math.min(totalHeight, scrollTotal) / totalHeight)

   $('#scroll-indicator .bar').height($(window).height() * scrollPct)

         console.log(scrollTotal,
            levelsInfo[currentLevelIndex].start ,
            levelsInfo[currentLevelIndex].size,
            levelsInfo[currentLevelIndex].childrenWidth);

   for (i in levelsInfo) {
      if (scrollTotal >= levelsInfo[i].start &&
         scrollTotal < levelsInfo[i].start + levelsInfo[i].size &&
         scrollTotal < levelsInfo[i].start + levelsInfo[i].childrenWidth ) {

            nextLevelIndex = i

            console.log("scrolled into", i);

            break

         }

      }

      nextLevel = $('.level').eq(nextLevelIndex)

      if (currentLevelIndex !== nextLevelIndex) {

         if (currentLevelIndex >= 0) {

            if ($('.level').eq(currentLevelIndex).hasClass('horizontal-only')) {

               console.log("horizontal only!!!!", travelAxis)

               if (travelAxis === "vertical") {
                  if (travelDirection === "up") {
                     nextLevelIndex = parseInt(currentLevelIndex) - 1
                  }
                  if (travelDirection === "down") {
                     nextLevelIndex = parseInt(currentLevelIndex) + 1
                  }

                  levelsInfo[currentLevelIndex].doneScrolling = true

                  scrollingHorizontalLevel = false

               } else {

                  scrollingHorizontalLevel = true

               }

            } else {

               scrollingHorizontalLevel = false

            }

            if (!scrollingHorizontalLevel) {

               if (!levelsInfo[currentLevelIndex].doneScrolling) {

                  // console.log("Done!");

                  levelsInfo[currentLevelIndex].doneScrolling = true

                  console.log("set Current Level", currentLevelIndex);

                  currentLevel = $('.level').eq(currentLevelIndex)

                  offsetLeft = 0

                  if (nextLevelIndex < currentLevelIndex) {
                     scrollTotal = (levelsInfo[currentLevelIndex].start)
                     scrollToPct = scrollTotal / totalHeight
                     offsetLeft = 0
                  }
                  if (nextLevelIndex > currentLevelIndex) {
                     scrollTotal = (levelsInfo[currentLevelIndex].start + levelsInfo[currentLevelIndex].size - 1)
                     scrollToPct = scrollTotal / totalHeight
                     offsetLeft = currentLevel.outerWidth(true) - scrollContainer.width()
                  }
                  // scrollTotal = scrollToPct

                  console.log("to do", "RUN LEVEL STEP FUNCTIONS FOR n");

                  if (typeof(currentChild) == "undefined") {
                     currentChild = levelsInfo[currentLevelIndex].children.eq(0)
                  }
                  console.log("currentChild", currentChild);
                  if (typeof(currentChild) != "undefined") {

                     if(currentChild.find('video').length>0){

                        currentChild.find('video').animate({
                           opacity: 1
                        }, 800)

                     }

                     currentChild.find('.appear').each(function() {
                        var fadeTime = $(this).data('fade-time')
                        console.log(fadeTime);
                        if (fadeTime === "")
                        fadeTime = 800
                        $(this).stop().animate({
                           opacity: 1
                        }, fadeTime)
                     })
                  }

                  currentLevel.stop().animate({
                     left: -offsetLeft
                  }, 1200)


               } else {

                  console.log("SHOULD CHANGE LEVEL TO", nextLevelIndex)

                  levelsInfo[currentLevelIndex].doneScrolling = false

                  nextHeight = $('.level').first().outerHeight() * nextLevelIndex

                  nextHeight *= -1

                  currentChild = levelsInfo[nextLevelIndex].children.eq(levelsInfo[currentLevelIndex].currentChild)
                  if (typeof(currentChild) === "undefined") {
                     currentChild = levelsInfo[nextLevelIndex].children.eq(0)
                  }
                  console.log("currentChild", currentChild, typeof(levelsInfo[nextLevelIndex].currentChild));
                  if (typeof(currentChild) != "undefined") {

                     if(currentChild.find('video').length>0){
                        currentChild.find('video').animate({
                           opacity: 1
                        }, 800)
                     }

                     currentChild.find('.appear').each(function() {
                        var fadeTime = $(this).data('fade-time')
                        console.log(fadeTime);
                        if (fadeTime === "")
                        fadeTime = 800
                        $(this).stop().animate({
                           opacity: 1
                        }, fadeTime)
                     })
                  }


                  $('.travel').stop().animate({
                     marginTop: nextHeight
                  }, 600, function() {
                     //
                     // $('.level').eq(currentLevelIndex).stop().animate({
                     //    left: ( scrollTotal - levelsInfo[ currentLevelIndex ].start )
                     // }, 600)

                  })

                  displayCurrentMenuItem(nextLevelIndex)



                  levelsInfo[currentLevelIndex].doneScrolling = true

                  currentLevelIndex = nextLevelIndex

                  nextLevel = $('.level').eq(nextLevelIndex)

                  loadLevelImage(nextLevel)

                  // console.log("nextLevel",nextLevel.children().first().children());

                  if (nextLevel.length > 0) {

                     numChildren = nextLevel.children().first().children().length

                     if (numChildren > 1) {


                        scrollStep = nextLevel.width() / numChildren

                        scrollStep = Math.max(scrollContainer.width(), scrollStep)

                     }
                  }

                  console.log("set Current Level", currentLevelIndex);

                  currentLevel = $('.level').eq(currentLevelIndex)

                  console.log("to do", "RUN LEVEL STEP FUNCTIONS FOR 0");


               }

            } else {
               // if scrollingHorizontalLevel
               if (currentLevel.hasClass('horizontal-only')) {
                  horizontalScrollLevel = currentLevel

                  console.log("scrollingHorizontalLevel!")

                  var left = parseInt(currentLevel.stop().css('left'))

                  if (travelDirection === "left") {
                     horizontalIncrement = 1
                  } else {
                     horizontalIncrement = -1
                  }

                  console.log("to do", "go step by step")

                  left += ($(window).width() / 3) * horizontalIncrement

                  if (left < 0) {
                     modifier = -1
                  } else {
                     modifier = 1
                  }

                  console.log("horizontalScrollLevel", horizontalScrollLevel);

                  levelScrollSpaceWidth = horizontalScrollLevel.children().first().width() - $(window).width() + 128


                  var goToLevel = undefined

                  if (Math.abs(left) > levelScrollSpaceWidth) {

                     if (horizontalScrollingDone) {
                        goToLevel = parseInt(currentLevelIndex) + 1
                     }
                     horizontalScrollingDone = true


                  }
                  if (left >= 0) {

                     if (horizontalScrollingDone) {
                        goToLevel = parseInt(currentLevelIndex) - 1
                     }
                     horizontalScrollingDone = true

                     left = 0
                     console.log("left = 0")
                  }


                  left = Math.min(Math.abs(left), levelScrollSpaceWidth) * modifier

                  console.log("horizontal left", left)

                  if (typeof(goToLevel) != "undefined") {

                     horizontalScrollLevel.stop().animate({
                        left: left
                     }, 600, function() {})

                     goTo(goToLevel)

                     goToLevel = undefined

                     horizontalScrollLevel = null

                     horizontalScrollingDone = false

                  } else {

                     horizontalScrollLevel.stop().animate({
                        left: left
                     }, 1200, function() {})

                  }

               }

            }

         }
      } else {

         scrollBeforePct = levelsInfo[nextLevelIndex].start / totalHeight

         scrollInLevelPct = scrollPct - scrollBeforePct

         scrollInLevel = scrollInLevelPct / (levelsInfo[nextLevelIndex].size / totalHeight)

         // map scrollInLevel to child elements' positions, centering them
         console.log("SCROLL.I.L", scrollInLevelPct, $('.level').eq(currentLevelIndex).children().first().children().length, levelsInfo[currentLevelIndex].size)

         if (travelDirection === "left" || travelDirection === "up") {
            levelsInfo[nextLevelIndex].currentChild--
         } else {
            levelsInfo[nextLevelIndex].currentChild++
         }

         levelsInfo[nextLevelIndex].doneScrolling = false

         console.log("currentChild index:", levelsInfo[nextLevelIndex].currentChild);
         var currentChild = levelsInfo[nextLevelIndex].children.eq(levelsInfo[nextLevelIndex].currentChild)


         // offsetLeft = scrollInLevel * ( nextLevel.innerWidth() - scrollContainer.outerWidth() )
         // offsetLeft =

         offsetLeft = currentChild.position().left - (scrollContainer.width() - currentChild.width()) / 2

         if (currentChild.width() > scrollContainer.width() * 1.3) {
            console.log("ULTRAWIDE");
            originalOffsetLeft = offsetLeft
            offsetLeft = originalOffsetLeft - parseInt(nextLevel.css('left'))
         }

         maxScroll = nextLevel.width() - currentChild.width()
         maxScroll -= parseInt(currentChild.css('marginLeft')) + parseInt(currentChild.css('marginRight'))

         console.log("check", offsetLeft, maxScroll)

         offsetLeft = Math.min(offsetLeft, nextLevel.width())



         console.log("To Do:", "fade out elements from last viewed element");

         if( currentChild.find('video').length > 0 ) {
            currentChild.find('video').each(function() {
               $(this).get(0).play()
            })
         }
         if (typeof(lastScrolledChild) != "undefined") {
            lastScrolledChild.find('.appear,video').stop().animate({
               opacity: 0
            }, 800, function() {})
            console.log("lastScrolledChild video", lastScrolledChild.find('video').first().get(0));

         }
         currentChild.find('video').animate({
            opacity: 1
         }, 800)
         currentChild.find('.appear').each(function() {
            var fadeTime = $(this).data('fade-time')
            console.log(fadeTime);
            if (fadeTime === "")
            fadeTime = 800
            $(this).stop().animate({
               opacity: 1
            }, fadeTime)
         })
         nextLevel.stop().stop().animate({
            left: -offsetLeft
         }, 1500, function() {
            lastScrolledChild = currentChild
         })


         // if( nextLevel.width() > scrollContainer.width() ) {
         //
         //    // extraWidth = $('.level').width() - scrollContainer.width()
         //    //
         //    // horizontalScrollTotal = scrollContainer.width() + extraWidth
         //    offsetLeft = scrollInLevel * ( nextLevel.innerWidth() - scrollContainer.outerWidth() )
         //
         //    nextLevel.stop().animate({ left: - offsetLeft },1200)
         //
         // }



         // offsetLeft = nextLevel.width() - scrollContainer.width() / totalHeight;

         // console.log( nextLevel.width() );

         currentLevelIndex = nextLevelIndex

      }

      // console.log(currentLevelIndex);



      // console.log( totalHeight , Math.min(totalHeight, scrollTotal) )


      lastScrollTop = scrollTotal

   }



   function addLevelToMenu(level) {

      title = level.data('title')

      list = $('.current-menu ul')

      model = $('.current-menu li.hidden')

      copy = model.clone().detach().removeClass('hidden');

      copy.find('a').html(title)

      $('.current-menu ul').append(copy)

      copy.click(function() {

         $(this).addClass('active')
         .siblings().removeClass('active')

         goTo(level.index(), 0)

      })

   }






   function goTo(levelIndex, elementIndex) {


      // console.log( levels )
      currentLevel = $('.level').eq(levelIndex)

      // currentLevelIndex = levelIndex
      // nextLevelIndex = levelIndex
      levelsInfo[levelIndex].doneScrolling = true
      nextLevel = currentLevel

      // scrollTravel( nextLevel )

      nextHeight = $('.level').first().outerHeight() * levelIndex

      nextHeight *= -1

      offsetLeft = 0

      totalScrolled = nextHeight

      currentLevel.find('video').animate({
         opacity: 1
      }, 800)
      currentLevel.find('.appear').each(function() {
         var fadeTime = $(this).data('fade-time')
         console.log(fadeTime);
         if (fadeTime === "")
         fadeTime = 800
         $(this).stop().animate({
            opacity: 1
         }, fadeTime)
      })

      if (typeof(elementIndex) != "undefined") {

         levelsInfo[levelIndex].currentChild = elementIndex

         if ((elementIndex in levels[levelIndex].children)) {

            currentElementIndex = elementIndex
            nextElementIndex = elementIndex

            for (var i = 0; i < elementIndex; i++) {
               offsetLeft += levels[levelIndex].children[i].width
            }

            offsetLeft = Math.min(offsetLeft, currentLevel.width() - scrollContainer.width())

            var currentChild = levelsInfo[levelIndex].children.eq(elementIndex)
            levelsInfo[levelIndex].currentChild = elementIndex

            offsetLeft = currentChild.position().left - (scrollContainer.width() - currentChild.width()) / 2

            totalScrolled += offsetLeft

         }

      }

      // scrollTotal = totalScrolled + 1


      $('.travel').stop().animate({

         marginTop: nextHeight

      }, 700, function() {

         currentLevelIndex = levelIndex
         nextLevelIndex = levelIndex

         currentLevel = $('.level').eq(currentLevelIndex)

         if (typeof(elementIndex) != "undefined") {
            if (typeof(currentChild) != "undefined") {
               currentChild.find('video').animate({
                  opacity: 1
               }, 800)
               currentChild.find('.appear').each(function() {
                  var fadeTime = $(this).data('fade-time')
                  console.log(fadeTime);
                  if (fadeTime === "")
                  fadeTime = 800
                  $(this).stop().animate({
                     opacity: 1
                  }, fadeTime)
               })
            }
            currentLevel.stop().animate({
               left: -offsetLeft
            }, 600, function() {

               scrollTotal = (levelsInfo[levelIndex].start + offsetLeft) + 1

               // scrollTravel()

            })

         }

      })


   }




   function createStructure() {

      levelsArray = []

      $('.level').each(function() {

         level = $(this)

         title = level.data('title')

         width = level.width

         children_elements = level.children().first().children()

         children = []
         childrenWidth = 0

         if (children_elements.length > 1) {

            children_elements.each(function() {

               var child_element = $(this)

               children.push({
                  title: child_element.data('title'),
                  width: child_element.width()
               })
               childrenWidth += child_element.outerWidth(true)

            })
         }

         levelsArray.push({
            title: title,
            width: width,
            children: children,
            childrenWidth: childrenWidth
         })

      })

      return levelsArray

   }




   function getTotalScrollHeight() {

      var items = $('.level')

      var totalHeight = 0;



      items.each(function(i) {


         $(this).css({
            top: i / items.length * (scrollContainer.height() * items.length)
         })

         scrollLength = $(this).height()


         // if( $(this).width() > scrollContainer.width() ) {

         scrollLength += $(this).width() // #level-4 {
            //    width: $container_width * 6;
            // }

            // }

            $(this).attr('data-scroll-length', scrollLength)

            itemSizes = []
            var children
            if ($(this).children().length === 1) children = $(this).children().first().children()
            else if ($(this).children().length > 1) children = $(this).children()

            childrenWidth = 0

            children.each(function() {
               var cw = $(this).outerWidth(true)
               itemSizes.push(cw)
               childrenWidth += cw
            })

            levelsInfo.push({
               start: totalHeight,
               itemSizes: itemSizes,
               children: children,
               childrenWidth: childrenWidth,
               size: scrollLength,
               doneScrolling: false,
               currentChild: 0
            })

            // if( ! $(this).hasClass('auto-w')) {
               totalHeight += scrollLength
            // }
            // else {
            //    totalHeight += childrenWidth
            // }

            // if ($(this).index() >= items.length - 1) {
            //    totalHeight += scrollLength
            // }

         })


         return totalHeight

      }



      function loadLevelImage(level) {

         var imagesrc = level.data('image')

         if (imagesrc != "" ||
         imagesrc != "undefined") {

            image = $('<div>')

            img = $('<img>').attr('src', imagesrc)


            image.addClass('imgLiquidFill')

            image.append(img)

            lastimage = $('.scroll-trip-bg')

            image.css({
               position: 'absolute',
               top: 0,
               left: 0,
               width: $('.scroll-container').innerWidth(),
               height: $('.scroll-container').innerHeight(),
               zIndex: -1,
               opacity: 0
            })



            $('#scroll-container').prepend(image)

            image.stop().animate({

               opacity: 1

            }, 600, function() {
               image.addClass('scroll-trip-bg')
               lastimage.removeClass('scroll-trip-bg').fadeOut(600, function() {
                  lastimage.remove()
               })

            })

            image.imgLiquid()

         }

      }



      function setupHorizontalScrollWidth() {

         $('.horizontal-only').each(function() {

            var totalChildrenW = 0

            $(this).children().first().children().each(function() {
               totalChildrenW += $(this).width()
               totalChildrenW += parseInt($(this).css('marginLeft'))
               totalChildrenW += parseInt($(this).css('marginRight'))
            })

            $(this).children().first().width(totalChildrenW)

         })
      }


      function displayCurrentMenuItem(index) {


         $('.current-menu li').removeClass('active')
         .eq(parseInt(index) + 1).addClass('active')

      }



      var sxsw = {

         full_bleed: function(boxWidth, boxHeight, imgWidth, imgHeight) {

            // Calculate new height and width...
            var initW = imgWidth;
            var initH = imgHeight;
            var ratio = initH / initW;

            imgWidth = boxWidth;
            imgHeight = boxWidth * ratio;

            // If the video is not the right height, then make it so...
            if (imgHeight < boxHeight) {
               imgHeight = boxHeight;
               imgWidth = imgHeight / ratio;
            }

            //  Return new size for video
            return {
               width: imgWidth,
               height: imgHeight
            };

         },

         init: function() {
            var browserHeight = Math.round(jQuery(window).height());
            var browserWidth = Math.round(jQuery(window).width());
            var videoHeight = jQuery('video').height();
            var videoWidth = jQuery('video').width();

            var new_size = sxsw.full_bleed(browserWidth, browserHeight, videoWidth, videoHeight);

            jQuery('video')
            .width(new_size.width)
            .height(new_size.height);
         }

      };
