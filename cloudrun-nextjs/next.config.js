module.exports = {
	target: "serverless",
	env: {
		FIREBASE_PROJECT_ID: 'TODO_YOUR_PROJECT_ID_HERE',
	},
	experimental: {
		sprFlushToDisk: false,
	},
};
