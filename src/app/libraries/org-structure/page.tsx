import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";

//export UsersPage

const Content = async () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="">Org Structure</div>
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
