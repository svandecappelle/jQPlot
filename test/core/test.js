$(function() {
	var expect = chai.expect;
	var should = chai.should();

	describe("Core", function() {
	  describe("constructor", function() {
	    it("Simple construction", function() {
	      var chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {});
	      should.exist(chart);
	    });

	  });

	});
});