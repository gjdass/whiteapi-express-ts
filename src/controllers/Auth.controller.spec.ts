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

    @test("/api/v1/auth/login should authenticate an existing user and return a token")
    public ShouldAuthenticateUser(done: any) {
        chai.request(expressServer)
        .post("/api/v1/auth/login")
        .send({email: "test1@test.com", password: "test1"})
        .end((err: any, res: ChaiHttp.Response) => {
            expect(res.body.message).equal("Connected.");
            expect(res.body.datas).not.equal(undefined);
            expect(res.body.datas).to.have.property("token");
            expect(res.body.datas.token).not.equal(undefined);
            expect(res.body.datas.token).to.be.a("string");
            done();
        });
    }

    @test("/api/v1/auth/login should return an error on a non existing user")
    public ShouldNotAuthenticateUserIfItDoesNotExist(done: any) {
        chai.request(expressServer)
        .post("/api/v1/auth/login")
        .send({email: "troll@non-existing.com", password: "houhou"})
        .end((err: any, res: ChaiHttp.Response) => {
            expect(err.status).equal(404);
            const datas = err.response.body;
            expect(datas).not.equal(undefined);
            expect(datas.httpCode).equal(404);
            expect(datas.message).contain("User not found");
            done();
        });
    }

    // register UTs
}
