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

// Define interfaces for Group1, Group2, and Group3
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

// Define the props for AddUserDialog component
interface AddUserDialogProps {
	group1: Group1[];
	group2: Group2[];
	group3: Group3[];
}

export default function AddUserDialog({
	group1,
	group2,
	group3,
}: AddUserDialogProps) {
	// State to manage dialog open/close status
	const [isOpen, setIsOpen] = useState(false);
	// State to manage form data
	const [formData, setFormData] = useState({
		lastname: "",
		firstname: "",
		middlename: "",
		extension: "",
		position: "",
		group1id: "",
		group2id: "",
		group3id: "",
		is_head: false,
	});

	// State to manage loading status
	const [isLoading, setIsLoading] = useState(false);
	// Router for navigation
	const router = useRouter();

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate required fields
		if (!formData.firstname || !formData.lastname || !formData.position) {
			alert("Please fill in all required fields.");
			return;
		}

		try {
			setIsLoading(true);

			// Send POST request to create a new user
			const res = await fetch("/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error(await res.text());

			// Reset form data
			setFormData({
				lastname: "",
				firstname: "",
				middlename: "",
				extension: "",
				position: "",
				group1id: "",
				group2id: "",
				group3id: "",
				is_head: false,
			});

			// Refresh the page and close the dialog
			router.refresh();
			setIsOpen(false);
		} catch (error) {
			alert("Failed to create account.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setIsOpen(true)}>
					Add New User
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					{/* Firstname input */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Firstname</Label>
						<Input
							name="firstname"
							className="col-span-3"
							value={formData.firstname}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Middlename input */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Middlename</Label>
						<Input
							name="middlename"
							className="col-span-3"
							value={formData.middlename}
							onChange={handleChange}
						/>
					</div>
					{/* Lastname input */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Lastname</Label>
						<Input
							name="lastname"
							className="col-span-3"
							value={formData.lastname}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Position input */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Position</Label>
						<Input
							name="position"
							className="col-span-3"
							value={formData.position}
							onChange={handleChange}
							required
						/>
					</div>
					{/* Office select */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Office</Label>
						<Select
							onValueChange={(value) =>
								setFormData({
									...formData,
									group1id: value,
								})
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{group1.map((g) => (
									<SelectItem
										key={g.group1id}
										value={g.group1id.toString()}
									>
										{g.group1name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* Division select */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Division</Label>
						<Select
							onValueChange={(value) =>
								setFormData({
									...formData,
									group2id: value,
								})
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{group2.map((g) => (
									<SelectItem
										key={g.group2id}
										value={g.group2id.toString()}
									>
										{g.group2name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* Unit select */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label className="text-right">Unit</Label>
						<Select
							onValueChange={(value) =>
								setFormData({
									...formData,
									group3id: value,
								})
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{group3.map((g) => (
									<SelectItem
										key={g.group3id}
										value={g.group3id.toString()}
									>
										{g.group3name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* Is Head checkbox */}
					<div className="flex items-center gap-2">
						<Checkbox
							id="isHead"
							checked={formData.is_head}
							onCheckedChange={(checked) =>
								setFormData({ ...formData, is_head: !!checked })
							}
						/>
						<Label htmlFor="isHead">Is Head</Label>
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
