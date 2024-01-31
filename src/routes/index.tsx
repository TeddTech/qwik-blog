import { component$ } from "@builder.io/qwik";
import {
	type DocumentHead,
	Form,
	routeLoader$,
	useLocation,
} from "@builder.io/qwik-city";
import { getXataClient } from "~/xata";

export const useBlogPosts = routeLoader$(async (e) => {
	const xata = getXataClient();
	const searchParamQuery = e.url.searchParams.get("q");
	let rq = null;
	if (searchParamQuery) {
		const output = await xata.db.Posts.search(searchParamQuery, { fuzziness: 2 });
		rq = output.records;
	} else {
		rq = await xata.db.Posts.getAll();
	}
	return rq;
});

export default component$(() => {
	const posts = useBlogPosts();
	const loc = useLocation();
	const searchParamQuery = loc.url.searchParams.get("q") || "";

	return (
		<>
			<div class="w-full max-w-5xl mt-16">
				<Form>
					<input
						name="q"
						defaultValue={searchParamQuery}
						placeholder="Search..."
						class="w-full rounded-lg p-2 dark:text-purple-950 text-blue-600"
					/>
				</Form>
			</div>
			<div class="w-full max-w-5xl mt-16">
				{posts.value.length === 0 && <p>No blog posts found</p>}
				{posts.value.map((post) => (
					<div key={post.id} class="mb-16">
						<p class="text-xs mb-2 text-purple-950 dark:text-purple-200">
							{post.pubDate?.toDateString()}
						</p>
						<h2 class="text-2xl mb-2">
							<a href={`posts/${post.slug}`}>{post.title}</a>
						</h2>
						<p class="text-purple-950 dark:text-purple-200 mb-5">
							{post.description}
						</p>
						<a
							href={`posts/${post.slug}`}
							class="px-4 py-2 font-semibold text-sm bg-purple-700 text-white rounded-lg shadow-sm w-fit"
						>
							Read more &rarr;
						</a>
					</div>
				))}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: "Welcome to Qwik",
	meta: [
		{
			name: "description",
			content: "Qwik site description",
		},
	],
};
