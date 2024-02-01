// Generated by Xata Codegen 0.28.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
	BaseClientOptions,
	SchemaInference,
	XataRecord,
} from "@xata.io/client";

const tables = [
	{
		name: "Posts",
		columns: [
			{ name: "title", type: "string" },
			{ name: "slug", type: "string" },
			{ name: "description", type: "text" },
			{ name: "pubDate", type: "datetime" },
			{ name: "keyword", type: "multiple" },
			{ name: "color", type: "string", unique: true },
		],
	},
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Posts = InferredTypes["Posts"];
export type PostsRecord = Posts & XataRecord;

export type DatabaseSchema = {
	Posts: PostsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
	databaseURL:
		"https://Tedd-Tech-s-workspace-emdl7m.us-west-2.xata.sh/db/setup-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
	constructor(options?: BaseClientOptions) {
		super({ ...defaultOptions, ...options }, tables);
	}
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
	if (instance) return instance;

	instance = new XataClient();
	return instance;
};
