var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportMentalStatusSection = function () {
  var mentalStatusObservation;
  var mentalStatusSection;
  var assessmentScaleObservation;

  assessmentScaleObservation = component.define("assessmentScaleObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.69")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
    ]);

  mentalStatusOrganizer = component.define("mentalStatusOrganizer")
    .templateRoot("2.16.840.1.113883.10.20.22.4.74")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["assessment", "1..*", "h:observation", assessmentScaleObservation]
    ]);
  mentalStatusObservation = component.define("mentalStatusObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.74")
    .fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
      ["value", "1..1", "h:value[@xsi:type='CD']/@displayName"],
      ["organizer", "1..*", "h:organizer", mentalStatusOrganizer]
    ]);

  mentalStatusSection = component.define("mentalStatusSection")
    .templateRoot("2.16.840.1.113883.10.20.22.2.56")
    .fields([
      ["organizer", "0..*", "h:entry/h:observation", mentalStatusObservation]
    ]);
    mentalStatusSection.cleanupStep(cleanup.replaceWithField('organizer'));
    return [mentalStatusSection, mentalStatusObservation];

};

exports.mentalStatusSection = exportMentalStatusSection;
