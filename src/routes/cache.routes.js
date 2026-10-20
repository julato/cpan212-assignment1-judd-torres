import { Router } from 'express';

//import for cache statistics
import { getCacheStats } from '../lib/weather.js';
export const cacheRouter = Router();

//respond with { data: <the cache statistics> }.
cacheRouter.get('/cache/stats', (req, res) => {
  res.json({ data: getCacheStats()})
});
