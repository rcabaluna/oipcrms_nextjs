"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table-options/dt-col-header";
import { Checkbox } from "@/components/ui/checkbox";

export type Group2Cols = {
	group2id: number;
	group1id: number;
	group2code: string;
	group2name: string;
	created_at: string;
	updated_at: string;
	group1: {
		group1id: number;
		group1code: string;
		group1name: string;
		created_at: string;
		updated_at: string;
	};
};

export const columns: ColumnDef<Group2Cols>[] = [
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
		accessorKey: "group1name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Office Name" />
		),
		cell: ({ row }) => {
			const group = row.original;
			return <>{group.group1?.group1name}</>;
		},
	},
	{
		accessorKey: "group2name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Division Name" />
		),
	},
	{
		accessorKey: "group2code",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Division Code" />
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const group = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
