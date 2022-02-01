const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel.js');
const connection = require('../../models/connection');

describe('Verify productModels Functions', () => {
  describe('When getAll function is called', () => {
    describe('When the table is empty', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('return an array', async () => {
        const result = await productsModel.getAll();

        expect(result).to.be.an('array');
      }),

      it('return empty array', async () => {
        const result = await productsModel.getAll();

        expect(result).to.be.empty;
      });
    });

    describe('When the table is populated', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[
          {
            id: 1,
            name: 'Iphone 15',
            quantity: 10,
          }
        ]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('When the table is populated', async () => {
        const result = await productsModel.getAll();

        expect(result).to.be.an('array');
      })

      it('the array is not empty', async () => {
        const result = await productsModel.getAll();

        expect(result).to.not.be.empty;
      });

      it('the array has objects of type object', async () => {
        const result = await productsModel.getAll();

        result.map((item) => {
          expect(item).to.be.an('object');
        });
      });

      it('such items have the properties: "id", "name", "quantity"', async () => {
        const result = await productsModel.getAll();

        result.map((item) => {
          expect(item).to.include.all.keys('id', 'name', 'quantity');
        });
      });
    });
  });
});

