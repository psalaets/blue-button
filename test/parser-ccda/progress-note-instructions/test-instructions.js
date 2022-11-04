var fs = require('fs');
var bb = require('../../../index.js');

describe('instructions', function () {
  it('none due to null flavor', function () {
    var xmlfile = fs.readFileSync(__dirname + '/null-flavor.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.instructions).not.toBeDefined();
  });

  it('with one', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with-one.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.instructions.length).toBe(1);

    var instruction = result.data.instructions[0];
    expect(instruction.code).toEqual({
      code: "171044003",
      code_system_name: "SNOMED CT",
      name: "immunization education"
    });
  });

  it('with many', function () {
    var xmlfile = fs.readFileSync(__dirname + '/with-many.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    expect(result.data.instructions.length).toBe(2);
  });
});
