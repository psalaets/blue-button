var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportAssessmentSection = function () {
  var assessmentSection;

  assessmentSection = component.define("assessmentSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.8")
    .fields([
      ["text", "1..1", "h:text"],
    ]);

    assessmentSection.cleanupStep(cleanup.replaceWithField('text'));
    return assessmentSection;
};


exports.assessmentSection = exportAssessmentSection;
