/*! datepicker-light - v0.0.1 - 2015-03-28
* Copyright (c) 2015 Dmitriy Kanivets; Licensed MIT */
(function ($) {
  $.fn.datepickerLight = function () {
    return this.each(function (i) {
      // Do something to each selected element.
      $(this).html('datepickerLight' + i);
    });
  };
}(jQuery));
