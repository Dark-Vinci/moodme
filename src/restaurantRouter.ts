import express, { Request, Response, Router } from "express";

import { data as Restaurant } from "./data";

class RestaurantRouter {
    private router = express.Router();

    constructor () {
        this.router.get("/:id", async (req: Request, res: Response) => {
            const restaurant_id = req.params.id as string;

            const restaurant = Restaurant.find(el => el.restaurant_id == restaurant_id)

            if (!restaurant) {
                return res.status(400).json({ data: null, message: 'not found' });
            }

            return res.json({ data: restaurant, message: "success" });
        });

        this.router.get("/", async (req: Request, res: Response) => {
            const q = req.query.q as unknown as number || 1;
            const n = req.query.n as unknown as number || 3;

            const toSkip = (q - 1) * n;

            const restaurants = Restaurant.slice(toSkip, toSkip + n)

            return res.json({ data: restaurants, message: "success" });
        });
    }

    public static init (): Router {
        const routeClass = new RestaurantRouter()
        return routeClass.router;
    }
}

export default RestaurantRouter.init();