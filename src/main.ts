import { Handlebars, HandlebarsConfig } from "$handlebars";

const handlebars = new Handlebars();

const result: string = await handlebars.renderView("index", { name: "Alonso" });

Deno.serve((req: Request) => {
    return new Response(result, {
        status: 200,
        headers: {
            "content-type": "text/html",
        },
    });
});
