(function ($) {
  module('jQuery#datepickerLight', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function () {
    expect(1);
    strictEqual(this.elems.datepickerLight(), this.elems, 'should be chainable');
  });

  test('is datepickerLight', function () {
    expect(1);
    strictEqual(this.elems.datepickerLight().text(), 'datepickerLight0datepickerLight1datepickerLight2', 'should be datepickerLight');
  });

}(jQuery));
