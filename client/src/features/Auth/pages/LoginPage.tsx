import { auth } from "@/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import githubIcon from "../../../assets/github-mark.svg";
import { LoginValidation } from "../utils/validationSchema";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ページ遷移用のフックを追加するのだ🌱

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(LoginValidation),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      setError(null);

      // Firebaseでログインするのだ🍵
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log("ログイン成功なのだ！", userCredential.user);

      // ログイン成功したらホームページに遷移するのだ🍡
      navigate("/");
    } catch (err) {
      // エラーハンドリングなのだ💦
      console.error("ログインエラーなのだ", err);
      if (err instanceof Error) {
        setError("メールアドレスかパスワードが間違っているのだ");
      } else {
        setError("ログイン中にエラーが発生したのだ...");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // GitHubログイン機能を追加するのだ🍡
  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // GitHubプロバイダーを作成するのだ🌱
      const provider = new GithubAuthProvider();

      // GitHubでログインするのだ🍵
      const result = await signInWithPopup(auth, provider);

      // GitHubの認証情報を取得するのだ
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      console.log("GitHub認証成功なのだ！", result.user);

      // ログイン成功したらホームページに遷移するのだ
      navigate("/");
    } catch (err) {
      console.error("GitHubログインエラーなのだ", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("GitHubログイン中にエラーが発生したのだ...");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 px-12 mt-16 bg-white shadow-md rounded-[8px]">
        <h1 className="text-2xl font-semibold text-center mb-4">ログイン</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          ようこそ！ログインして始めましょう。
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              placeholder="メールアドレス"
              {...register("email")}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
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
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-[8px] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "送信"}
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
            className="w-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
            onClick={handleGitHubLogin} // GitHubログイン処理を追加するのだ🌿
          >
            <img src={githubIcon} alt="GitHub Icon" className="w-6 h-6" />{" "}
            <span className="text-sm text-gray-700 font-medium">
              GitHubでログイン
            </span>
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            アカウントをお持ちでない方は
          </span>
          <a
            href="/signup"
            className="ml-1 text-sm text-cyan-600 hover:underline font-medium"
          >
            こちら
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;
