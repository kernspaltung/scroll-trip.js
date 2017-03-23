<!doctype html>
<html class="no-js" lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <title>
      Scroll Trip
   </title>

   <link rel="stylesheet" href="css/app.css">
</head>

<style>


</style>

<body>

   <div id="scroll-container" class="scroll-container" touch-action="none">



      <div class="curtain absUpL w-100 h-100 z-1 color-white-bg" style="opacity:0.5"></div>

      <div class="empty-height-container"></div>

      <div class="travel-container">

         <div class="travel">
            <div id="level-0" class="level row expanded" data-title="Test Title 0" data-image="http://unsplash.it/1200x600?random=1">
               <div class="row expanded">
                  Lorem ipsum dolor sit amet.
                  <img src="http://fakeimg.pl/900x600/fea330/0ba1ca" alt="" class="background">
               </div>
            </div>

            <div id="level-1" class="level row expanded" data-title="Test Title 1" data-image="http://unsplash.it/1200x600?random=2">
               <div class="row expanded">

                  <div class="columns small-3 text-center">
                     1
                  </div>
                  <div class="columns small-3 text-center">
                     2
                  </div>
                  <div class="columns small-3 text-center">
                     3
                  </div>
                  <div class="columns small-3 text-center">
                     4
                  </div>

               </div>

            </div>

            <div id="level-2" class="level row expanded" data-title="Test Title 1" data-image="http://unsplash.it/1200x600?random=3">
               <div class="row expanded">

                  <div class="columns small-2 text-center">
                     1
                  </div>
                  <div class="columns small-2 text-center">
                     2
                  </div>
                  <div class="columns small-2 text-center">
                     3
                  </div>
                  <div class="columns small-2 text-center">
                     4
                  </div>
                  <div class="columns small-2 text-center">
                     5
                  </div>
                  <div class="columns small-2 text-center">
                     6
                  </div>

               </div>

            </div>


            <div id="level-scrollH" class="level horizontal-only row expanded" data-title="Horizontal" data-image="http://unsplash.it/1200x600?random=3">
               <div class="">

                  <div class="card-w text-center">
                     A
                  </div>
                  <div class="card-w text-center">
                     B
                  </div>
                  <div class="card-w text-center">
                     C
                  </div>
                  <div class="card-w text-center">
                     D
                  </div>
                  <div class="card-w text-center">
                     E
                  </div>
                  <div class="card-w text-center">
                     F
                  </div>
                  <div class="card-w text-center">
                     G
                  </div>
                  <div class="card-w text-center">
                     H
                  </div>
                  <div class="card-w text-center">
                     I
                  </div>
                  <div class="card-w text-center">
                     J
                  </div>

               </div>

            </div>


            <div id="level-long" class="level row expanded" data-title="Test Title 2.3" data-image="http://unsplash.it/1200x600?random=4">
               <div class="w-100 p-6">

                  <h1 class="p3">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus totam porro id minus atque neque eos, magni hic.
                  </h1>
                  <img src="http://fakeimg.pl/2900x600/fea330/0ba1ca" alt="" class="background absUpL z-1">

               </div>
            </div>

            <div id="level-3" class="level row expanded" data-title="Test Title 3" data-image="http://unsplash.it/1200x600?random=4">
               <div class="row expanded">
                  Lorem ipsum dolor sit amet.
                  <img src="http://fakeimg.pl/900x600/fea330/0ba1ca" alt="" class="background">

               </div>
            </div>

         </div>
      </div>


   </div>



   <nav id="level-menu" style="" class="current-menu">
      <ul>
         <li class="hidden">
            <a href="#">
               Test Title
            </a>
         </li>
      </ul>
   </nav>


   <section id="scroll-indicator">
      <div class="bar"></div>
   </section>


   <script src="bower_components/jquery/dist/jquery.js"></script>
   <script src="bower_components/what-input/what-input.js"></script>
   <script src="bower_components/foundation-sites/dist/foundation.js"></script>
   <script src="bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>

   <script src="bower_components/imgLiquid/js/imgLiquid-min.js"></script>

   <!-- Pointer Events Polyfill: -->
   <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>

   <script src="js/app.js"></script>
</body>
</html>
