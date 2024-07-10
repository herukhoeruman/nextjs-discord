import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}
// add you to the server and redirect to the server page
const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  // check if the server exists and the user is not already a member
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // if the user is already a member of the server, redirect to the server page
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // if the server does not exist, update the server members
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id, // just profile id because the role is guest
          },
        ],
      },
    },
  });

  // redirect to the server page
  if (server) return redirect(`/servers/${server.id}`);

  return <div>Hello invite {params.inviteCode} </div>;
};

export default InviteCodePage;
