import type { ColumnSort, Row } from "@tanstack/react-table";
import type { SQL } from "drizzle-orm";
import type { z } from "zod";

import type { DataTableConfig } from "@/config/data-table";
import type { filterSchema } from "@/lib/parsers";

type Mosque = {
	name: string;
	location: string;
	image: string;
};

type GetDoaResponse = {
	name_my: string;
	name_en: string;
	content: string;
	reference_my: string;
	reference_en: string;
	meaning_my: string;
	meaning_en: string;
	category_names: Array<string>;
};

// before this is the below code, but cant pass precommit hook due to some type error - @typescript-eslint/ban-types
// export type Prettify<T> = {
//     [K in keyof T]: T[K];
// } & {}
export type Prettify<T> = { [K in keyof T]: T[K] };

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface SearchParams {
	[key: string]: string | string[] | undefined;
}

export interface Option {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
	count?: number;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
	id: StringKeyOf<TData>;
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export type ColumnType = DataTableConfig["columnTypes"][number];

export type FilterOperator = DataTableConfig["globalOperators"][number];

export type JoinOperator = DataTableConfig["joinOperators"][number]["value"];

export interface DataTableFilterField<TData> {
	id: StringKeyOf<TData>;
	label: string;
	placeholder?: string;
	options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
	extends DataTableFilterField<TData> {
	type: ColumnType;
}

export type Filter<TData> = Prettify<
	Omit<z.infer<typeof filterSchema>, "id"> & {
		id: StringKeyOf<TData>;
	}
>;

export interface DataTableRowAction<TData> {
	row: Row<TData>;
	type: "update" | "delete";
}

export interface QueryBuilderOpts {
	where?: SQL;
	orderBy?: SQL;
	distinct?: boolean;
	nullish?: boolean;
}
