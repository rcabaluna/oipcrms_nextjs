import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.tblusers.findMany({
			include: {
				group1: true,
				group2: true,
				group3: true,
			},
			where: {
				is_deleted: false,
			},
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

export async function POST(request: Request) {
	try {
		const data = await request.json();

		const newUser = await prisma.tblusers.create({
			data: {
				firstname: data.firstname,
				middlename: data.middlename,
				lastname: data.lastname,
				extension: data.extension,
				position: data.position,
				group1id: data.group1id ? Number(data.group1id) : null,
				group2id: data.group2id ? Number(data.group2id) : null,
				group3id: data.group3id ? Number(data.group3id) : null,
				is_head: data.is_head,
			},
		});

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error("Error creating user account", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
