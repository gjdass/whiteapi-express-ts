import { suite, test } from "mocha-typescript";
import * as chai from "chai";
import expressServer from "./App";
import chaiHttp = require("chai-http");

const assert = chai.assert;
const expect = chai.expect;

@suite("App tests")
class AppTests {

    // FixtureSetUp
    public static before() {
        chai.use(chaiHttp);
    }

    @test("Should return 404")
    public ShouldReturn404(): void {
        chai.request(expressServer)
        .get("/unknownRoute")
        .end((err, res: ChaiHttp.Response) => {
            expect(err).not.to.be.equal(undefined);
            expect(err.status).to.be.equal(404);
        });
    }

}
