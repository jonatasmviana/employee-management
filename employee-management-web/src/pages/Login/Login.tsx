'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { AuthService } from "@/infra/services/Auth/AuthService";
import { IAuthService } from "@/infra/services/Auth/IAuthService";
import { UserContextProvider } from '@/contexts/UserContext';
import { Email } from "@/components/Inputs/Email";
import { Password } from "@/components/Inputs/Password";
import { IUserDTO } from "@/infra/services/User/IUserDTO";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserDTO>();

  const onSubmit = async (data: IUserDTO) => {
    const authService: IAuthService = new AuthService()
    try {
      const { id, token } = await authService.login(data)

      if (!id || !token) throw new Error('Error on login! No result for user or token!')

      localStorage.setItem("id", id.toString())
      localStorage.setItem("token", token)
      router.push('/users')
    } catch (error) {
      const err = error as Error
      setErrorMessage(err.message || 'Login failed')
    }
  };

  return (
    <div className="w-full bg-white px-5 py-8 mt-14 rounded-lg shadow-dark-sm">
      <UserContextProvider
        errors={errors}
        register={register}
        isViewMode={false}
      >
        <Email placeholder="admin@admin.com" />
        <Password placeholder="admin123" />
      </UserContextProvider>

      <div className={`flex justify-end ${!errors?.password && 'mt-5'}`}>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit(onSubmit)()}>
          Login
        </button>
      </div>

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}