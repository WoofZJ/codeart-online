import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const message = {
  getStats: defineAction({
    handler: async (_, context) => {
      const DB = context.locals.runtime.env.DB;
      return {
        total: 100,
        comments: 20,
        messages: 80,
      }
    }
  })
}