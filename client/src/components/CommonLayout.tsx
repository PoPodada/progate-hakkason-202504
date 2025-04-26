import Header from "@/components/Header";
import { Outlet } from "react-router";

const CommonLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow bg-neutral-50">
				<Outlet />
			</main>
		</div>
	);
};

export default CommonLayout;
