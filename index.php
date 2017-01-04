<?php


// test content to use later:
ob_start();

?>

<div class="test-container columns medium-6 large-3 panel">
   <small>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, a.
   </small>
</div>
<div class="test-container columns medium-6 large-3 panel">
   <a href="#">
Link</a>
<img src="http://fakeimg.pl/900x600/fea330/0ba1ca" alt="" class="background">
</div>

<?php
$sample_html = ob_get_contents();
ob_end_clean();

?>


<!doctype html>
<html class="no-js" lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Scroll Trip</title>
   <link rel="stylesheet" href="css/app.css">
</head>

<style>


</style>

<body>

   <div id="scroll-container" class="scroll-container" touch-action="none">



            <div class="empty-height-container">

            </div>

      <div class="travel-container">
         <div class="travel">
            <div id="level-1" class="level row expanded">
               <div class="row expanded">
                  <?php for ($i=0; $i < 2; $i++) {
                     echo $sample_html;
                  } ?>
               </div>

            </div>
            <div id="level-2" class="level row expanded">
               <div class="row expanded">
                  <?php for ($i=0; $i < 2; $i++) {
                     echo $sample_html;
                  } ?>
               </div>
            </div>
            <div id="level-3" class="level row expanded">
               <div class="row expanded">
                  Lorem ipsum dolor sit amet.
                  <img src="http://fakeimg.pl/900x600/fea330/0ba1ca" alt="" class="background">

               </div>
            </div>
            <div id="level-4" class="level row expanded">
               <div class="row expanded">
                  <?php for ($i=0; $i < 2; $i++) {
                     echo $sample_html;
                  } ?>
               </div>
            </div>
            <div id="level-5" class="level row expanded">
               <div class="row expanded">
                  Lorem ipsum dolor sit amet.
                  <img src="http://fakeimg.pl/900x600/fea330/0ba1ca" alt="" class="background">

               </div>
            </div>
         </div>
      </div>


   </div>



   <script src="bower_components/jquery/dist/jquery.js"></script>
   <script src="bower_components/what-input/what-input.js"></script>
   <script src="bower_components/foundation-sites/dist/foundation.js"></script>
   <script src="bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>

   <!-- Pointer Events Polyfill: -->
   <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>

   <script src="js/app.js"></script>
</body>
</html>
