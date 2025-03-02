"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table-options/dt-col-header";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { SetStateAction, useCallback, useState } from "react";
import EditUserDialog from "@/components/libraries/users/edit-user-dialog";

export type UsersCols = {
	userid: number;
	firstname: string;
	middlename: string;
	lastname: string;
	extension: string;
	position: string;
	group1id: number;
	group2id: number;
	group3id: number;
	is_head: boolean;
	is_deleted: boolean;
	created_at: string;
	updated_at: string;
	group1: {
		group1id: number;
		group1code: string;
		group1name: string;
		created_at: string;
		updated_at: string;
	};
	group2: {
		group2id: number;
		group1id: number;
		group2code: string;
		group2name: string;
		created_at: string;
		updated_at: string;
	};
	group3: {
		group3id: number;
		group1id: number;
		group2id: number;
		group3code: string;
		group3name: string;
		created_at: string;
		updated_at: string;
	};
};

export const columns: ColumnDef<UsersCols>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			const user = row.original;
			const middleInitial = user.middlename
				? `${user.middlename.charAt(0)}.`
				: "";

			const fullName = `${user.firstname || ""} ${middleInitial || ""} ${
				user.lastname || ""
			} ${user.extension || ""}`.trim();
			return <div>{fullName}</div>;
		},
	},
	{
		accessorKey: "position",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Position" />
		),
	},
	{
		accessorKey: "group1name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Office" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return <div>{user.group1?.group1name}</div>;
		},
	},
	{
		accessorKey: "group2name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Division" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return <div>{user.group2?.group2name}</div>;
		},
	},
	{
		accessorKey: "group3name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Unit" />
		),
		cell: ({ row }) => {
			const user = row.original;
			return <div>{user.group3?.group3name}</div>;
		},
	},
	{
		accessorKey: "is_head",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Is Head" />
		),
		cell: ({ row }) => {
			const isHead = row.getValue("is_head");
			return <div>{isHead ? "Yes" : "No"}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;
			const router = useRouter();
			const [isEditOpen, setIsEditOpen] = useState(false);
			const [selectedUser, setSelectedUser] = useState<UsersCols | null>(
				null
			);

			const handleEdit = (user: UsersCols) => {
				setSelectedUser(user);
				setIsEditOpen(true);
			};
			const handleDelete = useCallback(
				async (userid: number) => {
					try {
						const res = await fetch(`/api/users/${userid}`, {
							method: "DELETE",
						});

						if (!res.ok) {
							const errorMessage = await res.text();
							throw new Error(
								errorMessage || "Failed to delete user"
							);
						}

						router.refresh();
					} catch (error) {
						alert(
							`Error deleting user: ${
								error instanceof Error
									? error.message
									: "Unknown error"
							}`
						);
					}
				},
				[router]
			);

			return (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => handleEdit(user)}>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleDelete(user.userid)}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{/* Edit User Dialog */}
					{isEditOpen && (
						<EditUserDialog
							isOpen={isEditOpen}
							setIsOpen={setIsEditOpen}
							user={user}
						/>
					)}
				</>
			);
		},
	},
];
