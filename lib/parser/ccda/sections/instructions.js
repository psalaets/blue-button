var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportInstructionsSection = function () {
  var instruction = component.define("instruction")
    .templateRoot("2.16.840.1.113883.10.20.22.4.20")
    .fields([
      ["code", "1..1", "h:code", shared.ConceptDescriptor]
    ]);

  var instructionsSection = component.define("instructionsSection")
    .fields([
      ["instructions", "0..*", "h:entry/h:act", instruction]
    ])
    .cleanupStep(cleanup.replaceWithField('instructions'));

  instructionsSection.setXPath(".//h:section[not(@nullFlavor)]/h:templateId[@root='2.16.840.1.113883.10.20.22.2.45']/..");
  return instructionsSection;
};

exports.instructionsSection = exportInstructionsSection;
