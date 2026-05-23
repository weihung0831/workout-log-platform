import Image from "next/image";

type ResetPasswordFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  iconSrc: string;
  trailingIconSrc?: string;
  trailingLabel?: string;
  hint?: string;
};

export function ResetPasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  iconSrc,
  trailingIconSrc,
  trailingLabel,
  hint,
}: ResetPasswordFieldProps) {
  return (
    <div className="reset-password-field">
      <label className="reset-password-label" htmlFor={id}>
        {label}
      </label>
      <div className="reset-password-input-wrap">
        <Image
          aria-hidden
          alt=""
          className="reset-password-input-icon"
          height={18}
          src={iconSrc}
          width={18}
        />
        <input
          autoComplete={autoComplete}
          className="reset-password-input"
          id={id}
          name={id}
          placeholder={placeholder}
          type="password"
        />
        {trailingIconSrc ? (
          <button
            aria-label={trailingLabel}
            className="reset-password-icon-button"
            type="button"
          >
            <Image aria-hidden alt="" height={13} src={trailingIconSrc} width={18} />
          </button>
        ) : null}
      </div>
      {hint ? <p className="reset-password-hint">{hint}</p> : null}
    </div>
  );
}
