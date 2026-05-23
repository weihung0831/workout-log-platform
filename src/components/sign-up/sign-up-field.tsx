import Image from "next/image";
import Link from "next/link";

type SignUpFieldProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  autoComplete: string;
  errorActionHref?: string;
  errorActionLabel?: string;
  errorMessage?: string;
  iconSrc?: string;
  iconType?: "user";
  onChange?: () => void;
};

function UserIcon() {
  return (
    <svg
      aria-hidden
      className="sign-up-input-icon"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z"
        stroke="#C7C7CC"
        strokeWidth="1.5"
      />
      <path
        d="M15 15.75C15 14.1587 14.3679 12.6326 13.2426 11.5074C12.1174 10.3821 10.5913 9.75 9 9.75C7.4087 9.75 5.88258 10.3821 4.75736 11.5074C3.63214 12.6326 3 14.1587 3 15.75"
        stroke="#C7C7CC"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SignUpField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  errorActionHref,
  errorActionLabel,
  errorMessage,
  iconSrc,
  iconType,
  onChange,
}: SignUpFieldProps) {
  const hasIcon = Boolean(iconSrc || iconType);
  const errorId = errorMessage ? `${id}-error` : undefined;

  return (
    <div className="sign-up-field">
      <label
        className={
          errorMessage
            ? "sign-up-label sign-up-label--error"
            : "sign-up-label"
        }
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={
          [
            "sign-up-input-wrap",
            hasIcon ? "sign-up-input-wrap--with-icon" : "",
            errorMessage ? "sign-up-input-wrap--error" : "",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        {iconType === "user" ? <UserIcon /> : null}
        {iconSrc ? (
          <Image
            aria-hidden
            alt=""
            className={`sign-up-input-icon sign-up-input-icon--${id}`}
            height={18}
            src={iconSrc}
            width={18}
          />
        ) : null}
        {errorMessage ? (
          <span aria-hidden className="sign-up-input-error-mark" />
        ) : null}
        <input
          aria-describedby={errorId}
          aria-invalid={errorMessage ? "true" : undefined}
          autoComplete={autoComplete}
          className={
            errorMessage ? "sign-up-input sign-up-input--error" : "sign-up-input"
          }
          id={id}
          name={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
      </div>
      {errorMessage ? (
        <p className="sign-up-error" id={errorId}>
          <span aria-hidden className="sign-up-error-icon" />
          {errorMessage}
          {errorActionHref && errorActionLabel ? (
            <Link className="sign-up-error-link" href={errorActionHref}>
              {errorActionLabel}
            </Link>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
