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

  		monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  		posX = 0,
  		posY = 0,
  		inputNumber = 0,

  		arrowDaysEvents = function(year, month){
  			$('.arrow.right', dapickerHTML).off('click');
  			$('.arrow.right', dapickerHTML).on('click', function(){
  				createDaysHTML(year, month + 1, 0);
  				return false;
  			});
  			$('.arrow.left', dapickerHTML).off('click');
  			$('.arrow.left', dapickerHTML).on('click', function(){
  				createDaysHTML(year, month - 1, 0);
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
			$('.dpl' + inputNumber).val(monthNames[month] + ' ' + date +', ' + year);
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
  		},

  		createMonthHTML = function(year, month) {
  			
  		},

  		createYearsHTML = function(year, month) {

  		},

  		calculateWidgetPosition = function(obj){
  			posX = $(obj).offset().left;
  			posY = $(obj).offset().top + $(obj).outerHeight() + 5;
  		},

	  	createDatepickerHTML = function(obj){	  		
	  		$(dapickerHTML).css({'left' : posX, 'top': posY});
	  		$('body').append(dapickerHTML);

	  	};

    return this.each(function (i) {
      $(this).addClass('datepicker-field dpl' + i);
      $(this).on('focus', function(){
      	$(this).blur();
      });
      var time = new Date(),
      currentYear = time.getFullYear(),
      currentMonth = time.getMonth(),
      currentDay = time.getDate();
      $(this).val(monthNames[currentMonth] + ' ' + currentDay +', ' + currentYear);
      inputNumber = i;
      createDaysHTML(currentYear, currentMonth, currentDay);
      calculateWidgetPosition(this);
      createDatepickerHTML(this);
    });

  };
}(jQuery));
