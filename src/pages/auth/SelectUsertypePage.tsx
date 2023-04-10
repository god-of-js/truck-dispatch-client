import AuthLayoutStyling from 'components/layout/AuthLayoutStyling';
import SelectUserType from 'components/auth/SelectUserType';

export default function SelectUsertypePage() {
  return (
    <AuthLayoutStyling invert img>
      <SelectUserType />
    </AuthLayoutStyling>
  );
}
