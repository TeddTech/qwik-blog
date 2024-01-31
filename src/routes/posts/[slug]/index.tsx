import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { getXataClient } from "~/xata";

import type { RequestHandler } from "@builder.io/qwik-city";

import type { Session } from "@auth/core/types";

export const onRequest: RequestHandler = (event) => {
	const session: Session | null = event.sharedMap.get("session");
	if (!session || new Date(session.expires) < new Date()) {
		throw event.redirect(
			302,
			`/api/auth/signin?callbackUrl=${event.url.pathname}`,
		);
	}
};

export const useBlogPost = routeLoader$(async (requestEvent) => {
	const xata = getXataClient();
	const rq = await xata.db.Posts.filter({
		slug: requestEvent.params.slug,
	}).getFirst();
	return rq;
});

export default component$(() => {
	const post = useBlogPost();
	return (
		<div class="w-full max-w-5xl mt-16">
			<p>{post.value?.keyword}</p>
			<p class="mb-2">
				<Link href="/" class="text-purple-600">
					&larr; Back to blog
				</Link>
			</p>

			<h1 class="text-3xl mb-2 text-start">{post.value?.title}</h1>
			<p class="text-sm mb-4 text-purple-950 dark:text-purple-200">
				{post.value?.pubDate?.toDateString()}
			</p>
			<p class="text-xl">{post.value?.description}</p>
		</div>
	);
});
