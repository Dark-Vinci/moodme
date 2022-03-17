import request from "supertest";
import Restaurant from "../src/model";
import { data } from "./resObject";
import { Express } from "express";

let server: Express;

describe("/restaurants/:id", () => {
    beforeEach(async () => {
        const App = await import("../src/main");
        // @ts-ignore
        const app = App.init();
        server = app.getApp();
    });

    afterEach( async () => {
        // @ts-ignore
        await server.close();
        await Restaurant.remove({});
    });

    describe ("/restaurants/id", async () => {
        let resId: any;
        const exec = async (id: string) => await request(server).get(`/api/restaurants/${ id }`);

        beforeEach(async () => {
            const res = new Restaurant(data[0]);
            await res.save();
            resId = res.id;
        });

        it("should return a 400 with invalid object id", async () => {
            const response = await exec("12avcwk");

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("invalid id")
        });

        it("should return a 404 thats not in the db", async () => {
            const fakeId ="6232ac67aed2ba9b89d1df01"
            const response = await exec(fakeId);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('not found')
        });

        it("should return the found object in the body of response", async () => {
            const response = await exec(resId);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.data).toHaveProperty("_id");
        });
    });

    describe ("/restaurants", async () => {
        const exec = async () => await request(server).get(`/api/restaurants`);

        beforeEach(async () => {
            const res = new Restaurant(data[0]);
            await res.save();
        });

        it("should return the found object in the body of response", async () => {
            const response = await exec();

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('success');
            expect(response.body.length).toBe(1);
        });
    })
});