"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table-options/dt-col-header"
import { Checkbox } from "@/components/ui/checkbox"

export type UsersCols = {
  userid: number,
  name: String,
  position: String,
  group1name: String,
  group2name: String,
  group3name: String,
  is_head: Boolean
}

export const columns: ColumnDef<UsersCols>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "userid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
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
      <DataTableColumnHeader column={column} title="Group 1" />
    ),
  },
  {
    accessorKey: "group2name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group 2" />
    ),
  },
  {
    accessorKey: "group3name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group 3" />
    ),
  },
  {
    accessorKey: "is_head",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Head" />
    ),
    cell: ({ row }) => {
      const isHead = row.getValue("is_head")
      return <div>{isHead ? "Yes" : "No"}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
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
      )
    },
  },
]
