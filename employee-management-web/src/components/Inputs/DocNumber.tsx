import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";

interface DocNumberProps {
  docNumber?: number;
}

export const DocNumber: React.FC<DocNumberProps> = ({ docNumber }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  return (
    <div className={errors?.docNumber ? 'mt-2' : 'mt-5'}>
      <label>Doc number (CPF)</label>
      <input
        type="text"
        value={docNumber}
        disabled={isViewMode}
        placeholder="Doc number (CPF)"
        className={`default-input w-full px-3 py-1.5 ${errors?.docNumber && 'border-red-400'}`}
        {...register("docNumber", { required: true, minLength: 11, maxLength: 11 })}
      />
      {errors?.docNumber?.type === "required" && (
        <p className="text-red-500">Doc number (CPF) is required.</p>
      )}
      {(errors?.docNumber?.type === "minLength" || errors?.docNumber?.type === "maxLength") && (
        <p className="text-red-500">
          Doc number (CPF) must have 11 characters.
        </p>
      )}
    </div>
  );
};