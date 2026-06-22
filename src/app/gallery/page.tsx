import { SiteNav, SiteFooter } from "@/components/site/SiteChrome";
import { SkillSearch } from "@/components/gallery/SkillSearch";
import { LivePublished } from "@/components/gallery/LivePublished";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#20201E]">
      <SiteNav />

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
            Free starter packs
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight">
            Borrow one we already made.
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[#56514a]">
            Grab a ready-made skill and have your AI doing real work in minutes.
            Free, no setup, no account needed to look. Search by what you want
            done, or browse the examples for your role.
          </p>
        </div>

        <SkillSearch />
        <LivePublished />
        <GalleryExplorer />

        <p className="text-xs italic text-[#8a8478]">
          Everything drafts or surfaces. Nothing sends, deletes, or changes a
          record without you.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
