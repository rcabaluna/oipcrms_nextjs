import { columns } from "./columns";
import { DataTable } from "@/app/libraries/org-structure/data-table";
import React from "react";

async function getData() {
	const response = await fetch(process.env.URL + "/api/org-structure/group1");

	if (!response.ok) {
		throw new Error("Failed to fetch data.");
	}

	const data = await response.json();
	return data;
}

const Group1Table = async () => {
	const data = await getData();
	return <DataTable columns={columns} data={data} />;
};

export default Group1Table;
