import { join } from "path";
import sizeOf from "image-size";

export function getImageSizes({ post }: { post: any }) {
	const imageSizes: any = {};

	// A regular expression to iterate on all images in the post
	const iterator = post.content.matchAll(/\!\[.*]\((.*)\)/g);
	let match: IteratorResult<RegExpMatchArray, any>;
	while (!(match = iterator.next()).done) {
		const [, src] = match.value;
		try {
			// Images are stored in `public`
			const { width, height } = sizeOf(join("public", src));
			imageSizes[src] = { width, height };
		} catch (err) {
			console.error(`Can’t get dimensions for ${src}:`, err);
		}
	}

	return imageSizes;
}
