const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

describe('Verify productServices Functions', () => {
  describe('When getAll function is called', () => {
    describe('When the table is empty', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves([]);
      });

      after(() => {
        productsModel.getAll.restore();
      });

      it('return an array', async () => {
        const result = await productsService.getAll();

        expect(result).to.be.an('array');
      })

      it('return empty array', async () => {
        const result = await productsService.getAll();

        expect(result).to.be.empty;
      })
    });
    describe('When the table is populated', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves([
          {
            id: 1,
            name: 'Iphone 15',
            quantity: 10,
          }
        ]);
      });

      after(() => {
        productsModel.getAll.restore();
      });

      it('return an array', async () => {
        const result = await productsService.getAll();

        expect(result).to.be.an('array');
      });

      it('the array is not empty', async () => {
        const result = await productsService.getAll();

        expect(result).to.not.be.empty;
      });

      it('the array has objects of type object', async () => {
        const result = await productsService.getAll();

        result.map((item) => {
          expect(item).to.be.an('object');
        });
      });

      it('such items have the properties: "id", "name", "quantity"', async () => {
        const result = await productsService.getAll();

        result.map((item) => {
          expect(item).to.have.all.keys('id', 'name', 'quantity');
        });
      });
    });
  });
});
