import MainSidebar from "@/app/layout/main-sidebar";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Group1Table from "@/components/libraries/org-structure/group1/table";
import Group2Table from "@/components/libraries/org-structure/group2/table";
import Group3Table from "@/components/libraries/org-structure/group3/table";

const Content = async () => {
	return (
		<>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex items-center justify-between">
					<div className="mx-5 mt-10">
						<h1 className="text-xl font-bold">
							Manage Organizational Structure
						</h1>
						<p className="text-sm text-muted-foreground">
							View and manage organizational structure.
						</p>
					</div>
				</div>
				<div className="grid auto-rows-min gap-4 md:grid-cols-1">
					<div className="">
						<Tabs defaultValue="office">
							<TabsList>
								<TabsTrigger value="office">Office</TabsTrigger>
								<TabsTrigger value="division">
									Division
								</TabsTrigger>
								<TabsTrigger value="unit">Unit</TabsTrigger>
							</TabsList>
							<TabsContent value="office">
								<Group1Table />
							</TabsContent>
							<TabsContent value="division">
								<Group2Table />
							</TabsContent>
							<TabsContent value="unit">
								<Group3Table />
							</TabsContent>
						</Tabs>
					</div>
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
