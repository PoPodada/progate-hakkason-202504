import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Login from "./features/Auth/pages/LoginPage.tsx";
import Register from "./features/Auth/pages/RegisterPage.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/test" element={<>test</>} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Register />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
