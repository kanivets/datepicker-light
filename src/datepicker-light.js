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
                          '<div class="month">Jan</div>' +
                          '<div class="month">Feb</div>' +
                          '<div class="month">Mar</div>' +
                          '<div class="month">Apr</div>' +
                          '<div class="month">May</div>' +
                          '<div class="month">Jun</div>' +
                          '<div class="month">Jul</div>' +
                          '<div class="month">Aug</div>' +
                          '<div class="month">Sep</div>' +
                          '<div class="month">Oct</div>' +
                          '<div class="month">Nov</div>' +
                          '<div class="month">Dec</div>' +
                        '</div>' +
  					         '</div>'),

  		monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  		posX = 0,
  		posY = 0,
  		inputNumber = 0,

      arrowMonthEvents = function(year){
        $('.arrow.right', dapickerHTML).off('click');
        $('.arrow.right', dapickerHTML).on('click', function(){
          createMonthHTML(year + 1, 0)
          return false;
        });
        $('.arrow.left', dapickerHTML).off('click');
        $('.arrow.left', dapickerHTML).on('click', function(){
          createMonthHTML(year - 1, 0)
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
        $('.container', dapickerHTML).html(monthsHTML);
  			$('.dpl' + inputNumber).val(monthNames[month] + ', ' + year);

  		},

  		createYearsHTML = function(year, month) {

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
