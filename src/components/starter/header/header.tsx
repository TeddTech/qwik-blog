import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

import { Form } from "@builder.io/qwik-city";
import {
	useAuthSession,
	useAuthSignin,
	useAuthSignout,
} from "~/routes/plugin@auth";

export default component$(() => {
	const session = useAuthSession();
	const signIn = useAuthSignin();
	const signOut = useAuthSignout();

	return (
		<header class={styles.header}>
			<div class={["container", styles.wrapper]}>
				<div class={styles.logo}>
					<a href="/" title="qwik">
						<QwikLogo height={50} width={143} />
					</a>
				</div>
				<ul>
					<li>
						<a
							href="https://qwik.builder.io/docs/components/overview/"
							target="_blank"
							rel="noreferrer"
						>
							Docs
						</a>
					</li>
					<li>
						<a
							href="https://qwik.builder.io/examples/introduction/hello-world/"
							target="_blank"
							rel="noreferrer"
						>
							Examples
						</a>
					</li>
					<li>
						<a
							href="https://qwik.builder.io/tutorial/welcome/overview/"
							target="_blank"
							rel="noreferrer"
						>
							Tutorials
						</a>
					</li>
					<li>
						{session.value?.user?.email ? (
							<Form action={signIn}>
								<button class="bg-purple-400">Sign In</button>
							</Form>
						) : (
							<Form action={signOut}>
								<button class="bg-purple-400">Sign Out</button>
							</Form>
						)}
					</li>
				</ul>
			</div>
		</header>
	);
});
