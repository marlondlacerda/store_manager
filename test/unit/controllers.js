const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

const salesControllers = require('../../controllers/salesController');
const salesService = require('../../services/salesService');

describe('Verify productControllers Functions', () => {
  describe('When getAll function is called', () => {
    const fakeReq = {};
    const fakeRes = {};

    describe('When the table is empty', () => {
      before(() => {
        sinon.stub(productsService, 'getAll').resolves([]);

        fakeReq.body = {};
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.stub().returns();
      });

      after(() => {
        productsService.getAll.restore();
      });

      it('return status "200"', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.status.calledWith(200)).to.be.true;
      });

      it('return one JSON with an array', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
      });
    });
    describe('When the table is populated', () => {
      before(() => {
        sinon.stub(productsService, 'getAll').resolves([
          {
            id: 1,
            name: 'Iphone 15',
            quantity: 10,
          }
        ]);

        fakeReq.body = {};
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.stub().returns();
      });

      after(() => {
        productsService.getAll.restore();
      });

      it('return status "200" ', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.status.calledWith(200)).to.be.true;
      });

      it('return one JSON with array', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(sinon.match.array)).to.be.true;
      });

      it('return array contains an object', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        const thirdCallArguments = fakeRes.json.args[2];
        const firstArgument = thirdCallArguments[0];
        const product = firstArgument[0];

        expect(product).to.be.an('object');
      });
    });
  });
});

describe('Verify salesControllers Functions', () => {
  describe('When getAll function is called', () => {
    const fakeReq = {};
    const fakeRes = {};

    describe('When the table is empty', () => {})
      before(() => {
        sinon.stub(salesService, 'getAll').resolves([]);

        fakeReq.body = {};
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.stub().returns();
      });

      after(() => {
        salesService.getAll.restore();
      });

      it('return status "200"', async () => {
        await salesControllers.getAll(fakeReq, fakeRes);

        expect(fakeRes.status.calledWith(200)).to.be.true;
      });
  });
});
