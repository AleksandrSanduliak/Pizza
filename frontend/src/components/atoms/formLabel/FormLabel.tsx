import { FieldError, FieldErrors } from "react-hook-form";
import { FormLogin } from "utils/types/types";

interface IFormLabel {
  htmlFor: string;
  title: string;
  errors: FieldErrors<FormLogin> | undefined;
}

const FormLabel = ({ htmlFor, title, errors }: IFormLabel) => {
  console.log("errors", errors);
  return (
    <label htmlFor={htmlFor} className="label">
      {errors?.[htmlFor as keyof typeof errors] ? (
        <p className={`redColor mini`}>
          {errors[htmlFor as keyof typeof errors]?.message}
        </p>
      ) : (
        <p className="mini">{title}</p>
      )}
    </label>
  );
};

export default FormLabel;
//  as keyof typeof errors
