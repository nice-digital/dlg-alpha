import { type FC, type ReactNode } from "react";
import { Link } from "@/components/Link/Link";
import {
	HorizontalNav,
	HorizontalNavLink,
} from "@nice-digital/nds-horizontal-nav";

export interface RecHorizontalNavProps {
	currentLink: RecHorizontalNavOption;
	baseUrl?: string;
}

export enum RecHorizontalNavOption {
	Evidence,
	Updates,
	SDM,
}

export const RecHorizontalNav: FC<RecHorizontalNavProps> = ({
	currentLink,
	baseUrl = "/",
}) => {
	return (
		<HorizontalNav aria-label="TODO: generate rec-specific label">
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.Evidence}
				destination={`${baseUrl}/evidence`}
				elementType={Link as unknown as ReactNode}
			>
				Evidence
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.Updates}
				destination={`${baseUrl}/updates`}
				elementType={Link as unknown as ReactNode}
			>
				Update information
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.SDM}
				destination={`${baseUrl}/sdm`}
				elementType={Link as unknown as ReactNode}
			>
				Shared decision making
			</HorizontalNavLink>
		</HorizontalNav>
	);
};
