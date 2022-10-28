var component = require("@amida-tech/blue-button-xml").component.withNullFlavor();

var exportChiefComplaintSection = function () {
  var chiefComplaintSection = component.define("chiefComplaintSection")
    .templateRoot(["1.3.6.1.4.1.19376.1.5.3.1.1.13.2.1"])
    .fields([
      ["title", "1..1", "h:title"],
      ["text", "1..1", "h:text"]
    ]);

  return chiefComplaintSection;
};

exports.chiefComplaintSection = exportChiefComplaintSection;
