import type { RequestHandler } from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";

export const onRequest: RequestHandler = async (event) => {
	if (isDev) return; // Will not return CSP headers in dev mode

	const nonce = Date.now().toString(36); // Your custom nonce logic here
	event.sharedMap.set("@nonce", nonce);
};
