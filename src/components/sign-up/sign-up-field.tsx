import Image from "next/image";

type SignUpFieldProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  placeholder: string;
  autoComplete: string;
  iconSrc?: string;
  iconType?: "user";
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
  iconSrc,
  iconType,
}: SignUpFieldProps) {
  const hasIcon = Boolean(iconSrc || iconType);

  return (
    <div className="sign-up-field">
      <label className="sign-up-label" htmlFor={id}>
        {label}
      </label>
      <div
        className={
          hasIcon
            ? "sign-up-input-wrap sign-up-input-wrap--with-icon"
            : "sign-up-input-wrap"
        }
      >
        {iconType === "user" ? <UserIcon /> : null}
        {iconSrc ? (
          <Image
            aria-hidden
            alt=""
            className="sign-up-input-icon"
            height={18}
            src={iconSrc}
            width={18}
          />
        ) : null}
        <input
          autoComplete={autoComplete}
          className="sign-up-input"
          id={id}
          name={id}
          placeholder={placeholder}
          type={type}
        />
      </div>
    </div>
  );
}
