// Wraps the OpenNext worker: redirects http to https, and caches optimized images
// (/_next/image had no Cache-Control, so phones re-downloaded every photo).
import handler from './.open-next/worker.js'

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from './.open-next/worker.js'

export default {
  async fetch(request, env, ctx) {
    // http:// served the page as-is; send everyone to https.
    const url = new URL(request.url)
    if (url.protocol === 'http:' && !['localhost', '127.0.0.1'].includes(url.hostname)) {
      url.protocol = 'https:'
      return Response.redirect(url.toString(), 301)
    }
    const res = await handler.fetch(request, env, ctx)
    if (res.ok && url.pathname === '/_next/image') {
      const out = new Response(res.body, res)
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return out
    }
    return res
  },
}
