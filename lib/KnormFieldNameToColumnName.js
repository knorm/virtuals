const { Knorm } = require('@knorm/knorm');
const { name } = require('../package.json');

class KnormFieldNameToColumnName {
  constructor() {
    this.name = name;
  }

  updateModel(knorm) {
    const plugin = this;

    class FieldNameToColumnNameModel extends knorm.Model {
      static addField(fieldConfig) {
        if (fieldConfig.column || fieldConfig.virtual) {
          return super.addField(fieldConfig);
        }

        const config = this.getPluginOptions(plugin);
        const fieldNameToColumnName =
          config && config.enabled && config.fieldNameToColumnName;

        if (!fieldNameToColumnName) {
          return super.addField(fieldConfig);
        }

        const column = fieldNameToColumnName(fieldConfig);

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