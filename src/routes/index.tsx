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
		const output = await xata.db.Posts.search(searchParamQuery, {
			fuzziness: 2,
		});
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
			<div class="mt-16 w-full max-w-5xl">
				<Form>
					<input
						name="q"
						defaultValue={searchParamQuery}
						placeholder="Search..."
						class="w-full rounded-lg p-2 text-blue-600 dark:text-purple-950"
					/>
				</Form>
			</div>
			<div class="mt-16 w-full max-w-5xl">
				{posts.value.length === 0 && <p>No blog posts found</p>}
				{posts.value.map((post) => (
					<div key={post.id} class="mb-16">
						<p class="mb-2 text-xs text-purple-950 dark:text-purple-200">
							{post.pubDate?.toDateString()}
						</p>
						<h2 class="mb-2 text-2xl">
							<a href={`posts/${post.slug}`}>{post.title}</a>
						</h2>
						<p class="mb-5 text-purple-950 dark:text-purple-200">
							{post.description}
						</p>
						<a
							href={`posts/${post.slug}`}
							class="w-fit rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
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
