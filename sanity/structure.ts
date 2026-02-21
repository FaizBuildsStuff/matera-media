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
      S.listItem()
        .title("Ad Creatives Page")
        .child(
          S.document()
            .schemaType("servicePage")
            .documentId("service-ad-creatives")
            .title("Ad Creatives")
        ),
      S.listItem()
        .title("Organic Content / YouTube Page")
        .child(
          S.document()
            .schemaType("servicePage")
            .documentId("service-organic-content-youtube")
            .title("Organic Content / YouTube")
        ),
      S.listItem()
        .title("SaaS Videos Page")
        .child(
          S.document()
            .schemaType("servicePage")
            .documentId("service-saas-videos")
            .title("SaaS Videos")
        ),
      S.listItem()
        .title("Privacy Policy")
        .child(
          S.document()
            .schemaType("legalPage")
            .documentId("legal-privacy-policy")
            .title("Privacy Policy")
        ),
      S.divider(),
      S.listItem()
        .title("Inquiries")
        .icon(() => "📋")
        .child(S.documentTypeList("inquiry").title("Inquiries")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["page", "servicePage", "legalPage", "inquiry"].includes(item.getId() ?? "")
      ),
    ]);
