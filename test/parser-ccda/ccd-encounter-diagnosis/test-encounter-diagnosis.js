var fs = require('fs');
var bb = require('../../../index.js');

describe('Encounter Diagnosis', function () {
  it('with none', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with-none.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.encounters[0].diagnoses).not.toBeDefined();
  });

  it('with one', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with-one.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.encounters[0].diagnoses.length).toBe(1);
  });

  it('with many', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with-many.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    expect(result.data.encounters[0].diagnoses.length).toBe(2);
  });
});
