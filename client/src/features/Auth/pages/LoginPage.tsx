import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../utils/validationSchema";

interface LoginForm {
	email: string;
	password: string;
}

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		mode: "onChange",
		shouldUnregister: false,
		resolver: zodResolver(LoginValidation),
	});

	const onSubmit = (data: LoginForm) => {
		console.log("Submitted Data", data);
	};

	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="text-xl font-semibold mb-4">ログイン</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
				<div>
					<label htmlFor="email" className="block text-sm mb-1">
						メールアドレス
					</label>
					<input
						type="email"
						id="email"
						{...register("email")}
						className="w-full border px-2 py-1"
					/>
					{errors.email && (
						<p className="text-xs text-red-500 mt-1">
							{errors.email.message as React.ReactNode}
						</p>
					)}
				</div>

				<div>
					<label htmlFor="password" className="block text-sm mb-1">
						パスワード
					</label>
					<input
						type="password"
						id="password"
						{...register("password")}
						className="w-full border px-2 py-1"
					/>
					{errors.password && (
						<p className="text-xs text-red-500 mt-1">
							{errors.password.message as React.ReactNode}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full border px-2 py-1 text-white bg-cyan-500 hover:bg-cyan-600"
				>
					送信
				</button>
			</form>
		</div>
	);
}

export default Login;
