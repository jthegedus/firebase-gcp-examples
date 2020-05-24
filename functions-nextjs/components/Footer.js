function Footer() {
	return (
		<>
			<footer>
				Powered by
				<a
					href="https://firebase.google.com/products/hosting"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/firebase-hosting.svg" alt="Firebase Hosting Logo" />
				</a>
				&
				<a
					href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src="/nextjs.svg" alt="Next.js Logo" className="nextjs" />
				</a>
			</footer>

			<style jsx>{`
				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				footer img {
					max-height: 72px;
					margin-left: 0.5rem;
				}

				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				footer img.nextjs {
					margin-left: 1rem;
					max-height: 48px;
				}
			`}</style>
		</>
	);
}

export default Footer;
