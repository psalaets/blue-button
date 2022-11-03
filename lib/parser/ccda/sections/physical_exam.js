var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportPhysicalExamSection = function () {
  var physicalExamSection, lcwObservation, physicalExamComponent, authorParticipation, assignedAuthor, assignedPerson, representedOrganization,
      peSection, woundMeasurementObservation, numberPressureUlcersObservationEntry, NPUObservationEntry, highestPressureUlcerStage;

  representedOrganization = component.define("representedOrganization")
    .fields([
      ["name", "0..*", "h:assignedAuthor/name"],
      ["telecom", "0..*", "h:assignedAuthor/telecom"],
      ["addr", "0..*", "h:assignedAuthor/addr"],
    ]);
  assignedPerson = component.define("assignedPerson")
    .fields([
      ["name", "0..*", "name"]
    ]);

  assignedAuthor = component.define("assignedAuthor")
    .fields([
      ["id", "1..*", "h:id", shared.Identifier],
      ["assignedPerson", "1..1", "h:observation/*/h:assignedPerson", assignedPerson]
    ]);
  qualifier = component.define("qualifier")
    .fields([
      ["qualifier", "0..*", "h:qualifier"],
      ["name", "1..1"],
      ["value", "1..1", "h:value[@code]"]
    ]);
  authorParticipation = component.define("authorParticipation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.119")
    .fields([
      ["time", "1..1", "h:time", shared.effectiveTime],
      ["assignedAuthor", "0..1", "h:assignedAuthor[@code]", assignedAuthor],
      ["representedOrganization", "0..*", "h:representedOrganization", representedOrganization]
  ]);
  woundMeasurementObservation = component.define("woundMeasurementObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.133")
    .fields([
      ["id", "1..*", "h:id", shared.effectiveTime],
      ["effectiveTime", "1..1", "h:effectiveTime", shared.effectiveTime],
      ["code", "1..1", "h:code"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"]
  ]);
  woundCharacteristic = component.define("woundCharacteristic")
    .templateRoot("2.16.840.1.113883.10.20.22.4.134")
    .fields([
      ["id", "1..*", "h:id", shared.effectiveTime],
      ["effectiveTime", "1..1", "h:effectiveTime", shared.effectiveTime],
      ["code", "1..1", "h:code[@code][@codeSystem]"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"]
  ]);
  NPUObservationEntry = component.define("NPUObservationEntry")
    .fields([
      ["code", "1..1", "h:code"],
      ["value", "1..1", "h:observation[@classCode][@moodCode]"],
      ["observation", "1..1", "h:observation", NPUObservationEntry]
    ]);
  numberPressureUlcersObservationEntry = component.define("numberPressureUlcersObservationEntry")
    .fields([
      ["code", "1..1", "h:code"],

    ]);
  numberPressureUlcersObservation = component.define("numberPressureUlcersObservation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.76")
    .fields([
      ["id", "1..*", "h:id", shared.effectiveTime],
      ["effectiveTime", "1..1", "h:effectiveTime", shared.effectiveTime],
      ["code", "1..1", "h:code[@code][@codeSystem]"],
      ["statusCode", "1..1", "h:statusCode"],
      ["value", "1..1", "h:value"],
      ["author", "0..1", "h:author"],
  ]);
  highestPressureUlcerStage = component.define("highestPressureUlcerStage")
    .templateRoot("2.16.840.1.113883.10.20.22.4.77")
    .fields([
      ["id", "1..*", "h:id", shared.effectiveTime],
      ["code", "1..1", "h:code[@code][@codeSystem]"],
      ["value", "1..1", "h:value"]
  ]);
  lcwObservation = component.define("lcwObservation")
    // contained by physical exam section
    .templateRoot("2.16.840.1.113883.10.20.22.4.114")
    .fields([
      ["identifiers", "1..1", "h:observation/h:id", shared.Identifier],
      ["code", "1..1", "h:observation/h:code"],
      ["value", "1..1", "h:observation/h:value"],
      ["targetSiteCode", "0..1", "h:targetSiteCode", qualifier],
      ["authorParticipation", "0..*", "h:authorParticipation", authorParticipation],
      ["entryRelationship", "0..*", "h:entryRelationship/h:observation",
        [
          woundMeasurementObservation,
          woundCharacteristic,
          numberPressureUlcersObservation,
          numberPressureUlcersObservationEntry,
          highestPressureUlcerStage
        ]
      ],
    ]);

  peSection = component.define("peSection")
    .fields([
      ["code", "1..1", "h:code"],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"]
    ]);
  physicalExamComponent = component.define("physicalExamComponent")
    .fields([
      ["section", "1..1", "h:section", peSection]
    ]);

  physicalExamSection = component.define("physicalExamSection")
    .templateRoot("2.16.840.1.113883.10.20.2.10")
    .fields([
      ["identifiers", "1..1", "h:templateId", shared.Identifier],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
      ["code", "1..1", "h:code[@code][@codeSystem]"],
      // ["observation", "0..*", "h:observation"],
      // ["section", "1..1", "h:section/h:text"],
      ["entry", "0..*", "h:component", physicalExamComponent],
      ["observation", "0..*", "h:entry", lcwObservation]
    ]);

    // physicalExamSection.cleanupStep(cleanup.replaceWithField('observation'));
    return physicalExamSection;
};

exports.physicalExamSection = exportPhysicalExamSection;