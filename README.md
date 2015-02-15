jQPlot
======

[![Build Status](https://travis-ci.org/svandecappelle/jQPlot.svg?branch=master)](https://travis-ci.org/svandecappelle/jQPlot)


jqPlot is a plotting and charting plugin for the jQuery Javascript framework. jqPlot produces beautiful line, bar and pie charts with many features:

* Numerous chart style options.
* Date axes with customizable formatting.
* Up to 9 Y axes.
* Rotated axis text.
* Automatic trend line computation.
* Tooltips and data point highlighting.
* Sensible defaults for ease of use.
* Large number of plugins renderers.

| View  | Desc |
| ----- | ---- |
| ![LineStyles](http://www.jqplot.com/images/linestyles2.jpg) | Numerous line style options with 6 built in marker styles! |
| ![Renderers](http://www.jqplot.com/images/barchart.jpg) | Lots of renderers |
| ![shadows](http://www.jqplot.com/images/shadow2.jpg) | Shadow control on lines, markers, the grid, everything! |
| ![drag&drop](http://www.jqplot.com/images/dragdrop2.jpg) | Drag and drop points with auto updating of data! |
| ![logaxis](http://www.jqplot.com/images/logaxes2.jpg) | Log Axes with flexible tick marks! |
| ![Trendlines](http://www.jqplot.com/images/trendline2.jpg) | Trend lines computed automatically! |
|  |  |

# Distribution
Last builded files are generated in the build directory.  

# Build from sources
## Requirements
* To build from sources file you need nodejs
* Type: ```npm run dist``` to build all distribution.

# Usage:
* Import into your web page:
```
<script src="../../../build/dist/core/jquery.min.js"></script>
<script src="../../../build/dist/core/jquery.jqplot.min.js"></script>
```
* Import plugins if any
* Call jqplot building system:
```
$(function(){
  $.jqplot(<ID_HTLM>, <DATAS>, <OPTIONS>);
});
```
