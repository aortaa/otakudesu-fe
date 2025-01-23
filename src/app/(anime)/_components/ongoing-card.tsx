import { OnGoingAnimeProps } from "@/types/ongoing-anime";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "@/components/layout/skeleton-card";
import Typography from "@/components/ui/typography";

export default function OngoingCard({
  animeHeader,
  animeData,
  seeAllLink,
}: Readonly<{
  animeData: OnGoingAnimeProps[];
  seeAllLink: string | null | undefined;
  animeHeader: string | null | undefined;
}>) {
  if (!animeData) {
    return (
      <>
        <CardHeader className="text-center font-bold">
          {animeHeader}
        </CardHeader>
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CardHeader className="text-center font-bold text-xl">
        {animeHeader}
      </CardHeader>
      <div className="mx-2 grid gap-2 max-[640px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {animeData?.map((anime: OnGoingAnimeProps) => (
          <Link href={`/anime/${anime.slug}`} key={anime.slug}>
            <Card className="items-center rounded-md transition duration-300 hover:bg-muted/40 h-full">
              <Image
                src={anime.poster}
                alt={anime.title}
                className="rounded-t-lg object-cover max-[640px]:h-36 max-[640px]:w-full sm:h-80 sm:w-full md:h-72 md:w-full lg:h-72 lg:w-full xl:h-96 xl:w-full"
                width={300}
                height={300}
              />
              <div className="mt-4 flex-1 space-y-1 px-4 pb-4">
                <Typography.P className="text-lg font-bold">{anime.title}</Typography.P>
                <Typography.P className="pt-3 text-sm underline decoration-solid underline-offset-4">Total {anime.current_episode}</Typography.P>
                <Typography.P className="text-sm">Release Day: {anime.release_day}</Typography.P>
                <Typography.P className="text-sm">Release Date: {anime.newest_release_date}</Typography.P>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {seeAllLink && (
        <CardFooter className="mt-2 flex justify-end">
          <Button variant={"secondary"}>
            <Link
              href={`/${seeAllLink}/1`}
            >
              See all
            </Link>
          </Button>
        </CardFooter>
      )}
    </>
  );
}
