const glob = require('glob');

module.exports = (app) => {
	glob(`${__dirname}/*/*Routes.js`, {}, (er, files) => {
		if (er) throw er;
		else{
			console.log("add routes");
			
			files.forEach((file) => {
				console.log(`${file}`);
				require(file)(app);		
			});
		}
	});
};
