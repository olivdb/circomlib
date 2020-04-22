const chai = require("chai");
const path = require("path");

const tester = require("circom").tester;

const assert = chai.assert;

describe("AND test", function () {

    this.timeout(100000000);

    let circuit;
    before( async() => {
        circuit = await tester(path.join(__dirname, "and.test.circom"));
    });

    it("Should 1 AND 1 = 1", async () => {
        const witness = await circuit.calculateWitness({ "a": "1", "b": "1" }, true);
        await circuit.assertOut(witness, {out: 1});
    });

    it("Should 1 AND 0 = 0", async () => {
        const witness = await circuit.calculateWitness({ "a": "1", "b": "0" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

    it("Should 0 AND 1 = 1", async () => {
        const witness = await circuit.calculateWitness({ "a": "0", "b": "1" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

    it("Should 0 AND 0 = 0", async () => {
        const witness = await circuit.calculateWitness({ "a": "0", "b": "0" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

});
