import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidation } from "../utils/validationSchema";

interface RegisterForm {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		mode: "onChange",
		shouldUnregister: false,
		resolver: zodResolver(RegisterValidation),
	});

	const onSubmit = (data: RegisterForm) => {
		console.log("Submitted Data", data);
	};

	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="text-xl font-semibold mb-4">新規登録</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
				<div>
					<label htmlFor="text" className="block text-sm mb-1">
						名前
					</label>
					<input
						type="text"
						id="text"
						{...register("name")}
						className="w-full border px-2 py-1"
					/>
					{errors.name && (
						<p className="text-xs text-red-500 mt-1">
							{errors.name.message as React.ReactNode}
						</p>
					)}
				</div>

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

				<div>
					<label htmlFor="password" className="block text-sm mb-1">
						パスワード（確認）
					</label>
					<input
						type="password"
						id="password"
						{...register("confirmPassword")}
						className="w-full border px-2 py-1"
					/>
					{errors.confirmPassword && (
						<p className="text-xs text-red-500 mt-1">
							{errors.confirmPassword.message as React.ReactNode}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="w-full text-white bg-cyan-500 hover:bg-cyan-600 px-2 py-1"
				>
					送信
				</button>
			</form>
		</div>
	);
}
export default Register;
