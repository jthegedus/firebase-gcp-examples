function generatePosts(data) {
	return data
		? data.documents.map((post) => {
				return {
					pid: post.name.split('/').pop(),
					title: post.fields.title.stringValue,
					blurb: post.fields.blurb.stringValue,
				};
		  })
		: [];
}

export { generatePosts };
