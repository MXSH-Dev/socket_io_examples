import combineRouters from "koa-combine-routers";

import { healthRouter } from "./controllers/health.js";

export const combinedRoutes = combineRouters(
  healthRouter,
);
