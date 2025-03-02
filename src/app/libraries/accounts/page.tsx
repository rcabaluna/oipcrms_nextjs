import MainSidebar from "@/app/layout/main-sidebar";
import { DataTable } from "./data-table";
import { AccountsCol, columns } from "./columns";
import AddAccountDialog from "@/components/libraries/accounts/add-account-dialog";

async function fetchAccountsData() {
	const response = await fetch(process.env.URL + "/api/accounts");

	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

async function fetchUsersData() {
	const response = await fetch(process.env.URL + "/api/users/available");
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}
	return response.json();
}

export default async function AccountsPage() {
	// Fetch data on the server side
	const accountsData = await fetchAccountsData();
	const usersData = await fetchUsersData();
	return (
		<MainSidebar>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex items-center justify-between">
					<div className="mx-5 mt-10">
						<h1 className="text-xl font-bold">
							Manage User Accounts
						</h1>
						<p className="text-sm text-muted-foreground">
							View and manage user accounts.
						</p>
					</div>
					<AddAccountDialog users={usersData} />
				</div>

				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<DataTable columns={columns} data={accountsData} />
				</div>
			</div>
		</MainSidebar>
	);
}
