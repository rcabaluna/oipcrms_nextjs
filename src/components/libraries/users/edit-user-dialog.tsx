"use client"; // Enables client-side rendering in Next.js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Importing UI components from the project library
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Interfaces to define data structures for organization groups and users
interface Group1 {
	group1id: number;
	group1code: string;
	group1name: string;
}

interface Group2 {
	group2id: number;
	group1id: number;
	group2code: string;
	group2name: string;
}

interface Group3 {
	group3id: number;
	group1id: number;
	group2id: number;
	group3code: string;
	group3name: string;
}

interface User {
	userid: number;
	firstname: string;
	middlename?: string; // Optional field
	lastname: string;
	position: string;
	group1id: number;
	group2id: number;
	group3id: number;
	is_head: boolean;
}

interface EditUserDialogProps {
	isOpen: boolean; // Dialog visibility state
	setIsOpen: (open: boolean) => void; // Function to update dialog state
	user: User; // User data to edit
}

// Function to fetch data from API endpoints
const fetchData = async (endpoint: string, setState: (data: any) => void) => {
	try {
		const response = await fetch(endpoint);
		if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
		const data = await response.json();
		setState(data);
	} catch (error) {
		console.error("Fetch error:", error);
	}
};

// Component for displaying form fields with labels
const FormField = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="grid grid-cols-4 items-center gap-4">
		<Label className="text-right">{label}</Label>
		<div className="col-span-3">{children}</div>
	</div>
);

function EditUserDialog({ isOpen, setIsOpen, user }: EditUserDialogProps) {
	// State to store organization group data
	const [groups, setGroups] = useState<{
		group1: Group1[];
		group2: Group2[];
		group3: Group3[];
	}>({
		group1: [],
		group2: [],
		group3: [],
	});

	const [dataLoaded, setDataLoaded] = useState(false); // Tracks if data is fully loaded

	// State to manage form data, initialized with user data
	const [formData, setFormData] = useState({
		firstname: user?.firstname || "",
		middlename: user?.middlename || "",
		lastname: user?.lastname || "",
		position: user?.position || "",
		group1id: user?.group1id || "",
		group2id: user?.group2id || "",
		group3id: user?.group3id || "",
		is_head: user?.is_head || false,
	});

	const [isLoading, setIsLoading] = useState(false); // Tracks form submission state
	const router = useRouter(); // Hook for programmatic navigation

	// Fetch organization structure data when the dialog is opened
	useEffect(() => {
		if (isOpen) {
			setDataLoaded(false);
			Promise.all([
				fetchData("/api/org-structure/group1", (data) =>
					setGroups((prev) => ({ ...prev, group1: data }))
				),
				fetchData("/api/org-structure/group2", (data) =>
					setGroups((prev) => ({ ...prev, group2: data }))
				),
				fetchData("/api/org-structure/group3", (data) =>
					setGroups((prev) => ({ ...prev, group3: data }))
				),
			]).then(() => setDataLoaded(true));
		}
	}, [isOpen]);

	// Handle input changes in the form
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSelectChange = (field: string, value: string) =>
		setFormData((prev) => ({ ...prev, [field]: value }));

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(`/api/users/${user.userid}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Failed to update user");
			setIsOpen(false);
			router.refresh(); // Refresh page after successful update
		} catch (error) {
			console.error("Update error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen && dataLoaded} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<form className="grid gap-4 py-4" onSubmit={handleSubmit}>
					{/* Form fields for user information */}
					<FormField label="Firstname">
						<Input
							name="firstname"
							value={formData.firstname}
							onChange={handleChange}
							required
						/>
					</FormField>

					<FormField label="Middlename">
						<Input
							name="middlename"
							value={formData.middlename}
							onChange={handleChange}
						/>
					</FormField>

					<FormField label="Lastname">
						<Input
							name="lastname"
							value={formData.lastname}
							onChange={handleChange}
							required
						/>
					</FormField>

					<FormField label="Position">
						<Input
							name="position"
							value={formData.position}
							onChange={handleChange}
							required
						/>
					</FormField>

					<FormField label="Office">
						<Select
							onValueChange={(value) =>
								handleSelectChange("group1id", value)
							}
							defaultValue={formData.group1id.toString()}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Office" />
							</SelectTrigger>
							<SelectContent>
								{groups.group1.map((group) => (
									<SelectItem
										key={group.group1id}
										value={group.group1id.toString()}
									>
										{group.group1name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormField>

					<FormField label="Division">
						<Select
							onValueChange={(value) =>
								handleSelectChange("group2id", value)
							}
							defaultValue={formData.group2id.toString()}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Division" />
							</SelectTrigger>
							<SelectContent>
								{groups.group2.map((group) => (
									<SelectItem
										key={group.group2id}
										value={group.group2id.toString()}
									>
										{group.group2name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormField>

					<FormField label="Unit">
						<Select
							onValueChange={(value) =>
								handleSelectChange("group3id", value)
							}
							defaultValue={formData.group3id.toString()}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Unit" />
							</SelectTrigger>
							<SelectContent>
								{groups.group3.map((group) => (
									<SelectItem
										key={group.group3id}
										value={group.group3id.toString()}
									>
										{group.group3name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormField>
					{/* Submit button */}
					<DialogFooter>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Submitting..." : "Submit"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default EditUserDialog;
