import client from 'prom-client';

const collectDefault = client.collectDefaultMetrics;
collectDefault({ timeout: 5000 });

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'] as const,
  buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]
});

export function metricsMiddleware(req: any, res: any, next: any) {
  const end = httpRequestDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    end({ status: res.statusCode });
  });
  next();
}

export function metricsEndpoint(req: any, res: any) {
  res.set('Content-Type', client.register.contentType);
  client.register.metrics().then((m) => res.send(m)).catch((e) => res.status(500).send(e.message));
}
