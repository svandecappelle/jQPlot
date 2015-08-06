/*jslint browser: true, plusplus: true, nomen: true, white: false */
/*global $, console, chai, describe, it, beforeEach */

$(function () {
    
    "use strict";
    
    var expect = chai.expect,
        should = chai.should(),
        chart = null,
        timer;

    beforeEach(function () {
        if (chart !== null) {
            chart.destroy();
        }
    });

    describe("Core", function () {
        
        describe("Constructor", function () {
            
            beforeEach(function () {
                chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]]);
            });
            
            it("Simple construction", function () {
                should.exist(chart);
                console.log(chart);
            });
        
            it("Checking chart.plotData", function () {
                should.exist(chart);
                expect(chart._plotData).to.be.an('array');
                expect(chart._plotData[0][0][0] >= 0).to.be.true;
                console.log(chart._plotData[0][0][0]);
               
            });
            
        });
        
        describe("Redraw", function () {
        
            beforeEach(function () {
                chart = $.jqplot('chart', [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
            });
            
             it("Should redraw", function () {
                chart.redraw();
                should.exist(chart);
            });
            
        });
        
        describe("Replot", function () {
        
            beforeEach(function () {
                chart = $.jqplot('chart', [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
            });
            
             it("Should replot", function () {
                chart.replot();
                should.exist(chart);
            });
            
        });
        
        describe("Constructor using title", function () {
            it("Construction with title", function () {
                chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
                    title: 'Chart title'
                });
                should.exist(chart);
            });
        });

        describe("Destructor", function () {
            it("Destruction from DOM", function () {
                chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
                    title: 'Chart title'
                });
                should.exist(chart);
                chart.destroy();
                expect($('#chart')).to.have.property('length').equals(1);
                expect($('#chart').children()).to.have.property('length').equals(0);
            });
        });

        describe("Destructor", function () {
            it("Destruction from DOM", function () {
                chart = $.jqplot('chart', [[4, 3, 5, 6, 8, 12, 1, 5]], {
                    title: 'Chart title'
                });
                should.exist(chart);
                chart.destroy();
                expect($('#chart')).to.have.property('length').equals(1);
                expect($('#chart').children()).to.have.property('length').equals(0);
            });
        });

        describe("No data indicator", function () {
            it("Checking no data indicator display", function () {
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