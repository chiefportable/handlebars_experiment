import { Handlebars, HandlebarsConfig } from "$handlebars";
import { athletes } from "./data.ts";

const DEFAULT_HANDLEBARS_CONFIG: HandlebarsConfig = {
    baseDir: "views",
    extname: ".hbs",
    layoutsDir: "layouts/",
    partialsDir: "partials/",
    cachePartials: false,
    defaultLayout: "main",
    helpers: undefined,
    compilerOptions: undefined,
};

const handlebars = new Handlebars(DEFAULT_HANDLEBARS_CONFIG);

Deno.serve({ port: 8000, hostname: "127.0.0.1" }, async (req: Request) => {
    const { method, url } = req;

    const newUrl = new URL(url);

    if (newUrl.pathname === "/" && method === "GET") {
        const result: string = await handlebars.renderView("home", {
            athlete: athletes[Math.floor(Math.random() * athletes.length)],
            name: "Raymond Ghanney",
        });
        return new Response(result, {
            headers: {
                "content-type": "text/html",
            },
        });
    }

    // Handling error 404
    const index: string = await handlebars.renderView("index");
    return new Response(index, {
        status: 404,
        headers: {
            "content-type": "text/html",
        },
    });
});
