var fs = require('fs');
var bb = require('../../../index.js');

describe('Medication Immunization medication information', function () {
  it('nested in dispense', function () {
    var xmlfile = fs.readFileSync(__dirname + '/in-dispense.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    var product = result.data.medications[0].dispense.product;

    console.log(product);

    expect(product.manufacturer).toBe('Medication Factory Inc.');
    expect(product.manufactured_material.code.name).toBe('Proventil 0.09 MG/ACTUAT inhalant solution');
  });

  it('nested in supply', function () {
    var xmlfile = fs.readFileSync(__dirname + '/in-supply.xml', 'utf-8').toString();
    var result = bb.parse(xmlfile);

    var product = result.data.medications[0].supply.product;
    expect(product.manufacturer).toBe('Medication Factory Inc.');
    expect(product.manufactured_material.code.name).toBe('Proventil 0.09 MG/ACTUAT inhalant solution');
  });
});
