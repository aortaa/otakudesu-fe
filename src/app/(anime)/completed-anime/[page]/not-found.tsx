"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CompletedAnimeNotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-center text-2xl font-bold">Completed Anime Not Found</h1>
        <p className="text-center">The anime you are looking for does not exist.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </main>
  )
}