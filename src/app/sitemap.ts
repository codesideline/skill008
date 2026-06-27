import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { verticalSlugs } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/learn", priority: 0.8 },
    { path: "/learn/guided", priority: 0.7 },
    { path: "/learn/onepage", priority: 0.7 },
    { path: "/learn/harness", priority: 0.6 },
    { path: "/learn/mcp", priority: 0.6 },
    { path: "/gallery", priority: 0.8 },
    { path: "/connect", priority: 0.9 },
    { path: "/fde", priority: 0.8 },
    { path: "/job-seeker-cos", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const verticalRoutes = verticalSlugs().map((slug) => ({
    path: `/for/${slug}`,
    priority: 0.9,
  }));

  return [...staticRoutes, ...verticalRoutes].map(({ path, priority }) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
