import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";
import { UsersCols, columns } from "./columns";
import { DataTable } from "./data-table";
import AddUserDialog from "@/components/libraries/users/add-user-dialog";

const fetchData = async (endpoint: string) => {
	const response = await fetch(`${process.env.URL}${endpoint}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${endpoint}`);
	}
	return response.json();
};

const Content = async () => {
	const [data, group1Data, group2Data, group3Data] = await Promise.all([
		fetchData("/api/users"),
		fetchData("/api/org-structure/group1"),
		fetchData("/api/org-structure/group2"),
		fetchData("/api/org-structure/group3"),
	]);

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="flex items-center justify-between">
				<div className="mx-5 mt-10">
					<h1 className="text-xl font-bold">Manage Users.</h1>
					<p className="text-sm text-muted-foreground">
						View and manage users.
					</p>
				</div>
				<AddUserDialog
					group1={group1Data}
					group2={group2Data}
					group3={group3Data}
				/>
			</div>
			<div className="grid auto-rows-min gap-4 md:grid-cols-1">
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
};

const UsersPage = async () => {
	return (
		<MainSidebar>
			<Content />
		</MainSidebar>
	);
};

export default UsersPage;
