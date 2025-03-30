import { type Metadata } from "next";
import BaseLayout from "@/components/layout/base-layout";

export const metadata: Metadata = {
  title: "Comics | Otakudesu",
  description: "Comics Page Otakudesu. Build by Aortadev",
};

export default function ComicsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
}
