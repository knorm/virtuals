const KnormFieldNameToColumnName = require('./lib/KnormFieldNameToColumnName');
const knormFieldNameToColumnName = config =>
  new KnormFieldNameToColumnName(config);

knormFieldNameToColumnName.KnormFieldNameToColumnName = KnormFieldNameToColumnName;

module.exports = knormFieldNameToColumnName;
