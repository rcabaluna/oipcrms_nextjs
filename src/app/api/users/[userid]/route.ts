import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure correct Prisma import

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { userid: string } }
) {
	try {
		const userid = Number(params.userid); // Extract user ID from route params

		if (isNaN(userid)) {
			return NextResponse.json(
				{ error: "Invalid user ID" },
				{ status: 400 }
			);
		}

		// Soft delete user from database
		await prisma.tblusers.update({
			where: { userid },
			data: { is_deleted: true },
		});

		// Check if user has user account
		const useraccount = await prisma.tbluseraccounts.findUnique({
			where: { userid: userid },
		});

		if (useraccount) {
			// Soft delete useraccount from database
			await prisma.tbluseraccounts.update({
				where: { userid },
				data: { is_deleted: true },
			});
		}

		return NextResponse.json(
			{ message: "User deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json(
			{ error: "Error deleting user" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { userid: string } }
) {
	try {
		const userid = Number(params.userid);
		const body = await req.json();

		if (isNaN(userid)) {
			return NextResponse.json(
				{ error: "Invalid user ID" },
				{ status: 400 }
			);
		}

		// Update user details
		const updatedUser = await prisma.tblusers.update({
			where: { userid },
			data: {
				firstname: body.firstname,
				middlename: body.middlename,
				lastname: body.lastname,
				position: body.position,
				group1id: body.group1id ? Number(body.group1id) : null,
				group2id: body.group2id ? Number(body.group2id) : null,
				group3id: body.group3id ? Number(body.group3id) : null,
				is_head: body.is_head,
			},
		});

		return NextResponse.json(
			{ message: "User updated successfully", user: updatedUser },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json(
			{ error: "Error updating user" },
			{ status: 500 }
		);
	}
}
