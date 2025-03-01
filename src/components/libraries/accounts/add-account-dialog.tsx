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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface User {
  userid: number;
  firstname: string;
  middlename?: string;
  lastname: string;
  extension?: string;
}

export default function AddAccountDialog({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<number | undefined>(undefined); // Ensure it's a number
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function submitAccount(e: React.FormEvent) {
    e.preventDefault();

    if (selectedUser === undefined || !username || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      userid: selectedUser, // Now correctly stored as a number
      username,
      password,
      is_active: isActive,
    };

    try {
      setIsLoading(true);
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(await response.text());

      alert("Account created successfully!");
      setSelectedUser(undefined);
      setUsername("");
      setPassword("");
      setIsActive(true);
    } catch (error) {
      console.error("Error submitting account:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitAccount}>
          <div className="grid gap-4 py-4">
            {/* User Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Select
                onValueChange={(value) => setSelectedUser(Number(value))} // Ensure conversion to number
                value={selectedUser !== undefined ? String(selectedUser) : undefined}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.map((user) => {
                      const middleInitial = user.middlename ? `${user.middlename.charAt(0)}.` : "";
                      const fullName = `${user.firstname} ${middleInitial} ${user.lastname} ${user.extension ?? ""}`.trim();

                      return (
                        <SelectItem key={user.userid} value={String(user.userid)}>
                          {fullName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Username Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Username</Label>
              <Input
                id="username"
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Password</Label>
              <Input
                id="password"
                className="col-span-3"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Is Active Checkbox */}
            <div className="flex items-center gap-2">
              <Checkbox id="isActive" checked={isActive} onCheckedChange={(checked) => setIsActive(checked === true)} />
              <Label htmlFor="isActive">Is Active</Label>
            </div>
          </div>

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
