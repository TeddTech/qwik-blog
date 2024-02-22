const config = {
	tag: false,
	branches: [
		{
			name: "prod3",
		},
		{
			name: "beta",
			prerelease: true,
		},
		{
			name: "alpha",
			prerelease: true,
		},
	],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		[
			"@semantic-release/changelog",
			{
				changelogFile: "docs/CHANGELOG.md",
				changelogTitle: "# Semantic Versioning Changelog",
			},
		],
		[
			"@semantic-release/git",
			{
				assets: ["dist/*.js", "dist/*.js.map", "docs/CHANGELOG.md", "package.json"],
				message:
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};

module.exports = config;
