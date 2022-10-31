var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportObjectiveSection = function () {
  var objectiveSection;

  objectiveSection = component.define("objectiveSection")
    .templateRoot("2.16.840.1.113883.10.20.21.2.1")
    .fields([
      ["text", "1..1", "h:text"],
    ]);

    objectiveSection.cleanupStep(cleanup.replaceWithField('text'));
    return objectiveSection;
};


exports.objectiveSection = exportObjectiveSection;
