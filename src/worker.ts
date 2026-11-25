interface AssetsBinding {
  fetch(request: Request | string): Promise<Response>;
}

interface Env {
  ASSETS: AssetsBinding;
}

const LEGACY_REDIRECTS: Record<string, string> = {
  '/work/delivery-tracker': '/work/kite',
  '/work/budget': '/work/budget-overview',
  '/work/reminder': '/work/reminder-flow',
};

function normalizeRouteCase(pathname: string): string {
  return pathname.replace(/%[0-9A-Fa-f]{2}|[A-Z]+/g, (token) =>
    token.startsWith('%') ? token.toUpperCase() : token.toLowerCase(),
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Canonicalize www.lehoanganh.id.vn -> lehoanganh.id.vn (308 Permanent Redirect)
    if (url.hostname === 'www.lehoanganh.id.vn') {
      url.hostname = 'lehoanganh.id.vn';
      return Response.redirect(url.toString(), 308);
    }

    // Normalize uppercase route characters while preserving RFC 3986 uppercase percent-escapes
    if (!url.pathname.startsWith('/assets/')) {
      const normalizedPath = normalizeRouteCase(url.pathname).replace(/\/{2,}/g, '/');
      if (normalizedPath !== url.pathname) {
        url.pathname = normalizedPath;
        return Response.redirect(url.toString(), 301);
      }
    }

    // Redirect legacy case-study aliases
    const cleanPath = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
    const aliasTarget = LEGACY_REDIRECTS[cleanPath];
    if (aliasTarget) {
      url.pathname = aliasTarget;
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const isDirect404 = cleanPath === '/404' && response.status === 200;
    const isPreviewHost = url.hostname.endsWith('.workers.dev');

    if (!isDirect404 && !isPreviewHost) {
      return response;
    }

    const headers = new Headers(response.headers);
    if (isPreviewHost) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return new Response(response.body, {
      status: isDirect404 ? 404 : response.status,
      statusText: isDirect404 ? 'Not Found' : response.statusText,
      headers,
    });
  },
};
