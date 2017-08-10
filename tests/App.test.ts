import { suite, test, slow, timeout } from "mocha-typescript";
import * as chai from "chai";

const assert = chai.assert;
const expect = chai.expect;

@suite("A suite")
class Two {
    @test("A test")
    public method() {
        const variable = "hey there ! we are rebuilding proper tests !";
        expect(variable).to.be.a("string");
    }
}
