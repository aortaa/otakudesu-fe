import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { subtitle, title } from "./primitives";

export default function AnimeSearchCard({
  anime
}: Readonly<{
  anime: any
}>) {
  if (!anime || anime === undefined || anime.length === 0) {
    return <div className="text-center">Anime not found!</div>;
  }

  console.log(anime?.map((data: any) => data))

  return (
    <div className="grid gap-2 max-[640px]:grid-cols-2 max-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
      {anime?.map((data: any) => (
        <div key={data?.title}>
          <Link href={`/anime/${data.slug}`}>
            <Card className="items-center rounded-md transition duration-300 hover:bg-muted/40">
              <Image
                src={data.poster}
                alt={data.title}
                className="rounded-t-lg object-cover max-[640px]:h-36 max-[640px]:w-full sm:h-80 sm:w-full md:h-72 md:w-full lg:h-72 lg:w-full xl:h-96 xl:w-full"
                width={300}
                height={300}
              />
              <div className="mt-4 flex-1 space-y-1 px-4 pb-4">
                <CardTitle className={title()}>{data.title}</CardTitle>
                <p
                  className={subtitle({
                    className:
                      "pt-3 underline decoration-solid underline-offset-4",
                  })}
                >
                  Status: {data?.status}
                </p>
                <p
                  className={subtitle({
                    className:
                      "pb-3 underline decoration-solid underline-offset-4",
                  })}
                >
                  Rating: {data?.rating}
                </p>
                <div className="flex flex-wrap pt-2 gap-2">
                  <p className={subtitle()}>Genres: </p>
                  {data?.genres?.map((genre: any) => (
                    <div key={genre?.slug}>
                      <p className={subtitle()}>
                        <span className="bg-muted px-2 py-1 rounded-lg">{genre?.name}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  );
}
