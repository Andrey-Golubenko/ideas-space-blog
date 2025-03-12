import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '~/components/ui/tooltip'

interface IWithTooltipProps {
  children: React.ReactNode
  tooltip?: string
  contentClasses?: string
  tooltipClasses?: string
}

/**
 * A wrapper component that adds a tooltip to its child element.
 *
 * @component WithTooltip
 * @example
 * <WithTooltip tooltip="This is a tooltip">
 *   <button>Hover me</button>
 * </WithTooltip>
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child element that will trigger the tooltip.
 * @param {string} [props.tooltip] - The tooltip text. If not provided, the component renders only the children.
 * @param {string} [props.contentClasses] - Additional CSS classes for the tooltip content.
 * @param {string} [props.tooltipClasses] - Additional CSS classes for the tooltip text.
 *
 * @returns {JSX.Element} The wrapped element with an optional tooltip.
 */
const WithTooltip = ({
  children,
  tooltip,
  contentClasses,
  tooltipClasses
}: IWithTooltipProps) => {
  if (!tooltip) {
    return children
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        className={contentClasses}
      >
        <span className={tooltipClasses}>
          {tooltip as React.ReactNode}
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

export default WithTooltip
