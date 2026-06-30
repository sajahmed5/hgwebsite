import type { MetadataRoute } from "next";
import { nav, services } from "@/data/site";

const baseUrl = "https://www.hgcare.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((n) => ({
    url: `${baseUrl}${n.href === "/" ? "" : n.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: n.href === "/" ? 1 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...servicePages];
}
