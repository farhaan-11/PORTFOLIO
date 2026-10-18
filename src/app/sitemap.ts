import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/*
  sitemap.xml — do page hain, isliye haath se likhi hui list theek hai.
  Naya page banao to yahan ek line jodni hai.

  lastModified abhi ka waqt hai, koi hard-coded tareekh nahi — warna wo
  tareekh purani padti rehti hai aur jhooth bolne lagti hai.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work/zuno`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
