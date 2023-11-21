import { tokens } from '@equinor/eds-tokens'
import { TaskStatus } from 'models/Task'

export const getColorsFromTaskStatus = (taskStatus: TaskStatus) => {
    let fillColor = tokens.colors.ui.background__medium.hex
    let textColor = 'black'
    if (taskStatus === TaskStatus.NotStarted) {
        fillColor = tokens.colors.ui.background__info.hex
    } else if (taskStatus === TaskStatus.InProgress || taskStatus === TaskStatus.Paused) {
        fillColor = tokens.colors.interactive.primary__resting.hex
        textColor = 'white'
    }
    return { fillColor: fillColor, textColor: textColor }
}
