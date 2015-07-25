$(function() {
    var expect = chai.expect;
    var should = chai.should();
    var chart = null;

    beforeEach(function() {
      if (chart !== null){
        chart.destroy();
      }
    });

    describe("Core", function() {
      describe("Constructor", function() {
        it("Simple construction", function() {
          chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {});
          should.exist(chart);
          console.log(chart);
        });
      });

      describe("Constructor using title", function() {
        it("Construction with title", function() {
          chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
            title: 'Chart title'
          });
          should.exist(chart);
        });
      });

      describe("Destructor", function() {
        it("Destruction from DOM", function() {
          chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
            title: 'Chart title'
          });
          should.exist(chart);
          chart.destroy();
          expect($('#chart')).to.have.property('length').equals(1);
          expect($('#chart').children()).to.have.property('length').equals(0);
        });
      });

      describe("Destructor", function() {
        it("Destruction from DOM", function() {
          chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
            title: 'Chart title'
          });
          should.exist(chart);
          chart.destroy();
          expect($('#chart')).to.have.property('length').equals(1);
          expect($('#chart').children()).to.have.property('length').equals(0);
        });
      });

    describe("No data indicator", function() {
        it("Checking no data indicator display", function() {
          chart = $.jqplot('chart', [[]], {
            title: 'Chart title', 
            noDataIndicator: {
                show: true
            }
          });
          should.exist(chart);
          expect($('#chart .jqplot-noData-contents')).to.have.property('length').equals(1);
        });
      });
    });
});