const config = {
	name: "some-name",
	description: "some description",
	tagFormat: "v${nextRelease.version}-alpha",
	branches: ["main"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		[
			"@semantic-release/changelog",
			{
				changelogFile: "docs/CHANGELOG.md",
			},
		],
		[
			"@semantic-release/git",
			{
				assets: ["dist/*.js", "dist/*.js.map", "docs/CHANGELOG.md"],
				message:
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};

module.exports = config;
