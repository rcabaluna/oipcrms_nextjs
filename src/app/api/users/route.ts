import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.tblusers.findMany({
            include: { group1: true, group2: true, group3: true },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
