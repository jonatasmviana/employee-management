import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";

interface PasswordProps {
  placeholder?: string;
}

export const Password: React.FC<PasswordProps> = ({ placeholder }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  return (
    <div className={errors?.password ? 'mt-2' : 'mt-5'}>
      <label>Password</label>
      <input
        type="password"
        disabled={isViewMode}
        placeholder={placeholder || 'Password'}
        className={`default-input w-full px-3 py-1.5 ${errors?.password && 'border-red-400'}`}
        {...register("password", { required: true })}
      />
      {errors?.password?.type === "required" && (
        <p className="text-red-500">Password is required.</p>
      )}
    </div>
  );
};