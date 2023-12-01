$(document).ready(function() {
    let words = ["cat", "dog", "book", "chair", "table", "car", "tree", "flower", "road", "city"];
    let translations = ["кіт", "собака", "книга", "стілець", "стіл", "автомобіль", "дерево", "квітка", "дорога", "місто"];
    
    let correct = 0;
    let incorrect = 0;
    let currentStep = 0;

    function shuffleArray(array1, array2) {
        let index = array1.length;
        let temp, randIndex;

        while (0 !== index) {
            randIndex = Math.floor(Math.random() * index);
            index -= 1;

            temp = words[index];
            array1[index] = array1[randIndex];
            array1[randIndex] = temp;

            temp = array2[index];
            array2[index] = array2[randIndex];
            array2[randIndex] = temp;
        }
    }

    shuffleArray(words, translations);

    $(".front").text(words[currentStep]);
    $(".back").text(translations[currentStep]);

    $(".card").click(function() {
        $(this).toggleClass("flipped");
    });

    $("#checkButton").click(function() {
        let userTranslation = $("#translationInput").val();
        if (currentStep < 10) {
            if (userTranslation == translations[currentStep]) {
                correct++;
                $("#correctCounter").text("Вірно: " + correct);
            } else {
                incorrect++;
                $("#incorrectCounter").text("Не вірно: " + incorrect);
            }
            currentStep++;
            setTimeout(function() {
                $(".front").text(words[currentStep]);
                $(".back").text(translations[currentStep]);
            }, 300);
            $(".card").removeClass("flipped");
        }
        $("#stepCounter").text("Крок: " + currentStep + "/10");
        if (currentStep == 10) {
            let level = correct > 7 ? "Advanced" : correct > 4 ? "Intermediate" : "Beginner";
            document.getElementById("myModal").innerHTML = "Ваш рівень англійської " + level;
        }
        $("#translationInput").val('');
    });

    
    $("#restartButton").click(function() {
        correct = 0;
        incorrect = 0;
        currentStep = 0;
        $("#correctCounter").text("Вірно: " + correct);
        $("#incorrectCounter").text("Не вірно: " + incorrect);
        $("#stepCounter").text("Крок: " + currentStep + "/10");
        $(".front").text(words[currentStep]);
        $(".back").text(translations[currentStep]);
        document.getElementById("myModal").innerHTML = "Ваш рівень англійської ...";
    });
    
});
