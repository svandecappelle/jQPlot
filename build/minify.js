var fs = require('fs');
var compressor = require('yuicompressor');

var sigKill = 0;

main();

function main(){
	if (process.argv.indexOf("--help") !== -1 || process.argv.indexOf("-h") !== -1 && process.argv.length < 3){
		usage();
		sigKill = 1;
	}

	if (sigKill == 0){
		cleanRoutine();
	}

	if(sigKill == 0){
		building();
	}
}

function building(){
	console.log("Starting uglifier");
	process.argv.forEach(function (pluginDir, index, array) {
		if (index > 1) {
			if (pluginDir.lastIndexOf("--core")>-1){
				try {
					uglify('core', "");
				}catch (e){
					console.error("Error on uglifying");
				}
			}else if(pluginDir ==="--all-plugins"){
				console.log("Building all plugins: ");
				foldersToBuild = fs.readdirSync('src/plugins/');
				foldersToBuild.forEach(function (file, index, array){
					console.log("Building "+file);
					uglify('plugins', file);
				});
			}else{
				uglify('plugins', pluginDir);
			}
		}
	});
}

function cleanRoutine(){
	process.argv.forEach(function (pluginDir, index, array) {
		if (index > 1){
			if (process.argv.indexOf("--clean")>-1 && pluginDir.lastIndexOf("--clean")==-1){
				console.log("cleaning generated prod files...");
				
				if(process.argv.indexOf("--core")>-1){
					console.log("Cleaning core");
					cleanFolder('build/dist/core/');
				}else{
					if(pluginDir==="--all-plugins"){
						console.log("Cleaning all plugins: ");
						foldersToClean = fs.readdirSync('dist/plugins/');
						foldersToClean.forEach(function (file, index, array){
							console.log("Cleaning "+file);
							cleanFolder('build/dist/plugins/' + file +'/');
						});
					}else{
						console.log("Cleaning plugin - : " + pluginDir);
						cleanFolder('build/dist/plugins/' + pluginDir+'/');
					}
				}
				
				sigKill = 1;
			}
		}
	});
}

function usage(){
	console.log("Usage: \n");
	console.log("node minify.js [Options]");
	console.log("Options: ");
	console.log("\t--core: Build all core files.");
	console.log("\t--all-plugins: Build all plugins files.");
	console.log("\tplugins-name: Build a single plugins files (using is name).");
	console.log("\t--clean: Clean a plugin or the core.");
	console.log("\t\t--core: Clean the core.");
	console.log("\t\t--all-plugins: Clean all plugins.");
	console.log("\t\tplugin-name: Clean the plugin named 'plugin-name'.");
	console.log("\t--help|-h: Show this Usage.");
}

function uglify(folder, pluginDir){
	if (['core','plugins'].indexOf(folder)>-1){
		var srcFolder = 'src/'+folder+'/' + pluginDir + '/';
		var distFolder = 'build/dist/'+folder+'/' + pluginDir + '/';
		
		if(!fs.existsSync(distFolder)){
			fs.mkdirSync(distFolder);
		}
		
		filesToUglify = fs.readdirSync('./src/'+folder+'/' + pluginDir);

		filesToUglify.forEach(function (file, index, array){
			if(file.lastIndexOf(".min.")==-1 && notInProtectedFiles(file)){
				console.log("Minify : " + file);
				
				src = srcFolder + file;
				dest = (distFolder + file).replace('.js', '.min.js')
				dest = dest.replace('.css', '.min.css')
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
