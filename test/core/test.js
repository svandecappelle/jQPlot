/*jslint browser: true, plusplus: true, nomen: true, white: false */
/*global $, console, chai, describe, it, beforeEach */

$(function () {
    
    "use strict";
    
    var expect = chai.expect,
        should = chai.should(),
        chart = null,
        timer,
        
        chartOptions = {
            //stackSeries: true,
            axesDefaults: {
                tickOptions: {
                    showGridline: false
                }
            },
            axes: {
                xaxis: {
                    //renderer: $.jqplot.DateAxisRenderer,
                    //tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    //numberTicks: 6,
                    //tickOptions: {}
                    label: 'X-axis'
                },
                yaxis: {
                    //min: 0,
                    label: 'Y-axis'
                }
            },
            legend: {
                renderer: $.jqplot.EnhancedLegendRenderer,
                rendererOptions: {
                    numberColumns: 4
                },
                location: 's',
                placement: 'outsideGrid',
                show: true
            },
            cursor: {
                show: true,
                zoom: true,
                showTooltip: true,
                constrainZoomTo: 'x'
            },
            seriesDefaults: {
                fillGradient: false,
                fillAlpha: 0.35,
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {
                    fillToZero: true
                },
                shadow: false,
                breakOnNull: true,
                showMarker: true,
                markerOptions: {
                    size: 3
                }
            },
            series: [
                { label: "Exponential" },
                { label: "Prime numbers" }
            ],
            grid: {
                shadow: false,
                background: "#fff",
                borderWidth: 0
            }/*,
            highlighter: {
                show: true,
                tooltipContentEditor: function (str, sIx, pIx, plot) {
                    var date = new Date(plot.series[sIx].data[pIx][0]),
                        text = date.toLocaleDateString() + ' - ' + date.toLocaleTimeString() + '<br>',
                        s = plot.series,
                        i;
                    for (i in s) {
                        if (s[i].data && s[i].data.length > pIx) {
                            text += '<div style="color:' + s[i].fillColor + ';';
                            if (i === sIx) {
                                text += 'font-weight: bold;';
                            }
                            text += '">' + s[i].label + ': ' + s[i].data[pIx][1] + ' ' + s[i]._yaxis.label + '</div>';
                        }
                    }
                    return text;
                }
            }*/
        },
        
        dataSeries = [];
        

    beforeEach(function () {
        if (chart !== null) {
            chart.destroy();
        }
    });

    describe("Core", function () {
        
        describe("Constructor", function () {
            
            beforeEach(function () {
                
                dataSeries = [];
                
                //dataSeries.push([[1, 2], [3, 5.12], [5, 13.1], [7, 33.6], [9, 85.9], [11, 219.9]]);
                dataSeries.push([0, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]);
                dataSeries.push([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199]);
                
                chart = $.jqplot('chart', dataSeries, chartOptions);
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