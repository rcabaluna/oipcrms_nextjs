import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";


async function getData(){
  const response = await fetch(process.env.URL+'/api/group1');
  
  if (!response.ok) {
   throw new Error("Failed to fetch data."); 
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
            <h1 className="text-xl font-bold">Manage Organizational Structure</h1>
            <p className="text-sm text-muted-foreground">
                View and manage organizational structure.
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

const OrgStructure = () => {
  return (
    <MainSidebar>
      <Content />
    </MainSidebar>
  );
};

export default OrgStructure;
