import express, { Express, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";
import config from "config";

import swaggerDocs from "./swagger";
import resRouter from "./restaurantRouter";

class App {
    readonly app: Express = express();
    private port = process.env.PORT || 3030;

    constructor () {
        this.connectDB();

        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        this.app.use("/api/restaurants", resRouter);
        this.app.all("*", (req: Request, res: Response) => { res.send("page 404") });
        this.app.use((error, req: Request, res: Response) => { return res.send("something went wrong on the erver"); })
        
        this.app.listen({ port: this.port }, () => console.log(`server running at port ${ this.port }`))
    }

    private async connectDB (): Promise<void> {
        try{
            const dbURI = config.get("db") as string;

            await mongoose.connect(dbURI);
            console.log("connected to the db")
        } catch(ex) {
            console.log('couldnt connect');
            // process.exit(1);
        }
    }

    public static init (): App {
        return new App();
    }

    public getApp (): Express {
        return this.app;
    }
}

App.init();

export default App;

