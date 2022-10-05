import { type FC } from "react";
import {
	HorizontalNav,
	HorizontalNavLink,
} from "@nice-digital/nds-horizontal-nav";

export interface RecHorizontalNavProps {
	currentLink: RecHorizontalNavOption;
}

export enum RecHorizontalNavOption {
	Evidence,
	Updates,
	SDM,
}

export const RecHorizontalNav: FC<RecHorizontalNavProps> = ({
	currentLink,
}) => {
	return (
		<HorizontalNav aria-label="TODO: generate rec-specific label">
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.Evidence}
				destination="evidence"
			>
				Evidence
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.Updates}
				destination="updates"
			>
				Update information
			</HorizontalNavLink>
			<HorizontalNavLink
				isCurrent={currentLink === RecHorizontalNavOption.SDM}
				destination="sdm"
			>
				Shared decision making
			</HorizontalNavLink>
		</HorizontalNav>
	);
};
