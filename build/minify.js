var fs = require('fs');
var compressor = require('yuicompressor');

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
					try {
						uglify('core', "js");
					}catch (e){
						console.error("Error on uglifying");
					}
					try {
						uglify('core', "css");
					}catch (e){
						console.error("Error on uglifying");
					}
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
				console.log('dest: ' + dest);

				compress(src, dest);
			}
		});
	}
}

function notInProtectedFiles(file){
	return [""].indexOf(file)==-1;
}

function compress(file, dest){
	var mode = null;
	if (file.lastIndexOf(".css")){
		mode = 'css'
	}else if (file.lastIndexOf(".js")){
		mode = 'js';
	}
	if(mode !=null){

		compressor.compress(file, {
			//Compressor Options:
			charset: 'utf8',
			type: mode,
			nomunge: true,
			'line-break': 80,
		}, function(err, data, extra) {
			//err   If compressor encounters an error, it's stderr will be here
			//data  The compressed string, you write it out where you want it
			//extra The stderr (warnings are printed here in case you want to echo them
			fs.writeFile(dest, data , function(err){
				if (err){
					console.log("error");
				}else {
					console.log('It\'s saved!: ' + dest);
				}
			});
		});
	}else{
		console.log("File type not supported: " + file);
	}
	
}