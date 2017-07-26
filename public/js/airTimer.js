  var timerId;
  var currentTime;
  var timeStep = 1000;
  var hourStep = 1;
  var timerStep = 1000;
  var startPeriodTime;
  var endPeriodTime;
  var DATE_FORMAT = "dd.MM.yyyy HH:mm";
    
  function startTimeout() {
      timerId = setInterval(incrementTime, timerStep);
   }
   
   function stopTimeout() {
      clearInterval(timerId);
   }
   
   function changeCurrentTime() {
       currentTime = getDateFromFormat(document.getElementById("date").value, DATE_FORMAT);
   }
    
   function incrementTimeStep() {
      timeStep = timeStep + 1000;
      hourStep = hourStep + 0.5;
   }
        
   function decrementTimeStep() {
      if (timeStep > 1000)
          timeStep = timeStep - 1000;
          hourStep = hourStep - 0.5;
   }
   
   function firstSpeed() {
       timeStep = 1000;
       hourStep = 0.5;
       timerStep = 1000;
       stopTimeout();
       startTimeout();
   }
   
   function secondSpeed() {
       timeStep = 500;
       hourStep = 0.5;
       timerStep = 500;
       stopTimeout();
       startTimeout();
   }
   
   function thirdSpeed() {
       timeStep = 100;
       hourStep = 1;
       timerStep = 100;
       stopTimeout();
       startTimeout();
   }
   
   function changeCurrentTimeSlider() {   
       startPeriodTime = getDateFromFormat(document.getElementById("startPeriodDate").value, DATE_FORMAT);
       endPeriodTime = getDateFromFormat(document.getElementById("endPeriodDate").value, DATE_FORMAT);
       var slider = document.getElementById("slider").value;
       var delta = (endPeriodTime - startPeriodTime) * slider / 100;
       currentTime = startPeriodTime + delta;
       document.getElementById("date").value = formatDate(new Date(currentTime), DATE_FORMAT);
   }
   
   function incrementTime() {
       if (!currentTime) {
          currentTime = getDateFromFormat(document.getElementById("date").value, DATE_FORMAT);
          
       }
       
       if (!startPeriodTime) {
           startPeriodTime = getDateFromFormat(document.getElementById("startPeriodDate").value, DATE_FORMAT);
       }
       
       if (!endPeriodTime) {
           endPeriodTime = getDateFromFormat(document.getElementById("endPeriodDate").value, DATE_FORMAT);
       }
       
       currentTime = currentTime + (hourStep*60*60*1000);
       if (currentTime > endPeriodTime) {
           currentTime = endPeriodTime;
           stopTimeout();
       }
       
       document.getElementById("date").value = formatDate(new Date(currentTime), DATE_FORMAT);
       var slider = document.getElementById("slider").value;
       
       var delta = Math.round((currentTime - startPeriodTime) / (endPeriodTime - startPeriodTime) * 100);
       document.getElementById("slider").value = delta;
       
          
       timerRefresh();
   }