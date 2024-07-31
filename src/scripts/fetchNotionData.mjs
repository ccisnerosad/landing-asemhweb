import { NotionToMarkdown } from "notion-to-md";
import notion from "./notion.mjs";
export const prerender = true;
const n2m = new NotionToMarkdown({ notionClient: notion });

const databaseId = "bd470448a59d4fad9f97111ca8104a51";

// Function to get database records and convert content to Markdown
export async function getDatabaseRecordsInMarkdown() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // Extract the fields and convert content to Markdown
    const records = await Promise.all(
      response.results.map(async (page) => {
        const mdblocks = await n2m.pageToMarkdown(page.id);
        const mdString = n2m.toMarkdownString(mdblocks);

        return {
          idd: page.id || "No ID",
          //norma tipo titulo
          norma: page.properties.norma.title[0]?.text?.content || "No Norma",
          title:
            page.properties.title.rich_text[0]?.text?.content || "No Title",
          content: mdString,
          //header url
          header: page.properties.header.files?.[0]?.file?.url || "No Header",
          //card url
          card: page.properties.card?.files?.[0]?.file?.url || "No Card",
          //fuente texto
          fuente:
            page.properties.fuente.rich_text[0]?.text?.content || "No Fuente",
          //color_principal texto hexadecimal
          color_principal:
            page.properties.color_principal.rich_text[0]?.text?.content ||
            "No Color",

          //color_secundario texto hexadecimal
          color_secundario:
            page.properties.color_secundario.rich_text[0]?.text?.content ||
            "No Color",
        };
      })
    );

    //Sustituir contenido json con records en src\pages\normas\data\normas.json
    fs.writeFileSync(
      "src/pages/normas/data/normas.json",
      JSON.stringify(records, null, 2)
    );

    //retornar lista de propiedades disponibles en response
    return Object.keys(response.results[0].properties);
  } catch (error) {
    console.error("Error fetching database records in Markdown:", error);
    throw error;
  }
}
