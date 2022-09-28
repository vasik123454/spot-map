import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("create", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
    }),
    async resolve({ ctx, input }) {
      await ctx.client.users.create({
        email: input.email,
        password: input.password,
        passwordConfirm: input.passwordConfirm,
      });

      await ctx.client.users.authViaEmail(input.email, input.password);

      ctx.res.setHeader("set-cookie", ctx.client.authStore.exportToCookie());

      return {
        token: ctx.client.authStore.exportToCookie(),
      };
    },
  })
  .query("getAuthMethods", {
    async resolve({ ctx }) {
      const authMethods = await ctx.client.users.listAuthMethods();

      return authMethods;
    },
  })
  .query("auth", {
    async resolve({ ctx }) {
      ctx.client.authStore.loadFromCookie(ctx.req.headers.cookie as string);

      const user = await ctx.client.users.getOne(ctx.client.authStore.model?.id as string);

      console.log(user);

      return user;
    },
  });