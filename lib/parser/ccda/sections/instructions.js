var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportInstructionsSection = function () {
  var instructionsSection;
  var entry;
  instruction = component.define("instruction")
    .templateRoot("2.16.840.1.113883.10.20.22.4.20")
    .fields([
      ["identifiers", "1..1", "h:templateId", shared.Identifier],
      ["code", "1..1", "h:code"]
    ]);

  instructionsSection = component.define("instructionsSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.45")
    .fields([
      ["identifiers", "1..1", "h:templateId", shared.Identifier],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
      ["code", "1..1", "h:code[@codeSystem]"],
    //   ["reference", "1..*", "h:entry/h:act/h:reference", instruction],
      ["entry", "0..*", "h:section/*[not(@nullFlavor)]", instruction]
    ]);

    instructionsSection.cleanupStep(cleanup.replaceWithField('text'));
    return instructionsSection;
};
//How do you make something required if something else is missing? in the section file
exports.instructionsSection = exportInstructionsSection;