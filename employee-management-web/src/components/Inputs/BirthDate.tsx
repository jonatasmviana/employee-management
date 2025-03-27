import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";
import moment from 'moment';

export const BirthDate: React.FC = () => {
  const { isViewMode, errors, register } = useContext(UserContext);

  const validateBirthDate = (value: string | null) => {
    if (!value) return
    const today = moment()
    const birth = moment(value)
    const age = today.diff(birth, 'years')
    return age >= 18
  }

  return (
    <div className={errors?.birthDate ? 'mt-2' : 'mt-5'}>
      <label>Birth date</label>
      <input
        type="date"
        disabled={isViewMode}
        placeholder="xx/xx/xxxx"
        className={`default-input w-full px-3 py-1.5 ${errors?.birthDate?.type === "validate" && 'border-red-400'}`}
        {...register("birthDate", {
          required: false,
          validate: (value: string | null) => validateBirthDate(value),
        })}
      />
      {errors?.birthDate?.type === "validate" && (
        <p className="text-red-500">
          User must be at least 18 years old.
        </p>
      )}
    </div>
  );
};