import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";
import { UsersCols, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<UsersCols[]> {
  const response = await fetch(process.env.URL+'/api/users');

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
}

const Content = async () => {
  const data = await getData();
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div className="mx-5 mt-10">
            <h1 className="text-xl font-bold">Manage Users.</h1>
            <p className="text-sm text-muted-foreground">
                View and manage users.
            </p>
        </div>
      </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className=""><DataTable columns={columns} data={data} /></div>
        </div>
      </div>
    </>
  );
};

const UsersPage = () => {
  return (
    <MainSidebar>
      <Content />
    </MainSidebar>
  );
};

export default UsersPage;
