import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import fonts from "../src/fonts.js";
import frames from "../src/frames/index.js";
import mainLayout from "../src/layouts/main.js";
import { URLSearchParamsToObject } from '../modules/utils.js';

export default async (req) => {
    const url = new URL(req.url);
    const params = URLSearchParamsToObject(url.searchParams);
    const { message, frameName } = params;
    const targetFrame = frames[frameName];
    const frameMarkup = await targetFrame.content(message);
    const frameMarkupInLayout = mainLayout(frameMarkup, message)

    const svg = await satori(
        html(frameMarkupInLayout), 
        {
            width: 1200,
            height: 630,
            fonts: fonts,
        }
    );
    const svgBuffer = Buffer.from(svg);
    const png = sharp(svgBuffer).png();
    const response = await png.toBuffer();

    return new Response(response,
        {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000'
            }
        }
    );
}

export const config = {
    path: "/og-image"
};
