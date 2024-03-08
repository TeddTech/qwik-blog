import type { Provider } from "@auth/core/providers";
import AppleProvider from "@auth/core/providers/apple";
import Credentials from "@auth/core/providers/credentials";
// import EmailProvider from "@auth/core/providers/email";
import Facebook from "@auth/core/providers/facebook";
import Google from "@auth/core/providers/google";
import Instagram from "@auth/core/providers/instagram";
import Spotify from "@auth/core/providers/spotify";
import { XataAdapter } from "@auth/xata-adapter";
import { serverAuth$ } from "@builder.io/qwik-auth";
import { getXataClient } from "~/xata";
const client = getXataClient();

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
	serverAuth$(({ env }) => ({
		secret: env.get("AUTH_SECRET"),
		trustHost: true,
		// @ts-ignore
		adapter: XataAdapter(client),
		providers: [
			// Sign in with Music
			Spotify({
				clientId: env.get("SPOTIFY_CLIENT_ID"),
				clientSecret: env.get("SPOTIFY_CLIENT_SECRET"),
				allowDangerousEmailAccountLinking: true,
			}),
			AppleProvider({
				name: "Apple Music",
				clientId: env.get("APPLE_ID"),
				clientSecret: env.get("APPLE_SECRET") || "defaultClientSecret",
				allowDangerousEmailAccountLinking: true,
			}),
			{
				id: "soundcloud",
				name: "SoundCloud",
				type: "oauth",
				version: "2.0",
				authorization: `https://api.soundcloud.com/connect?client_id=${env.get(
					"SOUNCLOUD_CLIENT_ID",
				)}&redirect_uri=${env.get("SOUNDCLOUD_REDIRECT_URI")}&response_type=code`,
				params: { grant_type: "authorization_code" },
				token: "https://api.soundcloud.com/oauth2/token",
				authorizationUrl: "https://api.soundcloud.com/connect?response_type=code",
				userinfo: "https://api.soundcloud.com/me",
				profile(profile) {
					return {
						id: profile.id,
						name: profile.full_name,
						username: profile.username,
						image: profile.avatar_url,
					};
				},
				// ...options,
			},
			{
				id: "tidal",
				name: "Tidal",
				type: "oauth",
				version: "2.0",
				authorization: {
					// https://auth.tidal.com/v1/oauth2/device_authorization
					url: "https://login.tidal.com/authorize",
					// params: {
					// 	// scope: "user.info.basic,video.list",
					// 	response_type: "code",
					// 	client_key: env.get("TIDAL_CLIENT_KEY"),
					// 	// redirect_uri: "https://url/api/auth/signin",
					// },
				},
				token: {
					url: "https://auth.tidal.com/v1/oauth2/token",
					// params: {
					// 	client_key: env.get("TIDAL_CLIENT_KEY"),
					// 	client_secret: env.get("TIDAL_CLIENT_SECRET"),
					// 	grant_type: "authorization_code",
					// },
				},
				userinfo: "https://openapi.tidal.com/users",
				profile(profile) {
					return {
						id: profile.id,
						name: profile.full_name,
						username: profile.username,
						image: profile.avatar_url,
					};
				},
			},
			{
				// Sign in with Social
				id: "tiktok",
				name: "TikTok",
				type: "oauth",
				version: "2.0",
				clientId: env.get("TIKTOK_CLIENT_KEY"),
				clientSecret: env.get("TIKTOK_CLIENT_SECRET"),
				authorization: {
					url: "https://www.tiktok.com/auth/authorize/",
					params: {
						scope: "user.info.basic,video.list",
						response_type: "code",
						client_key: env.get("TIKTOK_CLIENT_KEY"),
						redirect_uri: "https://url/api/auth/signin",
					},
				},
				token: {
					url: "https://open-api.tiktok.com/oauth/access_token/",
					params: {
						client_key: env.get("TIKTOK_CLIENT_KEY"),
						client_secret: env.get("TIKTOK_CLIENT_SECRET"),
						grant_type: "authorization_code",
					},
				},
				userinfo: "https://open-api.tiktok.com/user/info/",
				profile(profile) {
					return {
						profile: profile,
						id: profile.open_id,
					};
				},
				checks: ["state"],
				allowDangerousEmailAccountLinking: true,
			},
			// Tiktok({
			// 	clientId: env.get("TIKTOK_CLIENT_KEY"),
			// 	clientSecret: env.get("TIKTOK_CLIENT_SECRET"),
			// }),
			Instagram({
				clientId: env.get("INSTAGRAM_CLIENT_ID"),
				clientSecret: env.get("INSTAGRAM_CLIENT_SECRET"),
				allowDangerousEmailAccountLinking: true,
			}),
			Facebook({
				clientId: env.get("FACEBOOK_CLIENT_ID"),
				clientSecret: env.get("FACEBOOK_CLIENT_SECRET"),
				allowDangerousEmailAccountLinking: true,
			}),
			Google({
				clientId: env.get("GOOGLE_CLIENT_ID"),
				clientSecret: env.get("GOOGLE_CLIENT_SECRET"),
				allowDangerousEmailAccountLinking: true,
			}),
			Credentials({
				name: "LiveLine",
				credentials: {
					username: { label: "Username", type: "text" },
					password: { label: "Password", type: "password" },
				},
				async authorize() {
					// console.log("CREDENTIALS", credentials);
					// console.log("REQ", req);
					// Add logic here to look up the user from the credentials supplied
					const user = {
						id: "1",
						name: "Mike",
						email: "mike@example.com",
					};

					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					if (user) {
						// Any object returned will be saved in `user` property of the JWT
						return user;
					}
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
				},
			}),
			// EmailProvider({
			// 	from: env.SMTP_FROM,
			// 	sendVerificationRequest: async ({ identifier, url, provider }) => {
			// 		const user = await db.user.findUnique({
			// 			where: {
			// 				email: identifier,
			// 			},
			// 			select: {
			// 				emailVerified: true,
			// 			},
			// 		});

			// 		const templateId = user?.emailVerified
			// 			? env.POSTMARK_SIGN_IN_TEMPLATE
			// 			: env.POSTMARK_ACTIVATION_TEMPLATE;
			// 		if (!templateId) {
			// 			throw new Error("Missing template id");
			// 		}

			// 		const result = await postmarkClient.sendEmailWithTemplate({
			// 			TemplateId: parseInt(templateId),
			// 			To: identifier,
			// 			From: provider.from as string,
			// 			TemplateModel: {
			// 				action_url: url,
			// 				product_name: siteConfig.name,
			// 			},
			// 			Headers: [
			// 				{
			// 					// Set this to prevent Gmail from threading emails.
			// 					// See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
			// 					Name: "X-Entity-Ref-ID",
			// 					Value: new Date().getTime() + "",
			// 				},
			// 			],
			// 		});

			// 		if (result.ErrorCode) {
			// 			throw new Error(result.Message);
			// 		}
			// 	},
			// }),
		] as Provider[],
	}));
