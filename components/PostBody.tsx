"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import markdownStyles from "../app/markdown-styles.module.css";

type Props = {
	content: string;
	imageSizes: Record<string, { width: number; height: number }>;
};

type MarkdownComponents = {
	code: (props: any) => JSX.Element;
	img: (props: any) => JSX.Element;
};

const PostBody = ({ content, imageSizes }: Props) => {
	const MarkdownComponents: MarkdownComponents = {
		code({ node, inline, className, children, ...props }) {
			const match = /language-(\w+)/.exec(className || "");
			return !inline && match ? (
				<SyntaxHighlighter language={match[1]} style={dracula} {...props}>
					{String(children).replace(/\n$/, "")}
				</SyntaxHighlighter>
			) : (
				<code className={className} {...props}>
					{children}
				</code>
			);
		},
		img: (props: any) => {
			// if props.src not undefined
			if (props.src && imageSizes[props.src]) {
				const { src, alt } = props;
				const { width, height } = imageSizes[props.src];
				return (
					<Image src={src} alt={alt ? alt : ""} width={width} height={height} />
				);
			} else {
				// If we don’t have the image’s dimensions, let’s use a classic
				// `img` element.
				return <img {...props} />;
			}
		},
	};

	return (
		<ReactMarkdown
			className={markdownStyles["markdown"]}
			components={MarkdownComponents}
		>
			{content}
		</ReactMarkdown>
	);
};

export default PostBody;
