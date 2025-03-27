interface IAction {
  disabled?: boolean,
  iconClass: string,
  ariaLabel?: string,
  buttonClass?: string,
  buttonTitle?: string,
  handleOnClick?: () => void,
}

export default function Action({
  disabled,
  iconClass,
  ariaLabel,
  buttonClass,
  buttonTitle,
  handleOnClick,
}: IAction) {
  return (
    <button
      aria-label={ariaLabel || ''}
      disabled={disabled}
      className={`default-button ${disabled && 'disabled'} ${buttonClass}`}
      onClick={handleOnClick}
    >
      <i className={iconClass} aria-hidden="true"></i>
      {buttonTitle ? (<span className="ml-2">{buttonTitle}</span>) : ''}
    </button>
  )
}
