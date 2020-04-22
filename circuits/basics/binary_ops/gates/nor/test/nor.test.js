const path = require("path");
const tester = require("circom").tester;

describe("NOR test", function () {

    this.timeout(100000000);

    let circuit;
    before( async() => {
        circuit = await tester(path.join(__dirname, "nor.test.circom"));
    });

    it("Should NOT(1 OR 1) = 0", async () => {
        const witness = await circuit.calculateWitness({ "a": "1", "b": "1" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

    it("Should NOT(1 OR 0) = 0", async () => {
        const witness = await circuit.calculateWitness({ "a": "1", "b": "0" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

    it("Should NOT(0 AND 1) = 0", async () => {
        const witness = await circuit.calculateWitness({ "a": "0", "b": "1" }, true);
        await circuit.assertOut(witness, {out: 0});
    });

    it("Should NOT(0 AND 0) = 1", async () => {
        const witness = await circuit.calculateWitness({ "a": "0", "b": "0" }, true);
        await circuit.assertOut(witness, {out: 1});
    });

});
