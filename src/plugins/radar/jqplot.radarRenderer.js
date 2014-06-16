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
		/*plot.eventListenerHooks.addOnce('jqplotMouseMove', handleMove);
		plot.eventListenerHooks.addOnce('jqplotMouseDown', handleMouseDown);
		plot.eventListenerHooks.addOnce('jqplotMouseUp', handleMouseUp);
		plot.eventListenerHooks.addOnce('jqplotClick', handleClick);
		plot.eventListenerHooks.addOnce('jqplotRightClick', handleRightClick);*/
		//plot.postDrawHooks.addOnce(postPlotDraw);
	};

	// setup default renderers for axes and legend so user doesn't have to
	// called with scope of plot
	function preInit(target, data, options) {
		options = options || {};
		options.axesDefaults = options.axesDefaults || {};
		options.legend = options.legend || {};
		options.seriesDefaults = options.seriesDefaults || {};
		// only set these if there is a pie series
		/*var setopts = false;
		if (options.seriesDefaults.renderer == $.jqplot.RadarRenderer) {
			setopts = true;
		}else if (options.series) {
			for (var i=0; i < options.series.length; i++) {
				if (options.series[i].renderer == $.jqplot.RadarRenderer) {
					setopts = true;
				}
			}
		}*/
		/*
		if (setopts) {
			options.axesDefaults.renderer = $.jqplot.PieAxisRenderer;
			//options.legend.renderer = $.jqplot.PieLegendRenderer;
			//options.legend.preDraw = true;
			//options.seriesDefaults.pointLabels = {show: false};
		}*/
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
	};

	$.jqplot.RadarRenderer.prototype.doDraw = function (ctx, x, y, color) {
	};

	$.jqplot.RadarRenderer.prototype.drawScales = function(ctx){
		var data = this.data;

		console.log(this);

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

		for (var i=0; i<this._calculatedScale.steps; i++){
			ctx.beginPath();

			if(this.renderer.options.scaleShowLine){
				ctx.strokeStyle = this.renderer.options.scaleLineColor;
				ctx.lineWidth = this.scaleLineWidth;
				ctx.moveTo(0,-this._calculatedScale.scaleHop * (i+1));	
				for (var j=0; j<data.length; j++){
				ctx.rotate(rotationDegree);
				ctx.lineTo(0,-this._calculatedScale.scaleHop * (i+1));
				}
				ctx.closePath();
				ctx.stroke();
			}

			if (this.renderer.options.scaleShowLabels){
				ctx.textAlign = 'center';
				ctx.font = this.scaleFontStyle + " " + this.scaleFontSize+"px " + this.scaleFontFamily;
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
				ctx.fillText(this._calculatedScale.labels[i],0,-this._calculatedScale.scaleHop*(i+1));
			}

		}
		for (var k=0; k<data; k++){	
			ctx.font = this.pointLabelFontStyle + " " + this.pointLabelFontSize+"px " + this.pointLabelFontFamily;
			ctx.fillStyle = this.renderer.options.pointLabelFontColor;
			var opposite = Math.sin(rotationDegree*k) * (maxSize + this.pointLabelFontSize);
			var adjacent = Math.cos(rotationDegree*k) * (maxSize + this.pointLabelFontSize);

			if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
				ctx.textAlign = "center";
			}
			else if(rotationDegree*k > Math.PI){
				ctx.textAlign = "right";
			}
			else{
				ctx.textAlign = "left";
			}

			ctx.textBaseline = "middle";

			ctx.fillText(data[k],opposite,-adjacent);

		}
		ctx.restore();
	};

	$.jqplot.RadarRenderer.prototype.drawOrigin = function(ctx, options){
		var offx = 0;
		var offy = 0;
		var trans = 1;
		// var colorGenerator = new this.colorGenerator(this.seriesColors);
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
		this._center = [(cw - trans * offx)/2 + trans * offx, (ch - trans*offy)/2 + trans * offy];

		// console.log("center: " + this._center);

		ctx.strokeStyle = "red";
		ctx.beginPath(); 
		ctx.arc(this._center[0], this._center[1], 5, 0, 2 * Math.PI, true); 
		ctx.stroke();
	};

	$.jqplot.RadarRenderer.prototype.draw = function (ctx, gridData, options, plot) {
		var opts = $.extend({}, this.renderer.options);
		
		console.log(gridData);
		
		xmin = this._xaxis._min;
		xmax = this._xaxis._max;
		ticks = [];
		
		for (var i=0; i < this._xaxis._ticks.length; i+=1){
			ticks[i] = this._xaxis._ticks[i].label;
		}
		console.log(ticks);
		stepCount = ticks.length;
		scaleHop = ctx.canvas.width / (2 * stepCount);

		this._calculatedScale = {
			steps: stepCount,
			scaleHop : scaleHop,
			graphMin : xmin,
			labels : ticks
		};

		this.renderer.drawScales.call(this, ctx);
		this.renderer.drawOrigin.call(this, ctx, options);
		
		for (var i=0, l=gridData.length; i<l; i++) {
			
			var linePoints = [];
			if (this.data[i][0] == null) {
				continue;
			}
			base = gridData[i][0];
			
			lineDatas = [];

			for (var j=0, size=gridData[i].length; j<size; j++){
				if (j%2 == 0){
					console.log(gridData[i][j] - this._center[0])
				}else {

				}
			}
			//this.renderer.drawLine.call(ctx, lineDatas, "red");
		}
	};
	$.jqplot.preInitHooks.push(preInit);
})(jQuery);