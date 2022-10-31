var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportInstructionsSection = function () {
  var instructionsSection;
  var entry;
  instruction = component.define("instruction")
    .templateRoot("2.16.840.1.113883.10.20.22.4.20")
    .fields([
      ["identifiers", "1..1", "h:id", shared.Identifier],
      ["code", "1..1", "h:code"]
    ]);
/*   entry = component.define("entry")
  .templateRoot("2.16.840.1.113883.10.20.22.4.20")
  .fields([
    ["identifiers", "1..1", "h:id", shared.Identifier],
    ["entry", "1..1", "h:text", instruction]
  ]); */
  instructionsSection = component.define("instructionsSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.45")
    .fields([
      ["identifiers", "1..1", "h:id", shared.Identifier],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
    //   ["reference", "1..*", "h:entry/h:act/h:reference", instruction],
      ["entry", "1..*", "h:text", instruction]// this is required if @nullflavor is missing
    ]);

    instructionsSection.cleanupStep(cleanup.replaceWithField('entry'));
    return instructionsSection;
};
//How do you make something required if something else is missing? in the section file
exports.instructionsSection = exportInstructionsSection;