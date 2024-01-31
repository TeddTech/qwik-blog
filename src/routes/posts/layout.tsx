import { Slot, component$ } from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import type { Session } from "@auth/core/types";

// export const onRequest: RequestHandler = (event) => {
// 	const session: Session | null = event.sharedMap.get("session");
// 	if (!session || new Date(session.expires) < new Date()) {
// 		throw event.redirect(
// 			302,
// 			`/api/auth/signin?callbackUrl=${event.url.pathname}`,
// 		);
// 	}
// };

export default component$(() => {
	return (
		<>
			<p>Inner Layout</p>
			<Slot />
		</>
	);
});
