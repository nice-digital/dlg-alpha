import { type FC } from "react";
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
			>
				Evidence
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.Updates}
				destination={`${baseUrl}/updates`}
			>
				Update information
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.SDM}
				destination={`${baseUrl}/sdm`}
			>
				Shared decision making
			</HorizontalNavLink>
		</HorizontalNav>
	);
};
