import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = async (event) => {
	if (isDev) return; // Will not return CSP headers in dev mode

	const nonce = Date.now().toString(36); // Your custom nonce logic here
	event.sharedMap.set("@nonce", nonce);

	const csp = [
		`default-src 'self'`,
		`base-uri 'self'`,
		`font-src 'self' https: data:`,
		`form-action 'self'`,
		`frame-ancestors 'self'`,
		`img-src 'self' https://raw.githubusercontent.com/ https://authjs.dev/img/providers/ data:`,
		`object-src 'none'`,
		`script-src 'self' https: 'nonce-${nonce}' 'strict-dynamic'`,
		`frame-src 'self' 'nonce-${nonce}'`,
		`script-src-attr 'none'`,
		`style-src 'self' https: 'unsafe-inline'`,
		"upgrade-insecure-requests",
	];

	event.headers.set("Content-Security-Policy", csp.join("; "));
	event.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
	event.headers.set("Cross-Origin-Opener-Policy", "same-origin");
};
