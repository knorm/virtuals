const knorm = require('@knorm/knorm');
const KnormFieldNameToColumnName = require('../lib/KnormFieldNameToColumnName');
const knormFieldNameToColumnName = require('..');
const expect = require('unexpected').clone();

const { KnormFieldNameToColumnNameError } = KnormFieldNameToColumnName;

describe('KnormFieldNameToColumnName', () => {
  describe('init', () => {
    it('throws if not passed a `Knorm` instance', () => {
      expect(
        () => new KnormFieldNameToColumnName().init(),
        'to throw',
        new KnormFieldNameToColumnNameError('no Knorm instance provided')
      );
    });

    it('throws if passed an invalid `Knorm` instance', () => {
      expect(
        () => new KnormFieldNameToColumnName().init({}),
        'to throw',
        new KnormFieldNameToColumnNameError('invalid Knorm instance provided')
      );
    });
  });

  describe('updateModel', () => {
    let Model;
    let User;

    before(() => {
      ({ Model } = knorm().use(
        knormFieldNameToColumnName({
          fieldNameToColumnName: ({ name }) => name.toUpperCase()
        })
      ));
    });

    beforeEach(() => {
      User = class extends Model {};
    });

    it("sets a field's column name from fieldNameToColumnName's return value", () => {
      User.fields = { id: { type: 'integer', name: 'id' } };
      expect(User.fields.id, 'to satisfy', { name: 'id', column: 'ID' });
    });

    it("does not override a field's column name", () => {
      User.fields = { id: { type: 'integer', name: 'id', column: '_id' } };
      expect(User.fields.id, 'to satisfy', { name: 'id', column: '_id' });
    });
  });
});
