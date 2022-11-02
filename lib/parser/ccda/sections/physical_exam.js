var shared = require("../shared");
var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();
var cleanup = require("../cleanup");

var exportPhysicalExamSection = function () {
  var physicalExamSection, lcwObservation, physicalExamComponent, authorParticipation, assignedAuthor, assignedPerson, representedOrganization;

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
      ["qualifier", "0..*", "qualifier"],
      ["code", "1..1"],
      ["codeSystem", "1..1"],
      ["value", "1..1", "value[@code]"]
    ]);
  authorParticipation = component.define("authorParticipation")
    .templateRoot("2.16.840.1.113883.10.20.22.4.119")
    .fields([
      ["time", "1..1", "h:time", shared.effectiveTime],
      ["", "1..1", "h:assignedAuthor"],
      ["assignedAuthor", "0..1", "assignedAuthor[@code]", assignedAuthor],
      ["representedOrganization", "0..*", "h:representedOrganization", representedOrganization]
  ]);
  lcwObservation = component.define("lcwObservation")
    // contained by physical exam section
    .templateRoot("2.16.840.1.113883.10.20.22.4.114")
    .fields([
      ["identifiers", "1..1", "h:observation/h:id", shared.Identifier],
      ["code", "1..1", "h:observation/h:code"],
      ["value", "1..1", "h:observation/h:value"],
      ["targetSiteCode", "0..1", "h:targetSiteCode", qualifier],
      ["authorParticipation", "0..*", "h:authorParticipation"]
    ]);

  physicalExamComponent = component.define("physicalExamComponent")
    .fields([
      ["code", "1..1", "h:code"],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
      ["section", "1..1", "h:section"]
    ]);

  physicalExamSection = component.define("physicalExamSection")
    .templateRoot("2.16.840.1.113883.10.20.2.10")
    .fields([
      ["identifiers", "1..1", "h:templateId", shared.Identifier],
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"],
      ["code", "1..1", "h:code[@codeSystem]"],
      ["entry", "0..*", "h:entry", lcwObservation],
      ["section", "1..1", "h:entry"],
      ["component", "0..*", "h:component", physicalExamComponent]
    ]);

    physicalExamSection.cleanupStep(cleanup.replaceWithField('text'));
    return physicalExamSection;
};
//How do you make something required if something else is missing? in the section file
exports.physicalExamSection = exportPhysicalExamSection;