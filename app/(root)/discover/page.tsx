"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import necessary hooks
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import SearchBar from "@/components/SearchBar";

const Discover = () => {
  const searchParams = useSearchParams(); // Retrieve searchParams
  const search = searchParams.get("search") || ""; // Extract 'search' parameter

  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, { search });

  return (
    <div className="flex flex-col gap-9">
      <SearchBar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? "Découvrez de nouveaux podcasts !" : "Résultats pour "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastsData ? (
          <>
            {podcastsData.length > 0 ? (
              <div className="podcast_grid">
                {podcastsData.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imgUrl!}
                    title={podcast.podcastTitle}
                    description={podcast.podcastDescription}
                    podcastId={podcast._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="Aucun résultat pour votre recherche" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
};

export default Discover;
