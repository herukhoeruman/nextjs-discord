import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id, // the creator of the server
      },
      data: {
        inviteCode: Math.random().toString(36).substring(2, 15),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
