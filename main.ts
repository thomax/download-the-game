namespace StatusBarKind {
    export const Progress = StatusBarKind.create()
    export const Indicator = StatusBarKind.create()
}
statusbars.onStatusReached(StatusBarKind.Progress, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status) {
    progressBar.value = 100
    pause(100)
    game.gameOver(true)
    game.setGameOverMessage(true, "Score: " + info.score() + "[" + info.highScore() + "]")
    game.setGameOverScoringType(game.ScoringType.HighScore)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (indicatorBar.value == progressBar.value) {
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
        info.changeScoreBy(1)
        progressBar.value = progressBar.value + increment
    } else {
        music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
        info.changeScoreBy(-1)
    }
})
let indicatorBar: StatusBarSprite = null
let progressBar: StatusBarSprite = null
let increment = 0
game.splash("Downloading NOC-files..", "")
increment = 10
let index = 1
info.setScore(0)
progressBar = statusbars.create(120, 10, StatusBarKind.Progress)
progressBar.setColor(7, 13)
progressBar.value = increment
progressBar.setOffsetPadding(0, 20)
progressBar.positionDirection(CollisionDirection.Top)
indicatorBar = statusbars.create(120, 10, StatusBarKind.Indicator)
indicatorBar.setColor(3, 13)
indicatorBar.setOffsetPadding(0, 20)
indicatorBar.value = increment
game.onUpdateInterval(100, function () {
    indicatorBar.value = index * increment
    index += 1
    if (index > 10) {
        index = 1
    }
})
