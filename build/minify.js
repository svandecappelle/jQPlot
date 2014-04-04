var compressor = require('node-minify');
var fs = require('fs');

var sigKill = 0;

process.argv.forEach(function (pluginDir, index, array) {
	if (index > 1){
		if (process.argv.indexOf("--clean")>-1 && pluginDir.lastIndexOf("--clean")==-1){
			console.log("cleaning generated prod files...");
			
			if(process.argv.indexOf("--core")>-1){
				console.log("Cleaning core");
				distClean = 'dist/core/js/';
				cleanFolder('dist/core/js/');
				cleanFolder('dist/core/css/');
			}else{
				console.log("Cleaning plugin: " + pluginDir);
				cleanFolder('dist/plugins/' + pluginDir+'/');
			}
			

			sigKill = 1;
		}
	}
});

function cleanFolder(distClean){
	filesToClean = fs.readdirSync(distClean);
	// console.log(filesToClean);
	
	filesToClean.forEach(function (file, index, array){
		if(notInProtectedFiles(file)){
			console.log("Clean " + file);
			fs.unlinkSync(distClean + file);
			console.log("Cleaned " + file);
		}else{
			console.log("Protected file " + file);
		}
	});
}

if(sigKill == 0){
	if (process.argv.length < 3){
		console.log("Usage: ");
	}else{
		console.log("Starting uglifier");
		process.argv.forEach(function (pluginDir, index, array) {
			if (index > 1) {
				if (pluginDir.lastIndexOf("--core")>-1){
					uglify('core', "js");
					uglify('core', "css");
				}else{
					uglify('plugins', pluginDir);
				}
			}
		});
	}
}

function uglify(folder, pluginDir){
	if (['core','plugins'].indexOf(folder)>-1){
		var srcFolder = '../src/'+folder+'/' + pluginDir + '/';
		var distFolder = 'dist/'+folder+'/' + pluginDir + '/';
		
		if(!fs.existsSync(distFolder)){
			fs.mkdirSync(distFolder);
		}
		
		filesToUglify = fs.readdirSync('../src/'+folder+'/' + pluginDir);

		filesToUglify.forEach(function (file, index, array){
			if(file.lastIndexOf(".min.")==-1 && notInProtectedFiles(file)){
				console.log("Minify : " + file);
				
				src = srcFolder + file;
				dest = (distFolder + file).replace('.js', '.min.js')
				// console.log('src: ' + src);
				// console.log('dest: ' + dest);
				var mode = null;
				if (file.lastIndexOf(".css")){
					mode = 'yui-css'
				}else if (file.lastIndexOf(".js")){
					mode = 'uglifyjs';  
				}
				if(mode !=null){
					new compressor.minify({
						type: mode,
						fileIn: src,
						fileOut: dest,
						callback: function(err, min){
							if (err!=null){
								console.log(err);
							}
						}
					});
				}else{
					console.log("File type not supported: " + file);
				}
			}		
		});
	}
}

function notInProtectedFiles(file){
	return ["jquery.js"].indexOf(file)==-1;
}
