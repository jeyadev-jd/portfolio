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
    // Pre-built pages are kept in Cloudflare's edge cache for 10 minutes: waking the
    // Next.js server on every visit took 1-2 s before the first byte.
    const cacheable = request.method === 'GET' && !url.pathname.startsWith('/_next/') &&
      !request.headers.has('rsc') && !request.headers.get('cookie')?.includes('__prerender_bypass')
    const cache = caches.default
    if (cacheable) {
      const hit = await cache.match(request)
      if (hit) return hit
    }
    const res = await handler.fetch(request, env, ctx)
    if (cacheable && res.status === 200 && res.headers.get('x-nextjs-cache') === 'HIT' && !res.headers.has('set-cookie')) {
      const out = new Response(res.body, res)
      out.headers.set('Cache-Control', 'public, max-age=0, s-maxage=600')
      ctx.waitUntil(cache.put(request, out.clone()))
      return out
    }
    if (res.ok && url.pathname === '/_next/image') {
      const out = new Response(res.body, res)
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return out
    }
    return res
  },
}
