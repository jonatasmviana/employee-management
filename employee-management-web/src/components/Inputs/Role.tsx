import { useContext } from 'react';
import { UserContext } from "@/contexts/UserContext";
import { UserRole } from '@/infra/services/User/UserRole';

interface RoleProps {
  role?: UserRole;
}

export const Role: React.FC<RoleProps> = ({ role }) => {
  const { isViewMode, errors, register } = useContext(UserContext);
  const userRole = UserRole

  return (
    <div className={errors?.role ? 'mt-2' : 'mt-5'}>
      <label>Select the user Role</label>
      <select
        value={role}
        disabled={isViewMode}
        className={`default-input w-full px-3 py-1.5 ${errors?.role && 'border-red-400'}`}
        defaultValue={0}
        {...register("role", { validate: (value) => value !== 0 })}
      >
        <option value={userRole.Employee}>Employee</option>
        <option value={userRole.Leader}>Leader</option>
        <option value={userRole.Director}>Director</option>
      </select>
      {errors?.role?.type === "validate" && (
        <p className="error-message">Role is required.</p>
      )}
    </div>
  );
};