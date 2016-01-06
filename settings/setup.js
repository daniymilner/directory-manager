"use strict";

let traceur = require('traceur');
require('traceur-source-maps').install(traceur);
traceur.require.makeDefault((filePath) => {
	return !~filePath.indexOf('node_modules')
});