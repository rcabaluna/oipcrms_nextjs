import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";

const Content = async () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="bg-red-500">Dashboard</div>
        </div>
      </div>
    </>
  );
};

const DashboardPage = () => {
  return (
    <MainSidebar>
      <Content />
    </MainSidebar>
  );
};

export default DashboardPage;
