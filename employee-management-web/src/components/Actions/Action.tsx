interface IAction {
  iconClass: string
  buttonClass?: string
  buttonTitle?: string
  handleOnClick?: () => void
}

export default function Action({
  iconClass,
  buttonClass,
  buttonTitle,
  handleOnClick,
}: IAction) {
  return (
    <button className={`default-button ${buttonClass ? buttonClass : ''}`} onClick={handleOnClick}>
      <i className={iconClass} aria-hidden="true"></i>
      {buttonTitle ? (<span className="ml-2">{buttonTitle}</span>) : ''}
    </button>
  )
}
