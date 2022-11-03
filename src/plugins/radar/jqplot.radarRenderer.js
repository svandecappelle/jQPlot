(function($) {
    $.jqplot.RadarRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };

    $.jqplot.RadarRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.RadarRenderer.prototype.constructor = $.jqplot.RadarRenderer;

    // called with scope of a series
    $.jqplot.RadarRenderer.prototype.init = function(options, plot) {

        // Group: Properties
        //
        // prop: diameter
        // Outer diameter of the pie, auto computed by default
        this.diameter = null;

        // prop: highlightColors
        // an array of colors to use when highlighting a slice.
        this.highlightColors = [];

        // set highlight colors if none provided
        if (this.highlightColors.length == 0) {
            for (var i=0; i<this.seriesColors.length; i++){
                var rgba = $.jqplot.getColorComponents(this.seriesColors[i]);
                var newrgb = [rgba[0], rgba[1], rgba[2]];
                var sum = newrgb[0] + newrgb[1] + newrgb[2];
                for (var j=0; j<3; j++) {
                    // when darkening, lowest color component can be is 60.
                    newrgb[j] = (sum > 570) ?  newrgb[j] * 0.8 : newrgb[j] + 0.3 * (255 - newrgb[j]);
                    newrgb[j] = parseInt(newrgb[j], 10);
                }
                this.highlightColors.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');
            }
        }

        this.highlightColorGenerator = new $.jqplot.ColorGenerator(this.highlightColors);

        this.renderer.options = options;
        $.extend(true, this, options);

        plot.postParseOptionsHooks.addOnce(postParseOptions);
        plot.postInitHooks.addOnce(postInit);
    };

    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
    }

    // called with scope of plot
    function postParseOptions(options) {
        for (var i=0; i<this.series.length; i++) {
            this.series[i].seriesColors = this.seriesColors;
            this.series[i].colorGenerator = $.jqplot.colorGenerator;
        }
    }

    function postInit(target, data, options) {
        for (var i=0; i<this.series.length; i++) {
            if (this.series[i].renderer.constructor == $.jqplot.RadarRenderer) {
                // don't allow mouseover and mousedown at same time.
                if (this.series[i].highlightMouseOver) {
                    this.series[i].highlightMouseDown = false;
                }
            }
        }
    }

    $.jqplot.RadarRenderer.prototype.drawLine = function (ctx, datas, color) {
        var data = this.data;

        var rotationDegree = (2*Math.PI)/data.length;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

        // Move to starting point
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = this.lineWidth;

        ctx.beginPath();
        var r = (-this._calculatedScale.scaleHop * (data[0][1])) / this._calculatedScale.stepInterval;
        ctx.moveTo(0,r);
        for (var i=0; i<data.length; i++){
            r = (-this._calculatedScale.scaleHop * (data[i][1])) / this._calculatedScale.stepInterval;
            ctx.lineTo(0,r);
            ctx.rotate(rotationDegree);
        }
        // Close path and draw stroke / fill
        ctx.closePath();
        ctx.globalAlpha = .1;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.stroke();

        ctx.restore();
    };

    $.jqplot.RadarRenderer.prototype.drawScales = function(ctx){
        var data = this.data;

        var rotationDegree = (2*Math.PI)/data.length;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

        if (this.angleShowLineOut){
            ctx.strokeStyle = this.angleLineColor;
            ctx.lineWidth = this.angleLineWidth;
            for (var h=0; h<data.length; h++){
                ctx.rotate(rotationDegree);
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0,-maxSize);
                ctx.stroke();
            }
        }

        // Show web scales
        for (var i=0; i<this._calculatedScale.steps; i++) {
            ctx.beginPath();

            if (this.renderer.options.scaleShowLine) {
                ctx.strokeStyle = this.renderer.options.scaleLineColor;
                ctx.lineWidth = this.scaleLineWidth;
                ctx.moveTo(0, -this._calculatedScale.scaleHop * (i + 1));
                for (var j = 0; j < data.length; j++) {
                    ctx.rotate(rotationDegree);
                    ctx.lineTo(0, -this._calculatedScale.scaleHop * (i + 1));
                }
                ctx.closePath();
                ctx.stroke();
            }
        }

        // Show scale labels
        if (this.renderer.options.scaleShowLabels){
            for (var i=1; i<=this._calculatedScale.steps; i++) {
                ctx.textAlign = 'center';
                ctx.font = this.scaleFontSize+"px " + this.scaleFontFamily;
                ctx.fillStyle = this.scaleFontStyle;
                ctx.textBaseline = "middle";

                if (this.scaleShowLabelBackdrop){
                    var textWidth = ctx.measureText(this._calculatedScale.labels[i]).width;
                    ctx.fillStyle = this.scaleBackdropColor;
                    ctx.beginPath();
                    ctx.rect(
                        Math.round(- textWidth/2 - this.scaleBackdropPaddingX), //X
                        Math.round((-this._calculatedScale.scaleHop * (i + 1)) - this.scaleFontSize*0.5 - this.scaleBackdropPaddingY),//Y
                        Math.round(textWidth + (this.scaleBackdropPaddingX*2)), //Width
                        Math.round(this.scaleFontSize + (this.scaleBackdropPaddingY*2)) //Height
                    );
                    ctx.fill();
                }
                ctx.fillStyle = this.scaleFontColor;
                ctx.fillText(this._calculatedScale.labels[i],10,-this._calculatedScale.scaleHop*i+5);
            }
        }

        ctx.restore();
    };

    $.jqplot.RadarRenderer.prototype.drawAxes = function(ctx){
        var data = this.data;

        var rotationDegree = (2*Math.PI)/data.length;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);

        // Draw axes
        ctx.strokeStyle = this.renderer.options.scaleLineColor;
        for (var i=0; i<data.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, -this._calculatedScale.scaleHop);
            ctx.lineTo(0, -this._calculatedScale.scaleHop*this._calculatedScale.steps);
            ctx.closePath();
            ctx.stroke();
            ctx.rotate(rotationDegree);
        }

        // Draw axis labels
        if (this.renderer.options.showAxisLabels){
            ctx.font = this.renderer.options.labelFontSize + "px " + this.renderer.options.labelFontFamily;
            ctx.fillStyle = this.renderer.options.labelFontStyle;
            ctx.textBaseline = "middle";

            for (var i=0; i<data.length; i++) {

                var alpha = (2*Math.PI / data.length) * i;
                var r = this._calculatedScale.scaleHop * this._calculatedScale.steps + (0.75 * this.renderer.options.labelFontSize);
                var xPos = Math.floor(r * Math.sin(alpha));
                var yPos = Math.floor(-r * Math.cos(alpha));

                if     (xPos > 0) ctx.textAlign = 'left';
                else if(xPos < 0) ctx.textAlign = 'right';
                else              ctx.textAlign = 'center';

                ctx.fillText(this.renderer.options.radarAxisLabels[i], xPos, yPos);
            }
        }

        ctx.restore();
    };

    $.jqplot.RadarRenderer.prototype.drawOrigin = function(ctx, options){
        if(this.renderer.options.showOrigin) {
            var offx = 0;
            var offy = 0;
            var trans = 1;

            if (options.legendInfo && options.legendInfo.placement == 'insideGrid') {
                var li = options.legendInfo;
                switch (li.location) {
                    case 'nw':
                        offx = li.width + li.xoffset;
                        break;
                    case 'w':
                        offx = li.width + li.xoffset;
                        break;
                    case 'sw':
                        offx = li.width + li.xoffset;
                        break;
                    case 'ne':
                        offx = li.width + li.xoffset;
                        trans = -1;
                        break;
                    case 'e':
                        offx = li.width + li.xoffset;
                        trans = -1;
                        break;
                    case 'se':
                        offx = li.width + li.xoffset;
                        trans = -1;
                        break;
                    case 'n':
                        offy = li.height + li.yoffset;
                        break;
                    case 's':
                        offy = li.height + li.yoffset;
                        trans = -1;
                        break;
                    default:
                        break;
                }
            }

            var cw = ctx.canvas.width;
            var ch = ctx.canvas.height;
            this._center = [(cw - trans * offx) / 2 + trans * offx, (ch - trans * offy) / 2 + trans * offy];

            ctx.strokeStyle = this.renderer.options.originStyle;
            ctx.beginPath();
            ctx.arc(this._center[0], this._center[1], 5, 0, 2 * Math.PI, true);
            ctx.stroke();
        }
    };

    $.jqplot.RadarRenderer.prototype.draw = function (ctx, gridData, options, plot) {
        var opts = $.extend({}, this.renderer.options);

        var stepCount = opts.scaleLineCount;
        var stepInterval = opts.scaleLineMax / opts.scaleLineCount;
        var scaleHop = (ctx.canvas.height / (2 * stepCount))  - 16/stepCount;
        if(opts.showAxisLabels) {
            scaleHop = scaleHop - 1.25*opts.labelFontSize/stepCount;
        }

        var stepLabels = [];
        for(i=0; i<=stepCount; i++) {
            var currentStep = i*stepInterval;
            stepLabels[i] = Math.round((currentStep + Number.EPSILON) * 100) / 100;
        }

        this._calculatedScale = {
            steps: stepCount,
            stepInterval: stepInterval,
            scaleHop : scaleHop,
            graphMin : 0,
            labels : stepLabels
        };

        // At first data series draw web
        if(this.index == 0) {
            this.renderer.drawOrigin.call(this, ctx, options);
            this.renderer.drawScales.call(this, ctx);
            this.renderer.drawAxes.call(this, ctx);
        }

        this.renderer.drawLine.call(this, ctx, [], this.seriesColors[this.index]);
    };
    $.jqplot.preInitHooks.push(preInit);
})(jQuery);
