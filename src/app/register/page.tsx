import RegisterForm from "@/app/register/resgiter-form";

function RegisterPage() {
  return (
    <div>
      <h1 className="mt-4 text-xl font-semibold text-center">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
