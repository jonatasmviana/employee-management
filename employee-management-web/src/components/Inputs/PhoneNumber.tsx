import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";

interface PhoneNumberProps {
  phoneType: number;
  phoneNumber?: string;
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({ phoneType = 1, phoneNumber }) => {
  const { isViewMode, errors, register } = useContext(UserContext);

  const title = `Phone number ${phoneType}`
  const phoneErrors = phoneType === 1 ? errors?.phone1 : errors?.phone2
  const phoneRegister = phoneType === 1 ? "phone1" : "phone2"

  return (
    <div className={phoneErrors ? 'mt-2' : 'mt-4'}>
      <label>{title}</label>
      <input
        type="number"
        value={phoneNumber}
        disabled={isViewMode}
        placeholder={title}
        className={`default-input w-full px-3 py-1.5 ${phoneErrors && 'border-red-400'}`}
        {...register(phoneRegister, { minLength: 11, maxLength: 11 })}
      />
      {(phoneErrors?.type === "minLength" || phoneErrors?.type === "maxLength") && (
        <p className="text-red-500">
          Phone number must have 11 characters.
        </p>
      )}
    </div>
  );
};