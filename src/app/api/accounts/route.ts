import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user_accounts = await prisma.tbluseraccounts.findMany({
			include: {
				user: true,
			},
			where: {
				is_deleted: false,
			},
		});

		return NextResponse.json(user_accounts);
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
		const hashedPassword = await hash(data.password, 12); // Await hashing

		const newUserAccount = await prisma.tbluseraccounts.create({
			data: {
				userid: data.userid, // Ensure correct field name
				username: data.username,
				password: hashedPassword, // Use the awaited hashed password
				is_active: true, // Set default value for is_active
			},
		});

		return NextResponse.json(newUserAccount, { status: 201 });
	} catch (error) {
		console.error("Error creating user account", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

// export async function PUT(req: Request) {
//     try {
//         const { id, title, content } = await req.json();
//         const post = await prisma.post.update({
//             where: { id: Number(id) },
//             data: { title, content },
//         });
//         return NextResponse.json(post);
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Error updating post" },
//             { status: 500 }
//         );
//     }
// }

// export async function DELETE(req: Request) {
//     try {
//         const { id } = await req.json();
//         await prisma.post.delete({ where: { id: Number(id) } });
//         return NextResponse.json({ message: "Post deleted" });
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Error deleting post" },
//             { status: 500 }
//         );
//     }
// }
