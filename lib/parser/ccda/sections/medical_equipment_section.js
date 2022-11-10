"use strict";

var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");
var bbm = require("@amida-tech/blue-button-meta");

var exportMedicalEquipmentSection = function (version) {
  var sectionIDs = bbm.CCDA["sections" + version];
  var clinicalStatementsIDs = bbm.CCDA["statements" + version];

  var productInstance = component
    .define('product_instance')
    .templateRoot(['2.16.840.1.113883.10.20.22.4.37'])
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["code", "0..1", "h:playingDevice/h:code", shared.ConceptDescriptor],
    ])

  var entry = component
    .define('entry')
    .templateRoot([
      '2.16.840.1.113883.10.20.22.4.50', // Non-medicinal supply activity
      '2.16.840.1.113883.10.20.22.4.135', // Medical Equipment Organizer template 
      '2.16.840.1.113883.10.20.22.4.14' // Procedure Activity Procedure V2
    ])
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["status", "0..1", "h:statusCode/@code"],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["quantity", "0..1", "h:quantity/@value"],
      ["product_instance", "0..1", productInstance.xpath(), productInstance],
      ["text", "0..1", "h:code/h:originalText|h:text", shared.TextWithReference],
      ["target_site","0..1", "h:targetSiteCode", shared.ConceptDescriptor],
    ])

  var medical_equipment_section = component
    .define('medical_equipment_section')
    .templateRoot([sectionIDs.MedicalEquipmentSection, '2.16.840.1.113883.10.20.22.4.50', '2.16.840.1.113883.10.20.22.2.23'])
    .fields([
      ["entry", "0..*", entry.xpath(), entry],
    ])
    .cleanupStep(cleanup.replaceWithField('entry'));

  return [medical_equipment_section];
};

exports.medicalEquipmentSection = exportMedicalEquipmentSection;
