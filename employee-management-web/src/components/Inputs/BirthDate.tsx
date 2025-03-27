import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";
import moment from 'moment';

interface BirthDateProps {
  birthDate?: string;
}

export const BirthDate: React.FC<BirthDateProps> = ({ birthDate }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  const validateBirthDate = (value: string) => {
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
        value={birthDate}
        disabled={isViewMode}
        placeholder="xx/xx/xxxx"
        className={`default-input w-full px-3 py-1.5 ${errors?.birthDate?.type === "validate" && 'border-red-400'}`}
        {...register("birthDate", {
          required: true,
          validate: (value: string) => validateBirthDate(value),
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