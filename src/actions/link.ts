import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const link = {
  getAll: defineAction({
    handler: async (_, context) => {
      const DB = context.locals.runtime.env.DB;
    }
  }),

  getStats: defineAction({
    handler: async (_, context) => {
      const DB = context.locals.runtime.env.DB;
      return {
        total: 15,
        friends: 5,
        tools: 8,
      }
    }
  })
}