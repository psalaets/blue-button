var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportSubjectiveSection = function () {
  var subjectiveSection = component.define("subjectiveSection")
    .templateRoot("2.16.840.1.113883.10.20.21.2.2")
    .fields([
      ["text", "1..1", "h:text"],
    ]);

    subjectiveSection.cleanupStep(cleanup.replaceWithField('text'));
    return subjectiveSection;
};

exports.subjectiveSection = exportSubjectiveSection;
