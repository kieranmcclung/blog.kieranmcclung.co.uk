type TimeToRead = {
	time: string;
};

const TimeToRead = ({ time }: TimeToRead) => {
	return <span className="text-xs">{time} minute read</span>;
};

export default TimeToRead;
