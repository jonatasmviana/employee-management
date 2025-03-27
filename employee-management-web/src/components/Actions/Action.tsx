interface IAction {
  disabled?: boolean,
  iconClass: string,
  buttonClass?: string,
  buttonTitle?: string,
  handleOnClick?: () => void,
}

export default function Action({
  disabled,
  iconClass,
  buttonClass,
  buttonTitle,
  handleOnClick,
}: IAction) {
  return (
    <button
      disabled={disabled}
      className={`default-button ${disabled && 'disabled'} ${buttonClass}`}
      onClick={handleOnClick}
    >
      <i className={iconClass} aria-hidden="true"></i>
      {buttonTitle ? (<span className="ml-2">{buttonTitle}</span>) : ''}
    </button>
  )
}
