import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const blog = {
  getPostMetadata: defineAction({
    input: z.object({
      slug: z.string()
    }),
    handler: async (input, context) => {
      const DB = context.locals.runtime.env.DB;
    }
  }),

  getPostHtml: defineAction({
    input: z.object({
      slug: z.string()
    }),
    handler: async (input, context) => {
      const DB = context.locals.runtime.env.DB;
    }
  }),

  getStats: defineAction({
    handler: async (_, context) => {
      const DB = context.locals.runtime.env.DB;
      return {
        total: 100,
        createdThisMonth: 5,
        updatedThisMonth: 8
      }
    }
  }),

  getRecommendedPosts: defineAction({
    input: z.object({
      limit: z.number().min(1).max(20).default(5)
    }),
    handler: async (input, context) => {
      const DB = context.locals.runtime.env.DB;
    }
  })
}