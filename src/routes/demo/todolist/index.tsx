import { component$ } from "@builder.io/qwik";
import {
	type DocumentHead,
	Form,
	routeAction$,
	routeLoader$,
	z,
	zod$,
} from "@builder.io/qwik-city";
import styles from "./todolist.module.css";

interface ListItem {
	text: string;
}

export const list: ListItem[] = [];

export const useListLoader = routeLoader$(() => {
	return list;
});

export const useAddToListAction = routeAction$(
	(item) => {
		list.push(item);
		return {
			success: true,
		};
	},
	zod$({
		text: z.string().trim().min(1),
	}),
);

export default component$(() => {
	const list = useListLoader();
	const action = useAddToListAction();

	return (
		<>
			<div class="container-center container">
				<h1>
					<span class="highlight">TODO</span> List
				</h1>
			</div>

			<div role="presentation" class="ellipsis" />

			<div class="container-center container">
				{list.value.length === 0 ? (
					<span class={styles.empty}>No items found</span>
				) : (
					<ul class={styles.list}>
						{list.value.map((item, index) => (
							<li key={`items-${index}`}>{item.text}</li>
						))}
					</ul>
				)}
			</div>

			<div class="container-center container">
				<Form action={action} spaReset>
					<input type="text" name="text" required class={styles.input} />{" "}
					<button type="submit" class="button-dark">
						Add item
					</button>
				</Form>

				<p class={styles.hint}>
					PS: This little app works even when JavaScript is disabled.
				</p>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: "Qwik Todo List",
};
