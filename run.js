var fs = require('fs');
var path = require('path');
var bb = require('./');

// var file = path.join(__dirname, 'test/fixtures/parser-ccda/CCD_1.xml');
var file = path.join(__dirname, 'test/fixtures/parser-ccda/instructions.xml');
var xml = fs.readFileSync(file, {encoding: 'utf-8'});
var result = bb.parse(xml);

console.log(JSON.stringify(result, null, 2));
