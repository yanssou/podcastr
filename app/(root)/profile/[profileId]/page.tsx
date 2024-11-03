"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";

const Profile = ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  const podcastsByAuthor = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId,
  });
  const user = useQuery(api.users.getUserById, {
    clerkId: profileId,
  });

  if (!podcastsByAuthor || !user) return <LoaderSpinner />;

  return (
    <section className="flex flex-col w-full">
      <h1 className="text-xl text-white-1">{profileId}</h1>
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Profil du podcastr</h1>
      </header>

      {/*<PodcastDetailPlayer
        podcastTitle={user.name}
        podcastId={podcastsByAuthor.podcasts[0]._id}
        audioStorageId={podcastsByAuthor.podcasts[0].audioStorageId!}
        authorImageUrl={user.imageUrl}
        authorId={user.clerkId}
      />*/}
    </section>
  );
};
export default Profile;
