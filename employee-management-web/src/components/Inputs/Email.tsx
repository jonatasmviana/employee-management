import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";
import { isEmail } from 'validator';

interface EmailProps {
  email?: string;
  placeholder?: string;
}

export const Email: React.FC<EmailProps> = ({ email, placeholder }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  return (
    <div className={errors?.email ? 'mt-2' : 'mt-5'}>
      <label>E-mail</label>
      <input
        type="email"
        value={email}
        disabled={isViewMode}
        placeholder={placeholder || 'E-mail'}
        className={`default-input w-full px-3 py-1.5 ${errors?.email && 'border-red-400'}`}
        {...register("email", {
          required: true,
          validate: (value: string) => isEmail(value),
        })}
      />
      {errors?.email?.type === "validate" && (
        <p className="text-red-500">E-mail is invalid.</p>
      )}
      {errors?.email?.type === "required" && (
        <p className="text-red-500">E-mail is required.</p>
      )}
    </div>
  );
};