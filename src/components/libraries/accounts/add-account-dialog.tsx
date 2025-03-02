"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

// Define the User interface to specify the structure of user data
interface User {
	userid: number;
	firstname: string;
	middlename?: string;
	lastname: string;
	extension?: string;
}

// Component for adding a new user account
export default function AddAccountDialog({ users }: { users: User[] }) {
	// State to manage dialog visibility
	const [isOpen, setIsOpen] = useState(false);

	// State to manage form data
	const [formData, setFormData] = useState({
		userid: "",
		username: "",
		password: "",
		isActive: true,
	});

	// State to manage loading state during form submission
	const [isLoading, setIsLoading] = useState(false);

	// Router instance to refresh the page after form submission
	const router = useRouter();

	// Function to handle input changes and update state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	// Function to handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission behavior

		// Validation: Ensure all required fields are filled
		if (!formData.userid || !formData.username || !formData.password) {
			alert("Please fill in all fields.");
			return;
		}

		try {
			setIsLoading(true); // Show loading state

			// Send a POST request to the API to create a new account
			const res = await fetch("/api/accounts", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...formData,
					userid: Number(formData.userid), // Ensure userid is a number
				}),
			});

			// Check if the request was successful
			if (!res.ok) throw new Error(await res.text());

			// Reset form fields after successful submission
			setFormData({
				userid: "",
				username: "",
				password: "",
				isActive: true,
			});

			router.refresh(); // Refresh the page to update the user list
			setIsOpen(false); // Close the dialog
		} catch (error) {
			alert("Failed to create account."); // Show error message
		} finally {
			setIsLoading(false); // Hide loading state
		}
	};

	return (
		// Dialog component to show the form inside a modal
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{/* Button to trigger the dialog */}
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setIsOpen(true)}>
					Add New Account
				</Button>
			</DialogTrigger>

			{/* Dialog content */}
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Account</DialogTitle>
				</DialogHeader>

				{/* Form inside the dialog */}
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					{/* Dropdown for selecting a user */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Name</Label>
						<Select
							onValueChange={(value) =>
								setFormData({ ...formData, userid: value })
							}
							value={formData.userid}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select a user" />
							</SelectTrigger>
							<SelectContent>
								{users.map(
									({
										userid,
										firstname,
										middlename,
										lastname,
										extension,
									}) => (
										<SelectItem
											key={userid}
											value={String(userid)}
										>
											{`${firstname} ${
												middlename
													? middlename[0] + "."
													: ""
											} ${lastname} ${
												extension || ""
											}`.trim()}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>

					{/* Input field for Username */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Username</Label>
						<Input
							name="username"
							className="col-span-3"
							value={formData.username}
							onChange={handleChange}
						/>
					</div>

					{/* Input field for Password */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Password</Label>
						<Input
							name="password"
							type="password"
							className="col-span-3"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					{/* Checkbox to mark the account as active or inactive */}
					<div className="flex items-center gap-2">
						<Checkbox
							id="isActive"
							checked={formData.isActive}
							onCheckedChange={(checked) =>
								setFormData({
									...formData,
									isActive: !!checked,
								})
							}
						/>
						<Label htmlFor="isActive">Is Active</Label>
					</div>

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
