import LoginForm from "@/app/login/login-form";

function LoginPage() {
  return (
    <div>
      <h1 className="mt-4 text-xl font-semibold text-center">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
