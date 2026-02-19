import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("page")
            .documentId("home")
            .title("Home Page")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "page"
      ),
    ]);
