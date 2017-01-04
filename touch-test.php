
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

   <div class="test-container" style="width:80vw; height: 80vh; border:1px solid red; touch-action: pan-y;" touch-action="pan-x">
      <div class="test-2-container" style="width:40vw; height: 40vh; border:1px solid red; touch-action: pan-y;" touch-action="pan-y">
         drag
      </div>
      touch
   </div>



   <script src="bower_components/jquery/dist/jquery.js"></script>
   <script src="bower_components/what-input/what-input.js"></script>
   <script src="bower_components/foundation-sites/dist/foundation.js"></script>
   <script src="bower_components/jquery-mousewheel/jquery.mousewheel.min.js"></script>

   <!-- Pointer Events Polyfill: -->
   <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>

   <script src="js/app.js"></script>
   <script src="js/tests/touch.js"></script>
</body>
</html>
