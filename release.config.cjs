const config = {
	branches: [
		{
<<<<<<< HEAD
			name: "main",
=======
			name: "prod",
>>>>>>> 1ef7a193d103dca0e12e52da25dfa3e5953670ec
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
					"chore(release): ${nextRelease.version}-alpha [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};

module.exports = config;
