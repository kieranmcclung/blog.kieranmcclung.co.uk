type TimeToRead = {
	time: string;
};

const TimeToRead = ({ time }: TimeToRead) => {
	return (
		<span className="text-slate-500 text-sm tracking-wide dark:text-slate-400">
			{time} min read
		</span>
	);
};

export default TimeToRead;
