var fs = require('fs');
var bb = require('../../../index.js');

describe('physical exam', function () {
  it('with', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.physical_exam).toBeDefined();
    expect(result.data.physical_exam.wound_observations).not.toBeDefined();

    expect(result.data.physical_exam.subsections.length).toBe(1);
    expect(result.data.physical_exam.subsections[0].code.name).toBe('Physical findings of Skin');
    expect(result.data.physical_exam.subsections[0].title).toBe('SKIN, PHYSICAL FINDING');
  });

  it('without', function () {
    var xmlfile = fs.readFileSync(__dirname + '/without.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.physical_exam).not.toBeDefined();
  });
});
