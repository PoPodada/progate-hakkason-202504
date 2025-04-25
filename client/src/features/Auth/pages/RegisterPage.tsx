import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "../utils/validationSchema";
import githubIcon from "../../../assets/github-mark.svg";

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
		<div className="flex justify-center">
			<div className="w-full max-w-md p-8 px-12 mt-16 bg-white shadow-md rounded-[8px]">
				<h1 className="text-2xl font-semibold text-center mb-4">新規登録</h1>
				<p className="text-sm text-gray-600 text-center mb-8">
					アカウントを作成しましょう！
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<input
							type="text"
							id="name"
							placeholder="名前"
							{...register("name")}
							className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
						/>
						{errors.name && (
							<p className="text-xs text-red-500 mt-1">
								{errors.name.message as React.ReactNode}
							</p>
						)}
					</div>

					<div>
						<input
							type="email"
							id="email"
							placeholder="メールアドレス"
							{...register("email")}
							className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
						/>
						{errors.email && (
							<p className="text-xs text-red-500 mt-1">
								{errors.email.message as React.ReactNode}
							</p>
						)}
					</div>

					<div>
						<input
							type="password"
							id="password"
							placeholder="パスワード"
							{...register("password")}
							className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
						/>
						{errors.password && (
							<p className="text-xs text-red-500 mt-1">
								{errors.password.message as React.ReactNode}
							</p>
						)}
					</div>

					<div>
						<input
							type="password"
							id="confirmPassword"
							placeholder="パスワード（確認）"
							{...register("confirmPassword")}
							className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
						/>
						{errors.confirmPassword && (
							<p className="text-xs text-red-500 mt-1">
								{errors.confirmPassword.message as React.ReactNode}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-[8px] transition-colors"
					>
						送信
					</button>
				</form>

				<div className="flex items-center gap-4 my-6">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="text-sm text-gray-500">または</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>

				<div className="mt-4">
					<button
						type="button"
						className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] transition-colors"
					>
						<img src={githubIcon} alt="GitHub Icon" className="w-6 h-6" />{" "}
						<span className="text-sm text-gray-700 font-medium">
							GitHubで登録
						</span>
					</button>
				</div>

				<div className="text-center mt-4">
					<span className="text-sm text-gray-600">
						すでにアカウントをお持ちの方は
					</span>
					<a
						href="/login"
						className="ml-1 text-sm text-cyan-600 hover:underline font-medium"
					>
						こちら
					</a>
				</div>
			</div>
		</div>
	);
}

export default Register;
