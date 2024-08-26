import {Block} from "@models/editorJs";


export interface BlockRenderData {
    id?: string
    tag: string
    attributes?: Record<string, string>,
    content?: string,
    htmlContent?: boolean
}

export function renderBlock(block: Block): BlockRenderData {
    switch (block.type) {
        case "header":
            return {
                id: block.id,
                tag: `h${block.data.level}`,
                content: block.data.text
            };
        case "paragraph":
            return {
                id: block.id,
                tag: "p",
                content: block.data.text,
                htmlContent: true
            };
        case "image":
            const classes: string[] = [];
            if (block.data.stretched) classes.push("stretched");
            if (block.data.withBackground) classes.push("with-background");
            if (block.data.withBorder) classes.push("with-border");

            return {
                id: block.id,
                tag: "figure",
                content: `
                    <img class="${classes.join(" ")}" src="${block.data.file.url}"/>
                    ${block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : ""}
                `,
                htmlContent: true
            };
        case "pdf":
            return {
                id: block.id,
                tag: "iframe",
                attributes: {
                    src: block.data.url
                }
            };
        case "html":
            return {
                id: block.id,
                tag: "div",
                content: block.data.html,
                htmlContent: true
            };
        default:
            return {
                id: "",
                tag: "div"
            };
    }
}
