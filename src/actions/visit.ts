import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { getUserId } from './session';

export const visit = {
  record: defineAction({
    input: z.object({
      url: z.string(),
      referer: z.string().optional(),
      userAgent: z.string().optional(),
    }),
    handler: async (input, context) => {
      const url = new URL(input.url);
      const DB = context.locals.runtime.env.DB;
      await DB.prepare('INSERT INTO Visits (UserId, Origin, Pathname, Search, Referer, UserAgent) VALUES (?, ?, ?, ?, ?, ?)')
        .bind(getUserId(context), url.origin, url.pathname, url.search, input.referer, input.userAgent)
        .run();
      return {};
    }
  }),
  getStats: defineAction({
    input: z.object({
      pathname: z.string()
    }),
    handler: async (input, context) => {
      const DB = context.locals.runtime.env.DB;
      const now = new Date();
      const row = await DB.prepare(
        `SELECT
          (SELECT COUNT(*) FROM Visits WHERE Pathname = ?1) AS PageVisits,
          (SELECT COUNT(*) FROM Visits WHERE Pathname = ?1 AND VisitTime >= ?2) AS MonthlyPageVisits,
          (SELECT COUNT(*) FROM Visits) AS SiteVisits,
          (SELECT COUNT(*) FROM Visits WHERE VisitTime >= ?2) AS MonthlySiteVisits,
          (SELECT COUNT(DISTINCT UserId) FROM Visits) AS SiteVisitors,
          (SELECT COUNT(DISTINCT UserId) FROM Visits WHERE VisitTime >= ?2) AS MonthlySiteVisitors
        `)
        .bind(input.pathname, Math.floor(new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000))
        .first() as {
          PageVisits: number;
          MonthlyPageVisits: number;
          SiteVisits: number;
          MonthlySiteVisits: number;
          SiteVisitors: number;
          MonthlySiteVisitors: number;
        };
      return [
        row.PageVisits,
        row.MonthlyPageVisits,
        row.SiteVisits,
        row.MonthlySiteVisits,
        row.SiteVisitors,
        row.MonthlySiteVisitors
      ];
    }
  })
}