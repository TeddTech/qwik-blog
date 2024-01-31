import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Footer from "../components/starter/footer/footer";
import Header from "../components/starter/header/header";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.builder.io/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	});
};

export const useServerTimeLoader = routeLoader$(() => {
	return {
		date: new Date().toISOString(),
	};
});

export default component$(() => {
	useStyles$(styles);
	return (
		<>
			<Header />
			<main class="flex flex-col items-center p-8 lg:px-24 min-h-screen">
				<div class="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
					<p class="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black lg:bg-none">
						<a href="/">Get started with Xata and Next.js</a>
					</p>
					<div class="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
						<a href="https://xata.io" class="w-20">
							<img
								src="https://raw.githubusercontent.com/xataio/examples/main/docs/app_logo.svg"
								width="100"
								height="100"
								alt=""
							/>
						</a>
					</div>
				</div>
				<Slot />
			</main>
			<Footer />
		</>
	);
});
