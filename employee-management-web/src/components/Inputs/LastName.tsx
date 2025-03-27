import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";

interface LastNameProps {
  lastName?: string;
}

export const LastName: React.FC<LastNameProps> = () => {
  const { isViewMode, errors, register } = useContext(UserContext);

  return (
    <div className={errors?.lastName ? 'mt-2' : 'mt-5'}>
      <label>Last name</label>
      <input
        type="text"
        disabled={isViewMode}
        placeholder="Last name"
        className={`default-input w-full px-3 py-1.5 ${errors?.lastName && 'border-red-400'}`}
        {...register("lastName", { required: true })}
      />
      {errors?.lastName?.type === "required" && (
        <p className="text-red-500">Last name is required.</p>
      )}
    </div>
  );
};