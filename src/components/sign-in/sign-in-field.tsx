import Image from "next/image";

type SignInFieldProps = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder: string;
  iconSrc: string;
  autoComplete: string;
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
  trailingIconSrc,
  trailingLabel,
}: SignInFieldProps) {
  return (
    <div className="sign-in-field">
      <label className="sign-in-label" htmlFor={id}>
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
          className="sign-in-input"
          id={id}
          name={id}
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
              height={18}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}
