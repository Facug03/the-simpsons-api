import type { Cache } from 'cache-manager'
import type { FastifyReply, FastifyRequest } from 'fastify'
import etag from 'etag'

export async function handleCache({
  req,
  res,
  cacheManager,
  cacheKey,
  ttlInMs,
  getData
}: {
  req: FastifyRequest
  res: FastifyReply
  cacheManager: Cache
  cacheKey: string
  ttlInMs: number
  getData: () => Promise<any>
}) {
  const cacheData = await cacheManager.get(cacheKey)
  const ttlInSeconds = ttlInMs / 1000
  const cacheControl = `public, max-age=${ttlInSeconds}`

  if (cacheData) {
    const etagGenerated = etag(JSON.stringify(cacheData), { weak: true })

    const ifNoneMatch = req.headers['if-none-match']

    if (ifNoneMatch === etagGenerated) {
      res.headers({
        'cache-control': cacheControl,
        'cache-status': 'HIT',
        etag: etagGenerated
      })
      return res.code(304).send()
    }

    res.headers({
      'cache-control': cacheControl,
      'Cache-status': 'HIT',
      etag: etagGenerated
    })
    return res.code(200).send(cacheData)
  }

  const data = await getData()
  await cacheManager.set(cacheKey, data, ttlInMs)
  const etagGenerated = etag(JSON.stringify(data), { weak: true })

  res.headers({
    'cache-control': cacheControl,
    'cache-status': 'MISS',
    etag: etagGenerated
  })
  return res.code(200).send(data)
}
