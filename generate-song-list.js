const fs = require('fs');

fs.readdir('./songs', { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    const directoriesInDIrectory = files
        .filter((item) => item.isDirectory())
        .map((item) => item.name);

	directoriesInDIrectory.forEach(element => {
		console.log(element);
	});
});