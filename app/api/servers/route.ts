import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

// post server creation
export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile(); // get current profile

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // create server with channels and members profile id
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        profileId: profile.id,
        // inviteCode: uuidv4(),
        inviteCode: Math.random().toString(36).substring(2, 15),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
