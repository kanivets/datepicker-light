/*
 * 
 * 
 *
 * Copyright (c) 2015 Dmitriy Kanivets
 * Licensed under the MIT license.
 */
(function ($) {
  $.fn.datepickerLight = function () {
  	var dapickerHTML = $('<div class="datepicker">' +
  							           '<div class="heading">' +
  								          '<a class="arrow left"></a>' +
  								          '<a class="arrow right"></a>' +
  								          '<div class="value"></div>' +
  							           '</div>' +
  							           '<div class="container"></div>' +
  							           '<a class="today">Today</a>' +
  						            '</div>'),

      daysHTML = $('<div class="monthly">' +
                      '<div class="weekdays">' +
                        '<div>SU</div>' +
                        '<div>MO</div>' +
                        '<div>TU</div>' +
                        '<div>WE</div>' +
                        '<div>TH</div>' +
                        '<div>FR</div>' +
                        '<div>SA</div>' +
                      '</div>' +
                      '<div class="days"></div>' +
                    '</div>'),

  		monthsHTML = $('<div class="yearly">' +
  						          '<div class="months">' +
                          '<div data-month="0" class="month">Jan</div>' +
                          '<div data-month="1" class="month">Feb</div>' +
                          '<div data-month="2" class="month">Mar</div>' +
                          '<div data-month="3" class="month">Apr</div>' +
                          '<div data-month="4" class="month">May</div>' +
                          '<div data-month="5" class="month">Jun</div>' +
                          '<div data-month="6" class="month">Jul</div>' +
                          '<div data-month="7" class="month">Aug</div>' +
                          '<div data-month="8" class="month">Sep</div>' +
                          '<div data-month="9" class="month">Oct</div>' +
                          '<div data-month="10" class="month">Nov</div>' +
                          '<div data-month="11" class="month">Dec</div>' +
                        '</div>' +
  					         '</div>'),

      yearsHTML = $('<div class="year-range">' +
                        '<div class="years"></div>' +
                     '</div>'),

  		monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  		posX = 0,
  		posY = 0,
  		inputNumber = 0,

      arrowYearsEvents = function(year){
        $('.arrow.right', dapickerHTML).off('click');
        $('.arrow.right', dapickerHTML).on('click', function(){
          createYearsHTML(year + 16, true);
          return false;
        });
        $('.arrow.left', dapickerHTML).off('click');
        $('.arrow.left', dapickerHTML).on('click', function(){
          createYearsHTML(year - 16, true);
          return false;
        });
      },

      arrowMonthEvents = function(year){
        $('.arrow.right', dapickerHTML).off('click');
        $('.arrow.right', dapickerHTML).on('click', function(){
          createMonthHTML(year + 1);
          return false;
        });
        $('.arrow.left', dapickerHTML).off('click');
        $('.arrow.left', dapickerHTML).on('click', function(){
          createMonthHTML(year - 1);
          return false;
        });
      },

  		arrowDaysEvents = function(year, month){
  			$('.arrow.right', dapickerHTML).off('click');
  			$('.arrow.right', dapickerHTML).on('click', function(){
          if(month == 11) {
            createDaysHTML(year + 1, 0, 0);
          } else {
            createDaysHTML(year, month + 1, 0);
          }
  				return false;
  			});
  			$('.arrow.left', dapickerHTML).off('click');
  			$('.arrow.left', dapickerHTML).on('click', function(){
          if(month == 0) {
  				  createDaysHTML(year - 1, 11, 0);
          } else {
            createDaysHTML(year, month - 1, 0);
          }
  				return false;
  			});
  			

  		},

  		addPreviousDays = function(year, month, days) {
  			var time = new Date(year, month-1),
  				lastDayOfMonth = new Date(year, month, 0).getDate();
			for(var i=lastDayOfMonth - days + 1; i <= lastDayOfMonth; i++) {
				$('.days', daysHTML).append('<div class="day disabled">' + i + '</div>');
			}
  		},

  		addNextDays = function(year, month, day) {
  			var time = new Date(year, month, day),
  				lastDayOfMonth = new Date(year, month, day).getDay();
  			for(var i = 1; i < 7 - lastDayOfMonth; i++) {
  				$('.days', daysHTML).append('<div class="day disabled">' + i + '</div>');
  			}
  		},

  		createDaysHTML = function(year, month, date) {
  			arrowDaysEvents(year, month);
			  var firstDayOfMonth, lastDayOfMonth, time, dayStatus;
			  $('.days', daysHTML).empty();
			  time = new Date(year, month);
			  time.setDate(1);
			  firstDayOfMonth = time.getDay();
			  lastDayOfMonth = new Date(year, month + 1, 0).getDate();
			  addPreviousDays(year, month, firstDayOfMonth);
			  for(var i=1; i <= lastDayOfMonth; i++) {
				  dayStatus = (date == i) ? "day active" : "day";
				  $('.days:not(.disabled)', daysHTML).append('<div class="' + dayStatus + '">' + i + '</div>');
			  }
			  addNextDays(year, month, lastDayOfMonth);
			  $('.heading .value', dapickerHTML).html(monthNames[month] + ' ' + year);
			  $('.container', dapickerHTML).html(daysHTML);
			  $(daysHTML).on('click', '.day:not(.disabled)', function(){
				  $('.days .day', daysHTML).removeClass('active');
				  $(this).addClass('active');
				  $('.dpl' + inputNumber).val(monthNames[month] + ' ' + $(this).text() +', ' + year);
				  return false;
			  });
        $('.today', dapickerHTML).off('click');
        $('.today', dapickerHTML).on('click', function(){
          var currentDate = new Date(),
          currentYear = currentDate.getFullYear(),
          currentMonth = currentDate.getMonth(),
          currentDay = currentDate.getDate();
          $('.dpl' + inputNumber).val(monthNames[currentMonth] + ' ' + currentDay +', ' + currentYear);
          createDaysHTML(currentYear, currentMonth, currentDay);
          return false;
        });
        $('.value', dapickerHTML).off('click');
        $('.value', dapickerHTML).on('click', function(){
          createMonthHTML(year, month);
          return false;
        });
  		},

  		createMonthHTML = function(year, month) {
        arrowMonthEvents(year);
        $('.heading .value', dapickerHTML).html(year);
        $('.month', monthsHTML).removeClass('active');
        $('.month', monthsHTML).each(function(i, obj){
          if(i == month) {
            $(obj).addClass('active');
          }
        });
        $('.container', dapickerHTML).html(monthsHTML);
  			//$('.dpl' + inputNumber).val(monthNames[month] + ', ' + year);
        $(monthsHTML).on('click', '.month', function(i){
          $('.month', monthsHTML).removeClass('active');
          $(this).addClass('active');
          $('.dpl' + inputNumber).val(monthNames[$(this).data('month')] + ', ' + year);
          return false;
        });
        $('.today', dapickerHTML).off('click');
        $('.today', dapickerHTML).on('click', function(){
          var currentDate = new Date(),
          currentYear = currentDate.getFullYear(),
          currentMonth = currentDate.getMonth();
          $('.dpl' + inputNumber).val(monthNames[currentMonth] + ', ' + currentYear);
          createMonthHTML(currentYear, currentMonth);
          return false;
        });        
        $('.value', dapickerHTML).off('click');
        $('.value', dapickerHTML).on('click', function(){
          createYearsHTML(year);
          return false;
        });
  		},

  		createYearsHTML = function(year, current) {
        console.log(current);
        arrowYearsEvents(year);
        $('.heading .value', dapickerHTML).html(year-15 + ' - ' +year);
        $('.years', yearsHTML).empty();
        for(var i = year - 15; i <= year; i++) {
          yearStatus = (year == i) ? "year active" : "year";
          if(current) {yearStatus = "year";}
          $('.years', yearsHTML).append('<div class="' + yearStatus + '">' + i + '</div>');
        }
        $('.container', dapickerHTML).html(yearsHTML);
        $(yearsHTML).on('click', '.year', function(i){
          $('.year', yearsHTML).removeClass('active');
          $(this).addClass('active');
          $('.dpl' + inputNumber).val($(this).text());
          return false;
        });
        $('.today', dapickerHTML).off('click');
        $('.today', dapickerHTML).on('click', function(){
          var currentDate = new Date(),
          currentYear = currentDate.getFullYear();
          $('.dpl' + inputNumber).val(currentYear);
          createYearsHTML(currentYear);
          return false;
        });        
        $('.value', dapickerHTML).off('click');
        $('.value', dapickerHTML).on('click', function(){
          var currentDate = new Date(),
          currentYear = currentDate.getFullYear(),
          currentMonth = currentDate.getMonth(),
          currentDay = currentDate.getDate();
          createDaysHTML(currentYear, currentMonth, currentDay);
          return false;
        });
  		},

  		calculateWidgetPosition = function(obj){
  			posX = $(obj).offset().left;
  			posY = $(obj).offset().top + $(obj).outerHeight() + 5;
  		},

	  	addDatepickerContainer = function(obj){	  		
	  		$(dapickerHTML).css({'left' : posX, 'top': posY});
	  		$('body').append(dapickerHTML);

	  	};

    return this.each(function (i) {
      if (navigator.userAgent.indexOf('Chrome') != -1) {
        $('input[type="date"]').prop('type','text');
      }
      $(this).addClass('datepicker-field dpl' + i);
      $(this).on('focus', function(){
      	$(this).blur();
      });
      var currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      currentMonth = currentDate.getMonth(),
      currentDay = currentDate.getDate();
      $(this).val(monthNames[currentMonth] + ' ' + currentDay +', ' + currentYear);
      inputNumber = i;
      createDaysHTML(currentYear, currentMonth, currentDay);
      calculateWidgetPosition(this);
      addDatepickerContainer(this);
    });

  };
}(jQuery));
