import { Container } from "typedi";
import { suite, test } from "mocha-typescript";
import * as chai from "chai";
import expressServer from "../App";
import chaiHttp = require("chai-http");
import { UserServiceMock } from "../services/User.service.mock";

const assert = chai.assert;
const expect = chai.expect;

@suite("UsersController tests")
class UsersControllerTests {

    // FixtureSetUp
    public static before(): void {
        chai.use(chaiHttp);
        // we don't want to use the real service reaching a real data provider
        Container.set("user.service", new UserServiceMock());
    }

    @test("/api/v1/users should return a list of users")
    public ShouldReturnAllUsers(done: any) {
        chai.request(expressServer)
        .get("/api/v1/users")
        .end((err: any, res: ChaiHttp.Response) => {
            expect(res.body.length).to.equal(2);
            done();
        });
    }

    @test("/api/v1/users/1 should return user number 1")
    public ShouldReturnOneUser(done: any) {
        chai.request(expressServer)
        .get("/api/v1/users/1")
        .end((err: any, res: ChaiHttp.Response) => {
            expect(res.body.id).to.equal(1);
            expect(res.body.id).to.equal(1);
            expect(res.body.email).to.equal("test1@test.com");
            done();
        });
    }

}
