import Image from "next/image";

type SignInFieldProps = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  iconSrc: string;
  autoComplete: string;
  errorMessage?: string;
  onChange?: () => void;
  trailingIconSrc?: string;
  trailingLabel?: string;
};

export function SignInField({
  id,
  label,
  type,
  placeholder,
  iconSrc,
  autoComplete,
  errorMessage,
  onChange,
  trailingIconSrc,
  trailingLabel,
}: SignInFieldProps) {
  const errorId = errorMessage ? `${id}-error` : undefined;

  return (
    <div className="sign-in-field">
      <label
        className={
          errorMessage
            ? "sign-in-label sign-in-label--error"
            : "sign-in-label"
        }
        htmlFor={id}
      >
        {label}
      </label>
      <div className="sign-in-input-wrap">
        <Image
          aria-hidden
          className="sign-in-input-icon"
          src={iconSrc}
          alt=""
          width={18}
          height={18}
        />
        <input
          aria-describedby={errorId}
          aria-invalid={errorMessage ? "true" : undefined}
          className={
            errorMessage ? "sign-in-input sign-in-input--error" : "sign-in-input"
          }
          id={id}
          name={id}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {trailingIconSrc ? (
          <button
            aria-label={trailingLabel}
            className="sign-in-icon-button"
            type="button"
          >
            <Image
              aria-hidden
              src={trailingIconSrc}
              alt=""
              width={18}
              height={13}
            />
          </button>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="sign-in-error" id={errorId}>
          <span aria-hidden className="sign-in-error-icon" />
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
