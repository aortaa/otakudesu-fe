"use client";

import { useParams } from "next/navigation";
import { useGetEpisodeQuery } from "@/redux/api/episode-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Skeleton from "@/components/layout/skeleton-card";
import Link from "next/link";
import { useDynamicTitle } from "@/helpers/dynamic-title";
import { title, subtitle } from "@/components/layout/primitives";
import { updateEpisode } from "@/helpers/storage-episode";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnimeEpisodesPage() {
  const router = useParams<{ slug: string; episodes: string }>();
  const episodeNum = Number(router.episodes);
  const [provider, setProvider] = useState<string>("");
  const {
    data: dataEpisode,
    isError: errorEpisode,
    isLoading: loadingEpisode,
  } = useGetEpisodeQuery({ slug: router.slug, episode: router.episodes });
  useDynamicTitle(loadingEpisode, dataEpisode?.data?.episode);

  if (loadingEpisode) return <Skeleton />;
  if (errorEpisode) return <>Error fetching data...</>;
  console.log("Provider :", provider);

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{dataEpisode?.data?.episode}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <iframe
              title="anime-episode"
              className="h-[200px] w-full rounded-xl sm:h-[300px] sm:w-full md:h-[400px] md:w-full lg:h-[500px] lg:w-full xl:h-[600px] xl:w-full"
              src={
                provider === "" ? `${dataEpisode?.data?.stream_url}` : provider
              }
              allowFullScreen
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between">
            {dataEpisode?.data?.has_previous_episode === true ? (
              <HoverCard>
                <HoverCardTrigger>
                  <Link href={`${episodeNum - 1}`}>
                    <Button
                      variant={"secondary"}
                      className={subtitle({
                        className: "rounded-lg px-5 py-2 duration-300",
                      })}
                      onClick={() =>
                        updateEpisode(
                          `/anime/${router.slug}/episodes/${episodeNum - 1}`,
                          router.slug,
                        )
                      }
                    >
                      Previous
                    </Button>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent>Back to previous episode.</HoverCardContent>
              </HoverCard>
            ) : (
              <HoverCard>
                <HoverCardTrigger>
                  <Button
                    variant={"outline"}
                    className={subtitle({
                      className:
                        "cursor-not-allowed rounded-lg px-5 py-2 text-foreground opacity-50",
                    })}
                    disabled
                  >
                    Previous
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  {`Can't back to previous, because this is first episode.`}
                </HoverCardContent>
              </HoverCard>
            )}
            <Select onValueChange={() => console.log(provider)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a media provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Media Provider</SelectLabel>
                  {dataEpisode?.data?.download_urls.mp4?.map(
                    (resolution: any) =>
                      resolution.urls.map((url: any) => (
                        <SelectItem
                          value={resolution.resolution + " - " + url.provider}
                          key={resolution.resolution + " - " + url.provider}
                          onClick={() => setProvider(url.provider)}
                        >
                          {resolution.resolution + " - " + url.provider}
                        </SelectItem>
                      )),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {dataEpisode?.data?.has_next_episode === true ? (
              <HoverCard>
                <HoverCardTrigger>
                  <Link href={`${episodeNum + 1}`}>
                    <Button
                      variant={"secondary"}
                      className={subtitle({
                        className: "rounded-lg px-5 py-2 duration-300",
                      })}
                      onClick={() =>
                        updateEpisode(
                          `/anime/${router.slug}/episodes/${episodeNum + 1}`,
                          router.slug,
                        )
                      }
                    >
                      Next
                    </Button>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent>Go to next episode.</HoverCardContent>
              </HoverCard>
            ) : (
              <HoverCard>
                <HoverCardTrigger>
                  <Button
                    variant={"outline"}
                    className={subtitle({
                      className:
                        "cursor-not-allowed rounded-lg border px-5 py-2 text-foreground opacity-50",
                    })}
                    disabled
                  >
                    Next
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>Latest episode end up here.</HoverCardContent>
              </HoverCard>
            )}
          </div>

          <div className="mx-auto grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <div className="mt-5 rounded-md bg-gray-100/50 p-4 dark:bg-gray-950/20">
              <p className="text-lg font-semibold">{`Download URL's .mp4`}</p>
              <ul className="mt-5">
                {dataEpisode?.data?.download_urls.mp4?.map(
                  (resolution: any) => (
                    <li key={resolution.resolution} className="mb-4 flex gap-2">
                      <p className={title({ size: "sm" })}>
                        {resolution.resolution}:
                      </p>
                      <ul className="mb-2 flex flex-wrap gap-2">
                        {resolution.urls.map((url: any) => (
                          <li key={url.provider}>
                            <Link target="_blank" href={url.url}>
                              <button
                                className={subtitle({
                                  className:
                                    "rounded-xl bg-gray-200/50 px-4 py-1 duration-300 hover:bg-gray-200/80 dark:bg-gray-200/10 hover:dark:bg-gray-200/40 md:text-base lg:text-base xl:text-base",
                                })}
                              >
                                {url.provider}
                              </button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="mt-5 rounded-md bg-gray-100/50 p-4 dark:bg-gray-950/20 max-[768px]:mt-0">
              <p className="text-lg font-semibold">{`Download URL's .mkv`}</p>
              <ul className="mt-5">
                {dataEpisode?.data?.download_urls.mkv?.map(
                  (resolution: any) => (
                    <li key={resolution.resolution} className="mb-4 flex gap-2">
                      <p className={title({ size: "sm" })}>
                        {resolution.resolution}:
                      </p>
                      <ul className="mb-2 flex flex-wrap items-center gap-2">
                        {resolution.urls.map((url: any) => (
                          <li key={url.provider}>
                            <Link target="_blank" href={url.url}>
                              <button
                                className={subtitle({
                                  className:
                                    "rounded-xl bg-gray-200/50 px-4 py-1 duration-300 hover:bg-gray-200/80 dark:bg-gray-200/10 hover:dark:bg-gray-200/40 md:text-base lg:text-base xl:text-base",
                                })}
                              >
                                {url.provider}
                              </button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
