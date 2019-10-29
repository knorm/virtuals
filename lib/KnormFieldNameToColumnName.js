const { Knorm } = require('@knorm/knorm');

class KnormFieldNameToColumnName {
  constructor({
    name = 'field-name-to-column-name',
    fieldNameToColumnName
  } = {}) {
    this.name = name;
    this.fieldNameToColumnName = fieldNameToColumnName;
  }

  updateModel(knorm) {
    const { fieldNameToColumnName } = this;

    class FieldNameToColumnNameModel extends knorm.Model {
      static addField(fieldConfig) {
        if (fieldConfig.column || fieldConfig.virtual) {
          return super.addField(fieldConfig);
        }

        const column = fieldNameToColumnName(fieldConfig, this);

        return super.addField({ ...fieldConfig, column });
      }
    }

    knorm.updateModel(FieldNameToColumnNameModel);
  }

  init(knorm) {
    if (!knorm) {
      throw new this.constructor.KnormFieldNameToColumnNameError(
        'no Knorm instance provided'
      );
    }

    if (!(knorm instanceof Knorm)) {
      throw new this.constructor.KnormFieldNameToColumnNameError(
        'invalid Knorm instance provided'
      );
    }

    this.updateModel(knorm);
  }
}

class KnormFieldNameToColumnNameError extends Knorm.KnormError {}

KnormFieldNameToColumnName.KnormFieldNameToColumnNameError = KnormFieldNameToColumnNameError;

module.exports = KnormFieldNameToColumnName;
