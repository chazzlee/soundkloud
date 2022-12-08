import { CreateNewStep } from "./CreateNewStep";
import { CreateProfileStep } from "./CreateProfileStep";
import { EmailStep } from "./EmailStep";
import { PasswordStep } from "./PasswordStep";

const STEPS = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  CREATE: "create",
  PROFILE: "profile",
});

export function AuthWizard({
  step,
  values,
  profileValues,
  submitted,
  errorMessages,
  profileErrorMessages,
  serverError,
  onNext,
  onPrev,
  onSuccess,
  onAccept,
  onClose,
  onRegister,
  onLogin,
  onChangeAuth,
  onChangeProfile,
}) {
  switch (step) {
    case STEPS.EMAIL: {
      return (
        <EmailStep
          value={values.email}
          errorMessage={errorMessages.email}
          submitted={submitted}
          onSubmit={onNext}
          onSuccess={onSuccess}
          onChange={onChangeAuth}
          onClose={onClose}
        />
      );
    }
    case STEPS.PASSWORD: {
      return (
        <PasswordStep
          values={{ email: values.email, password: values.password }}
          errorMessage={errorMessages.password}
          serverError={serverError}
          submitted={submitted}
          onClose={onClose}
          onSubmit={onLogin}
          onChange={onChangeAuth}
          onClick={onPrev}
        />
      );
    }
    case STEPS.CREATE: {
      return (
        <CreateNewStep
          values={{ email: values.email, password: values.password }}
          errorMessage={errorMessages.password}
          onClose={onClose}
          onSubmit={onAccept}
          onChange={onChangeAuth}
          onClick={onPrev}
        />
      );
    }
    case STEPS.PROFILE: {
      return (
        <CreateProfileStep
          values={{
            displayName: profileValues.displayName,
            age: profileValues.age,
            gender: profileValues.gender,
          }}
          errorMessages={{
            displayName: profileErrorMessages.displayName,
            age: profileErrorMessages.age,
            gender: profileErrorMessages.gender,
          }}
          submitted={submitted}
          serverError={serverError}
          onClose={onClose}
          onSubmit={onRegister}
          onChange={onChangeProfile}
        />
      );
    }
    default:
      return null;
  }
}
