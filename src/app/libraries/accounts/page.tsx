import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import AddAccountDialog from "@/components/libraries/accounts/add-account-dialog";

async function getAccounts(){
  const response = await fetch(process.env.URL+"/api/accounts");

  if(!response.ok){
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data;
}

async function getUsers() {
  const response = await fetch(process.env.URL + "/api/users/available");

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

const Content = async () => {
  const accountsData = await getAccounts();
  const usersData = await getUsers();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
             <div className="mx-5 mt-10">
                 <h1 className="text-xl font-bold">Manage User accounts</h1>
                 <p className="text-sm text-muted-foreground">
                     View and manage user accounts.
                 </p>
             </div>
             <AddAccountDialog users={usersData} />
           </div>
             <div className="grid auto-rows-min gap-4 md:grid-cols-1">
               <div className=""><DataTable columns={columns} data={accountsData} /></div>
             </div>
           </div>
    </>
  );
};

interface User {
  userid: number;
  firstname: String;
  middlename: String,
  lastname: String,
  extension: String,
}

const AccountsPage = () => {
  return (
    <MainSidebar>
      <Content />
    </MainSidebar>
  );
};

export default AccountsPage;
