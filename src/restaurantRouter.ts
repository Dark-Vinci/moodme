import express, { 
    Request, 
    Response,
    Router, 
    NextFunction 
} from "express";
import mongoose from "mongoose";

import Restaurant from "./model";

class RestaurantRouter {
    private router = express.Router();

    constructor () {
        // route handler for getting a restaurant object by its id
        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const restaurant_id = req.params.id;
                
                // cehck for valid object id
                if (!mongoose.isValidObjectId(restaurant_id)) {
                    return res.status(400).json({ data: null, message: 'invalid id' });
                }

                const restaurant = await Restaurant.findById(restaurant_id);

                // restaurant not found
                if (!restaurant) {
                    return res.status(404).json({ data: null, message: 'not found' });
                }

                // object found and returned as json
                return res.json({ data: restaurant, message: "success" });
            } catch (ex) {
                // server error
                next(ex);
            }
        });

        // handler for getting list of restaurant object
        this.router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                // pageSize and pageNumber pagination with default of 10 and 1 respectively
                const pageNumber = req.query.pageNumber as unknown as number || 1;
                const pageSize = req.query.pageSize as unknown as number || 10;

                // number of document to be skipped
                const toSkip = (pageNumber - 1) * pageSize;

                const restaurants = await Restaurant.find()
                    .limit(pageSize).skip(toSkip)

                // returned json object
                return res.json({ data: restaurants, message: "success" });
            } catch (ex) {
                next(ex);
            }
        });
    }

    // static object for returing the router object
    public static init (): Router {
        const routeClass = new RestaurantRouter()
        return routeClass.router;
    }
}

export default RestaurantRouter.init();