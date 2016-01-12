jQPlot
======

[![Join the chat at https://gitter.im/svandecappelle/jQPlot](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/svandecappelle/jQPlot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
| ![LineStyles](http://svandecappelle.github.io/jQPlot/public/img/linestyles2.jpeg) | Numerous line style options with 6 built in marker styles! |
| ![Renderers](http://svandecappelle.github.io/jQPlot/public/img/barchart.jpeg) | Lots of renderers |
| ![shadows](http://svandecappelle.github.io/jQPlot/public/img/shadow2.jpeg) | Shadow control on lines, markers, the grid, everything! |
| ![drag&drop](http://svandecappelle.github.io/jQPlot/public/img/dragdrop2.jpeg) | Drag and drop points with auto updating of data! |
| ![logaxis](http://svandecappelle.github.io/jQPlot/public/img/logaxes2.jpeg) | Log Axes with flexible tick marks! |
| ![Trendlines](http://svandecappelle.github.io/jQPlot/public/img/trendline2.jpeg) | Trend lines computed automatically! |
|  |  |

# Distribution
You can find the freshly compiled files in the ``/dist`` build directory.

# Build from sources
## Requirements
* To build from sources file you need nodejs and grunt-cli
  * npm install -g grunt-cli
* Type: ```npm install```
* Type: ```grunt``` to build all distribution.

# Usage:
* Import into your web page:
```
<script src="<directory_jqplot_dist>/core/jquery.min.js"></script>
<script src="<directory_jqplot_dist>/core/jquery.jqplot.min.js"></script>
```
* Import plugins if any
* Call jqplot building system:
```
$(function(){
  $.jqplot(<ID_HTML>, <DATAS>, <OPTIONS>);
});
```

# Help Wanted
We're currently reaching out to new contributors. Feel free to participate [here on Github](https://github.com/svandecappelle/jQPlot), through issues, pull requests and [our wiki](https://github.com/svandecappelle/jQPlot/wiki/Migrating-jQPlot-Plans). Make sure to follow us through the [jqPlot Google Group mailing list](http://groups.google.com/group/jqplot-users).
