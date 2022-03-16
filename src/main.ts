import express, { Express, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocs from "./swagger";
import {data} from "./data";
import resRouter from "./restaurantRouter";

class App {
    readonly app: Express = express();
    private port = process.env.PORT || 3030;
    private data = data;

    constructor () {

        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        this.app.use("/restaurants", resRouter);
        this.app.all("*", (req: Request, res: Response) => { res.send("page 404") });
        this.app.use((error, req: Request, res: Response) => { return res.send("something went wrong on the erver"); })
        
        this.app.listen({ port: this.port }, () => console.log(`server running at port ${ this.port }`))
    }

    public static init (): App {
        return new App();
    }

    public get getApp (): Express {
        return this.app;
    }
}

App.init();

export default App;
