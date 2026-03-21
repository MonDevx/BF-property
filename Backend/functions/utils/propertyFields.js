/**
 * Extract the standard property listing fields from a Firestore document.
 * @param {FirebaseFirestore.DocumentSnapshot} doc
 * @param {Object} [options]
 * @param {boolean} [options.includeStatus] - include `status` field
 * @param {boolean} [options.includeImages] - include `urlimginside` / `urlimgoutside` fields
 * @returns {Object}
 */
const propertyFields = (doc, { includeStatus = false, includeImages = false } = {}) => {
  const d = doc.data();
  const fields = {
    id: doc.id,
    name: d.name,
    propertysize: d.propertysize,
    numberofbathrooms: d.numberofbathrooms,
    numberofbedrooms: d.numberofbedrooms,
    price: d.price,
    zipCode: d.zipCode,
    province: d.province,
    subDistrict: d.subDistrict,
    district: d.district,
    address: d.address,
    idtype: d.idtype,
    firstimg: d.firstimg,
  };
  if (includeStatus) fields.status = d.status;
  if (includeImages) {
    fields.urlimginside = d.urlimginside;
    fields.urlimgoutside = d.urlimgoutside;
  }
  return fields;
};

module.exports = propertyFields;
