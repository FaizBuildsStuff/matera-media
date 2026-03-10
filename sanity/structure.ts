import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // 1. HOME PAGE
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("page")
            .documentId("home")
            .title("Home Page")
        ),

      // 2. CAREERS PAGE (NEW Standalone Document)
      S.listItem()
        .title("Careers Page")
        .icon(() => "💼")
        .child(
          S.document()
            .schemaType("careersPage")
            .documentId("careers-page")
            .title("Careers Page")
        ),

      S.divider(),

      // 3. SERVICE PAGES
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

      // 4. LEGAL
      S.listItem()
        .title("Privacy Policy")
        .child(
          S.document()
            .schemaType("legalPage")
            .documentId("legal-privacy-policy")
            .title("Privacy Policy")
        ),

      S.divider(),

      // 5. INQUIRIES (FORMS)
      S.listItem()
        .title("Inquiries")
        .icon(() => "📋")
        .child(S.documentTypeList("inquiry").title("Inquiries")),

      S.divider(),

      // 6. FILTER (Prevents duplicate menu items)
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "page", 
            "careersPage", // Added to filter
            "servicePage", 
            "legalPage", 
            "inquiry"
          ].includes(item.getId() ?? "")
      ),
    ]);