
var ul = document.querySelector(".scoresList")

function highScores() {

    var allScores = localStorage.getItem(initials)
    allScores = JSON.parse(allScores)

    if (allScores != null) {
        for (var i = 0; i < allScores.length; i++) {
            var li = document.createElement("li")
            li.innerHTML = allScores[i].initials + " " + allScores[i].points
            ul.append(li)
        }
    }
}

highScores()