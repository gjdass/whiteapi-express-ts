import { suite, test } from "mocha-typescript";
import * as chai from "chai";
import expressServer from "../App";
import chaiHttp = require("chai-http");

const assert = chai.assert;
const expect = chai.expect;

@suite("HomeController tests")
class HomeControllerTests {

    // FixtureSetUp
    public static before(): void {
        chai.use(chaiHttp);
    }

    @test("A dumb test")
    public ShouldBeDumbTrue() {
        const variable = "Hey there ! I'm a dummy test. What are you ?";
        expect(variable).to.be.a("string");
        expect(variable).to.have.length(variable.length);
    }

    @test("/api/v1 should return Hello world")
    public ShouldReturnHelloWorld() {
        chai.request(expressServer)
        .get("/api/v1/")
        .end((err: any, res: ChaiHttp.Response) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.equal("Hello world !");
        });
    }

}
