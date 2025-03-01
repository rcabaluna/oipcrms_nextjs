import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.tblusers.findMany({
            where: {
                useraccount: null // Only users without accounts
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching available users", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
