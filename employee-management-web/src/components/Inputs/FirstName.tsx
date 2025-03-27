import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";

interface FirstNameProps {
  firstName?: string;
}

export const FirstName: React.FC<FirstNameProps> = ({ firstName }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  return (
    <>
      <label>First name</label>
      <input
        type="text"
        value={firstName}
        disabled={isViewMode}
        placeholder="First name"
        className={`default-input w-full px-3 py-1.5 ${errors?.firstName && 'border-red-400'}`}
        {...register("firstName", { required: true })}
      />
      {errors?.firstName?.type === "required" && (
        <p className="text-red-500">First name is required.</p>
      )}
    </>
  );
};