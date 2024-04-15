import BaseLayout from "@/components/layout/base-layout";
import { Metadata } from "next/types";
import OngoingAnime from "@/app/ongoing-anime/[page]/components/ongoing-anime";

export const metadata: Metadata = {
  title: "Ongoing Anime | Otakudesu",
  description: "Ongoing Anime Page Otakudesu. Build by Rizky Haksono",
};

export default function OngoingAnimeSlug() {
  return (
    <BaseLayout>
      <OngoingAnime />
    </BaseLayout>
  );
}
