import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const group2 = await prisma.tblgroup2.findMany({
			include: {
				group1: true,
			},
		});

		return NextResponse.json(group2);
	} catch (error) {
		console.error("Error fetching users", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
