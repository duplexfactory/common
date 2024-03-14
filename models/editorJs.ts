export type BlockType = "paragraph" | "header" | "image" | "pdf" | "html"

export interface P {
    id?: string
    type: "paragraph"
    data: { text: string }
}

export interface H2 {
    id?: string
    type: "header"
    data: { text: string, level: number }
}

export interface IMG {
    id?: string
    type: "image"
    data: {
        "file": {
            "url": string
        },
        "caption": "",
        "withBorder": false,
        "stretched": false,
        "withBackground": false
    }
}

export interface PDF {
    id?: string
    type: "pdf"
    data: { url: string }
}

export interface HTML {
    id?: string
    type: "html"
    data: { html: string }
}

export type Block = P | H2 | IMG | PDF | HTML;

export interface EditorJsContent {
    blocks: Block[],
    time?: number,
    version?: string
}
