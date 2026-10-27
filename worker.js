// Wraps the OpenNext worker to cache optimized images: /_next/image responses
// had no Cache-Control, so phones re-downloaded every photo on each visit.
import handler from './.open-next/worker.js'

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from './.open-next/worker.js'

export default {
  async fetch(request, env, ctx) {
    const res = await handler.fetch(request, env, ctx)
    if (res.ok && new URL(request.url).pathname === '/_next/image') {
      const out = new Response(res.body, res)
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return out
    }
    return res
  },
}
