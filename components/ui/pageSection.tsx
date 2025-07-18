import { cn } from "@/lib/utils";
import type React from "react";
import { type ComponentProps, type ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<"section"> & {
	children: React.ReactNode;
};

const PageSection = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement | null>) => {
		const { className, ...rest } = props;

		return (
			<section
				ref={ref}
				className={cn(
					"max-w-5xl mx-auto px-4 lg:px-6 flex flex-col gap-4 sm:gap-6 lg:gap-8",
					"py-8 sm:py-12 lg:py-16", // Add both top and bottom padding
					className,
				)}
				{...rest}
			/>
		);
	},
);

PageSection.displayName = "PageSection";

export default PageSection;
