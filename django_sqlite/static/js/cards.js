var $cell = $('.card');

// open and close card when clicked on card
$cell.find('.js-expander').click(function () {
    var $thisCell = $(this).closest('.card');

    if ($thisCell.hasClass('is-collapsed')) {
        $cell.removeClass('is-expanded').addClass('is-collapsed');
        $thisCell.removeClass('is-collapsed').addClass('is-expanded');
    } else {
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    }
});

// close card when click on cross
$cell.find('.js-collapser').click(function () {
    var $thisCell = $(this).closest('.card');
    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
});

// Student end play form
$(document).ready(function () {
    $(".end-play-form").submit(function (event) {
        event.preventDefault();
        const form = $(this);
        const studentId = form.find("input[name=student_id]").val();

        $.ajax({
            type: "POST",
            url: "/api/set-play-ended",
            data: form.serialize(),
            dataType: "json",
            beforeSend: function (xhr, settings) {
                // Disable the submit button to prevent multiple submissions
                form.find("button[type=submit]").prop("disabled", true);
            },
            success: function (data) {
                // Handle successful response
                if (data.status === "success") {
                    console.log("Play ended successfully for student ID:", studentId);
                    // Perform any other actions you want after successfully setting the play as ended

                    // Remove the student element from the UI
                    const studentElement = form.closest(".student");
                    studentElement.remove();
                } else {
                    console.error("Error: " + data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX request failed:", status, error);
            },
            complete: function () {
                // Re-enable the submit button after the request is complete
                form.find("button[type=submit]").prop("disabled", false);
            },
        });
    });

    // Game add student form
    $(".add-student-game").submit(function (event) {
        event.preventDefault();
        const form = $(this);
        const gameId = form.find("input[name=game_id]").val();
        const studentId = form.find("input[name=student_id]").val();

        $.ajax({
            type: "POST",
            url: "/api/add-student-to-game",
            data: form.serialize(),
            dataType: "json",
            beforeSend: function (xhr, settings) {
                // Disable the submit button to prevent multiple submissions
                form.find("button[type=submit]").prop("disabled", true);
            },
            success: function (data) {
                // Handle successful response
                if (data.status === "success") {
                    console.log("Student added to game successfully:", studentId);

                    // Optionally, update the UI to reflect the added student
                    const studentList = form.siblings("ul");
                    studentList.append('<div class="student"><li>' + studentId + '</li></div>');
                } else {
                    console.error("Error: " + data.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX request failed:", status, error);
            },
            complete: function () {
                // Clear the student ID input and re-enable the submit button after the request is complete
                form.find("input[name=student_id]").val("");
                form.find("button[type=submit]").prop("disabled", false);
            },
        });
    });
});

// Fetch and create Countdowns
async function initCountdowns(gameStartTimes) {

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get current's date and time
        var now = new Date().getTime();
        for (let index = 1; index <= gameStartTimes.length; index++) {
            // Set the date we're counting down to
            var countDownDate = gameStartTimes[index - 1].getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var timeTextDisplay = minutes + "m " + seconds + "s ";

            if (hours > 0) {
                timeTextDisplay = hours + "h " + timeTextDisplay;
            }

            // Display the result in the element with id="demo"
            var id = "game__countdown__" + (index);

            document.getElementById(id).innerHTML = timeTextDisplay;

            // If the count down is finished, write some text
            if (distance < 0) {
                //clearInterval(x);
                document.getElementById(id).innerHTML = "EXPIRED";
            }
        }
    }, 1000);
}

async function fetchGameStartTimes() {
    let currentIP = window.location.hostname;
    if (currentIP === "127.0.0.1") {
        currentIP = currentIP + ":8000";
    }
    var file = "http://" + currentIP + "/api/get-games-start-time";
    let response = await fetch(file);
    let obj = await response.json();

    const gameStartTimes = obj.map(item => new Date(item.time));
    initCountdowns(gameStartTimes);
}

fetchGameStartTimes();