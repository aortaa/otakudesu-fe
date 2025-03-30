import BaseLayout from "@/components/layout/base-layout";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "On Going Anime | Otakudesu",
  description: "Ongoing Anime Page Otakudesu. Build by Aortadev",
};

export default function OngoingAnimeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <BaseLayout>{children}</BaseLayout>;
}
