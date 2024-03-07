import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = async (event) => {
	if (isDev) return; // Will not return CSP headers in dev mode

	const nonce = Date.now().toString(36); // Your custom nonce logic here
	event.sharedMap.set("@nonce", nonce);

	const fetchProviders = await fetch(`${event.url.origin}/api/auth/providers`);
	if (!fetchProviders.ok) {
		throw new Error(
			`Failed to fetch Provider Images: ${fetchProviders.statusText}`,
		);
	}

	const providers = await fetchProviders.json();
	const provider_images = Object.keys(providers)
		.map(
			(provider) =>
				`https://authjs.dev/img/providers/${provider}.svg https://authjs.dev/img/providers/${provider}-dark.svg`,
		)
		.join(" ");

	const csp = [
		`default-src 'self'`,
		`base-uri 'self'`,
		`font-src 'self' https: data:`,
		`form-action 'self'`,
		`frame-ancestors 'self'`,
		`img-src 'self' https://raw.githubusercontent.com/ ${provider_images} data:`,
		`object-src 'none'`,
		`script-src 'self' https: 'nonce-${nonce}' 'strict-dynamic'`,
		`frame-src 'self' 'nonce-${nonce}'`,
		`script-src-attr 'none'`,
		`style-src 'self' https: 'unsafe-inline'`,
		"upgrade-insecure-requests",
	];

	event.headers.set("Content-Security-Policy", csp.join("; "));
};
