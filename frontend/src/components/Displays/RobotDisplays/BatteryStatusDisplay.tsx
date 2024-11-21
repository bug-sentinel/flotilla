import { tokens } from '@equinor/eds-tokens'
import { Icon, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { Icons } from 'utils/icons'

const BatteryAlignment = styled.div`
    display: flex;
`

const StyledTypography = styled(Typography)<{ $fontSize?: 24 | 16 | 18 | 32 | 40 | 48 }>`
    font-size: ${(props) => props.$fontSize};
`
interface BatteryStatusDisplayProps {
    batteryLevel?: number
    itemSize?: 24 | 16 | 18 | 32 | 40 | 48 | undefined
    batteryWarningLimit?: number
    textAlignedBottom?: boolean
}

export const BatteryStatusDisplay = ({
    batteryLevel,
    itemSize,
    batteryWarningLimit,
    textAlignedBottom,
}: BatteryStatusDisplayProps): JSX.Element => {
    let iconColor: string = tokens.colors.text.static_icons__default.hex

    const getBatteryIcon = (batteryLevel?: number) => {
        switch (true) {
            case batteryLevel === null || batteryLevel === undefined:
                return Icons.BatteryUnknown
            case !batteryWarningLimit || batteryLevel! > batteryWarningLimit:
                return Icons.Battery
            case batteryWarningLimit && batteryLevel! <= batteryWarningLimit:
                return Icons.BatteryAlert
            default:
                return Icons.BatteryUnknown
        }
    }

    const batteryIcon =
        batteryLevel !== null && batteryLevel !== undefined ? getBatteryIcon(batteryLevel) : Icons.BatteryUnknown

    const batteryValue = batteryLevel !== null && batteryLevel !== undefined ? `${Math.round(batteryLevel)}%` : '---%'

    iconColor = batteryIcon === Icons.BatteryAlert ? tokens.colors.interactive.warning__resting.hex : iconColor

    return (
        <BatteryAlignment style={{ alignItems: textAlignedBottom ? 'end' : 'center' }}>
            <Icon name={batteryIcon} color={iconColor} size={itemSize} />
            <StyledTypography $fontSize={itemSize}>{batteryValue}</StyledTypography>
        </BatteryAlignment>
    )
}
