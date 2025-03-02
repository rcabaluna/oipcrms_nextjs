import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const group1 = await prisma.tblgroup1.findMany();

		return NextResponse.json(group1);
	} catch (error) {
		console.error("Error fetching users", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
