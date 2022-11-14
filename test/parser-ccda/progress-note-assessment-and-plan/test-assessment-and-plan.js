var fs = require('fs');
var bb = require('../../../index.js');

describe('assessment and plan', function () {
  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment_plan).not.toBeDefined();
  });

  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.assessment_plan.length).toBe(1);
  });
});
