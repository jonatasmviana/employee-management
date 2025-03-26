'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { IAuthDTO } from "@/infra/services/Auth/IAuthDTO";
import { AuthService } from "@/infra/services/Auth/AuthService";
import { IAuthService } from "@/infra/services/Auth/IAuthService";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthDTO>();

  const onSubmit = async (data: IAuthDTO) => {
    const authService: IAuthService = new AuthService()
    try {
      const { name, token } = await authService.login(data)
      localStorage.setItem("name", name)
      localStorage.setItem("token", token)
      router.push('/users')
    } catch (error) {
      const err = error as Error
      setErrorMessage(err.message || 'Login failed')
    }
  };

  return (
    <div className="w-full bg-white px-5 py-8 mt-14 rounded-lg shadow-dark-sm">
      <div>E-mail</div>
      <input
        type="email"
        placeholder="admin@admin.com"
        className={`default-input w-full px-3 py-1.5 ${errors?.email && 'border-red-400'}`}
        {...register("email", {
          required: true,
          validate: (value: string) => isEmail(value),
        })}
      />
      {errors?.email?.type === "validate" && (
        <p className="text-red-500">Email is invalid.</p>
      )}
      {errors?.email?.type === "required" && (
        <p className="text-red-500">E-mail is required.</p>
      )}

      <div className="mt-5">Password</div>
      <input
        type="password"
        placeholder="admin123"
        className={`default-input w-full px-3 py-1.5 ${errors?.password && 'border-red-400'}`}
        {...register("password", { required: true })}
      />
      {errors?.password?.type === "required" && (
        <p className="text-red-500">Password is required.</p>
      )}

      <div className={`flex justify-end ${!errors?.password && 'mt-5'}`}>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit(onSubmit)()}>
          Login
        </button>
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}