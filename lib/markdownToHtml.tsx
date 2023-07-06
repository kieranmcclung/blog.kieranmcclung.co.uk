import { remark } from "remark";
import html from "remark-html";

// import remarkPrism from "remark-prism";

// import "prismjs/themes/prism-okaidia.css";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

export default async function markdownToHtml(markdown: string) {
	const result = await remark()
		.use(html)
		// .use(remarkPrism, { plugins: ["line-numbers"] })
		.process(markdown);
	return result.toString();
}
