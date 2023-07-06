const date = new Date();
const year = date.getFullYear();

export default function Footer() {
	return (
		<footer className="bg-slate-50 dark:bg-slate-950">
			<div className="py-6 max-w-7xl mx-auto text-center">
				There we are then
				<br />
				<span className="text-sm">Kieran McClung &copy; {year}</span>
			</div>
		</footer>
	);
}
