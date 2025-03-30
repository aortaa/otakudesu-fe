import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const formattedTitle = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} | Otakudesu`,
    description: `Anime Page for ${formattedTitle} | Otakudesu. Build by Aortadev`,
  };
}

export default function AnimeSlug({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
