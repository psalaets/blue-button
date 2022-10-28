var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportAssessmentSection = function () {
  var assessmentSection = component.define("assessmentSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.8")
    .fields([
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
    ]);

  return assessmentSection;
};

exports.assessmentSection = exportAssessmentSection;
