import { parseISO, format } from "date-fns";

type Props = {
	dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
	const date = parseISO(dateString);
	return (
		<time className="text-xs" dateTime={dateString}>
			{format(date, "LLLL do, yyyy")}
		</time>
	);
};

export default DateFormatter;
