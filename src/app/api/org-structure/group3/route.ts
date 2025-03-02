import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const group3 = await prisma.tblgroup3.findMany({
			include: {
				group1: true,
				group2: true,
			},
		});

		return NextResponse.json(group3);
	} catch (error) {
		console.error("Error fetching users", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
