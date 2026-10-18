import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/*
  robots.txt. Poora site crawl hone ke liye khula hai — ek portfolio ko
  Google mein dikhna hi chahiye.

  /api/ band hai: wahan padhne layak kuch nahi hai, aur contact wala endpoint
  crawler ke chhune se kuch fayda nahi deta.
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
