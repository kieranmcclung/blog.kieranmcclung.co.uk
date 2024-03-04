export default async function NotFound() {
	return (
		<div className="container mx-auto p-8 pb-16">
			<main>
				<div className="space-y-1 mb-12 md:mt-12">
					<h1 className="text-5xl md:text-6xl font-heading">Error 404</h1>
					<p className="font-heading text-2xl mb-2 tracking-wide">
						Sorry! This is awkward, but the page doesn&apos;t exist.
					</p>
				</div>
			</main>
		</div>
	);
}
