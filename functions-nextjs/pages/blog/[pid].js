import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FirestoreBlogPostsURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts`;

export async function getStaticPaths() {
	// by returning an empty list, we are forcing each page to be rendered on request.
	// these pages will be rendered on first request.
	// the resultant .html and .json will be cached by the CDN, with the following cache headers
	// cache-control: public,max-age=31536000,stale-while-revalidate
	// this means that the user will receive the pre-computed page on each request
	// and then each page will be recomputed behind the scenes. This means our Cloud Function will
	// be called per request increasing our costs.

	// firebase hosting deployment should invalidate these cached values
	// additionally, a new `next build` will create a new Build ID which is
	// used in the path for the returned .json data file.
	return {
		paths: [],
		fallback: true,
	};
}

// This function gets called at on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps({ params }) {
	try {
		// Call an external API endpoint to get posts.
		const res = await fetch(`${FirestoreBlogPostsURL}/${params.pid}`); // grabs the whole document with the provided document id (in this case pid)
		const post = await res.json();
		// By returning { props: posts }, the Blog component
		// will receive `posts` as a prop at build time
		return {
			props: {
				post: {
					pid: params.pid,
					title: post.fields.title.stringValue,
					blurb: post.fields.blurb.stringValue,
					content: post.fields.content.stringValue, // html content should be sanitized before using React's dangerouslySetInnerHTML
				},
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error(error);
		return { props: {} };
	}
}

// posts will be populated by getStaticProps() at either:
// - build time
// - first request
function Post({ post }) {
	const router = useRouter();

	if (!router.isFallback && !post) {
		return <Error statusCode={404} title="No Blog Post with the provided ID" />;
	}

	if (router.isFallback) {
		return (
			<div className="container">
				<main>
					<div>Loading...</div>
				</main>
			</div>
		);
	}

	return (
		<div className="container">
			<Head>
				<title>{post.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
				<h1 className="title">{post.title}</h1>
				<p className="description">{post.blurb}</p>
				<ul>
					<li>
						SSG page with <code>getStaticProps()</code> &{" "}
						<code>getStaticPaths()</code> with <code>fallback:true</code>
					</li>
					<li>
						page is rendered server-side on <em>first</em> request
					</li>
					<li>fallback loading page is rendered if no CDN cache of page</li>
					<li>
						post data is fetched from Firestore server-side using next.js
						polyfilled <code>fetch</code>
					</li>
					<li>
						page is cached on CDN with the following cache-controls:
						<code>
							'Cache-Control',s-maxage=31536000, stale-while-revalidate
						</code>
					</li>
					<ul>
						<li>CDN cached result is served if possible</li>
						<li>
							behind the scenes, requests are made to the Next.js server to
							refresh the page content
						</li>
						<li>
							stale while revalidate is not ideal for these types of pages as we
							probably don't want to call the Cloud Function in the background
							on every request. It is slightly better than SSR, but still
							expensive.
						</li>
						<li>
							SSR at least lets us set the Cache-Control settings ourselves, so
							we can not send <code>stale-while-revalidate</code>
						</li>
					</ul>
				</ul>
				<div dangerouslySetInnerHTML={{ __html: post.content }} />
			</main>

			<Footer />

			<style jsx>{`
				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.title a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.25rem;
					font-size: 1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
						DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>

			<style jsx global>{`
				main {
					max-width: 800px;
					margin: 20px auto 0px auto;
				}
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}

export default Post;
