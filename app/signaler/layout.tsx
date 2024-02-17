export default function SupportLayout({
										  children,
									  }: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col justify-center ">
			{children}
		</section>
	);
}