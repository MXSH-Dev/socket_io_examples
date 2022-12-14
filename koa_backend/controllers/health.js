import Router from "koa-router";

export const healthRouter = new Router({
  prefix: "/api",
});

healthRouter.get("/health", async (ctx) => {
  ctx.status = 200;
  ctx.body = { status: "success" };
});
