import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "@/features/Dashboard/Dashboard.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import CommonLayout from "./components/CommonLayout.tsx";
import Login from "./features/Auth/pages/LoginPage.tsx";
import Register from "./features/Auth/pages/RegisterPage.tsx";
import Edit from "./features/Edit/Edit.tsx";
import ArticleDetail from "./features/articles/pages/ArticleDetailPage.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CommonLayout />}>
					<Route index element={<App />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Register />} />
					<Route path="/projects/:projectId/edit" element={<Edit />} />
					<Route path="/projects/:projectId" element={<ArticleDetail />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
