var fs = require('fs');
var bb = require('../../../index.js');

describe('medical equipment section', function () {
  it('Non-medicinal supply activity', function () {
    var xmlfile = fs.readFileSync(__dirname + '/implant-udi-organizer.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

  it('implant organizer unknown', function () {
    var xmlfile = fs.readFileSync(__dirname + '/implant-udi-unknown.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

  it('implant without procedure', function () {
    var xmlfile = fs.readFileSync(__dirname + '/implant-without-procedure.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

  it('multi implant', function () {
    var xmlfile = fs.readFileSync(__dirname + '/multiple-implants.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

  it('no implanted devices', function () {
    var xmlfile = fs.readFileSync(__dirname + '/no-implanted-devices.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

  it('non-medicinal supply', function () {
    var xmlfile = fs.readFileSync(__dirname + '/non-medicinal-supply-cane-and-eyeglasses.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);
    // console.log(JSON.stringify(result.data.medical_devices, null ,"  "))
    expect(result.data.medical_devices).toBeDefined();
  });

});
