"use client";

import { ReusableDataTable } from "@/components/reusable-data-table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories, states } from "@/lib/institution-constants";
import { useEffect, useState } from "react";
import { createColumns } from "./columns";

export type ApprovedInstitution = {
	id: number;
	name: string;
	category: (typeof categories)[number];
	state: (typeof states)[number];
	city: string;
	contributorName: string | null;
	contributorId: string | null;
	createdAt: Date;
	reviewedAt: Date | null;
	reviewedBy: string | null;
};

const ALL = "all" as const;

type CategoryFilter = (typeof categories)[number] | typeof ALL;
type StateFilter = (typeof states)[number] | typeof ALL;

type User = {
	id: string;
	name: string | null;
	email: string;
	username: string | null;
};

export default function ApprovedInstitutionsTable({
	initialData,
	users,
}: {
	initialData: ApprovedInstitution[];
	users: User[];
}) {
	const [institutions, setInstitutions] = useState(initialData);
	const [category, setCategory] = useState<CategoryFilter>(ALL);
	const [state, setState] = useState<StateFilter>(ALL);

	useEffect(() => {
		setInstitutions(initialData);
	}, [initialData]);

	const columns = createColumns(users);

	const filteredData = institutions.filter((inst) => {
		if (category !== ALL && inst.category !== category) return false;
		if (state !== ALL && inst.state !== state) return false;
		return true;
	});

	const filterControls = (
		<>
			<Select
				value={category}
				onValueChange={(value: CategoryFilter) => setCategory(value)}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Filter by category" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={ALL}>All categories</SelectItem>
					{categories.map((cat) => (
						<SelectItem key={cat} value={cat} className="capitalize">
							{cat}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={state}
				onValueChange={(value: StateFilter) => setState(value)}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Filter by state" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={ALL}>All states</SelectItem>
					{states.map((st) => (
						<SelectItem key={st} value={st}>
							{st}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);

	return (
		<>
			<ReusableDataTable
				columns={columns}
				data={filteredData}
				searchKey="name"
				searchPlaceholder="Search institutions..."
				emptyStateMessage="No approved institutions found."
				leftToolbarContent={filterControls}
			/>
		</>
	);
}
