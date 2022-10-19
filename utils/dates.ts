// Formats a DD-MM-YYYY or YYYY-MM-DD date into something a bit nicer
// If it's YYYY-MM-DD, set yearFirst to true
export const formatDate = (dateString: string, yearFirst?: boolean): string => {
	const dateArray = dateString.split("-");
	const dateObject = yearFirst
		? new Date(
				parseInt(dateArray[0], 10),
				parseInt(dateArray[1], 10) - 1,
				parseInt(dateArray[2], 10)
		  )
		: new Date(
				parseInt(dateArray[2], 10),
				parseInt(dateArray[1], 10) - 1,
				parseInt(dateArray[0], 10)
		  );
	return dateObject.toLocaleDateString("en-GB", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
