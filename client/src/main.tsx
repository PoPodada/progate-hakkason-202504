import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import CommonLayout from "./components/CommonLayout.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CommonLayout />}>
					<Route index element={<App />} />
					<Route path="/test" element={<>test</>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
