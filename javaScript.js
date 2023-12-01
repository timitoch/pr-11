$(document).ready(function() { // Коли документ завантажено і готово до взаємодії. Це потрібно, щоб усі елементи сторінки були доступні для маніпуляцій jQuery.
    let words = {
        "beginner": ["cat", "dog", "book", "apple", "pen", "car", "tree", "flower", "road", "city"],
        "intermediate": ["chair", "table", "bottle", "grape", "orange", "lemon", "strawberry", "cherry", "mango", "peach"],
        "advanced": ["university", "construction", "determination", "development", "establishment", "environment", "administration", "combination", "knowledge", "understanding"]
    };
    
    let translations = {
        "beginner": ["кіт", "собака", "книга", "яблуко", "ручка", "автомобіль", "дерево", "квітка", "дорога", "місто"],
        "intermediate": ["стілець", "стіл", "пляшка", "виноград", "апельсин", "лимон", "полуниця", "вишня", "манго", "персик"],
        "advanced": ["університет", "будівництво", "визначення", "розвиток", "становище", "довкілля", "адміністрація", "комбінація", "знання", "розуміння"]
    };
    
    
    
    let correct = 0;
    let incorrect = 0;
    let currentStep = 0;
    
    function shuffleArray(array1, array2) {
        let index = array1.length;
        let temp, randIndex;
        while (0 !== index) {
            randIndex = Math.floor(Math.random() * index);
            index -= 1;
    
            temp = words[level][index];
            array1[index] = array1[randIndex];
            array1[randIndex] = temp;
    
            temp = array2[index];
            array2[index] = array2[randIndex];
            array2[randIndex] = temp;
        }
    }
    
    let level = $("#levelSelect").val();

    $("#levelSelect").change(function() {
        level = $(this).val();
        // Оновіть слова і переклади відповідно до нового рівня
        shuffleArray(words[level], translations[level]);
        $(".front").text(words[level][currentStep]);
        $(".back").text(translations[level][currentStep]);
    });


    $(".card").click(function() { 
        $(this).toggleClass("flipped"); 
    });

    $("#checkButton").click(function() { 
        let userTranslation = $("#translationInput").val(); 
        if (currentStep < 10) { 
            if (userTranslation == translations[level][currentStep]) { 
                correct++; 
                $("#correctCounter").text("Вірно: " + correct); 
            } else { 
                incorrect++; 
                $("#incorrectCounter").text("Не вірно: " + incorrect); 
            }
            currentStep++; 
            setTimeout(function() { 
                $(".front").text(words[level][currentStep]);
        $(".back").text(translations[level][currentStep]);
            }, 300);
            $(".card").removeClass("flipped"); 
        }
        $("#stepCounter").text("Крок: " + currentStep + "/10"); 

        $("#translationInput").val(''); // Очищуємо поле введення. Це готує поле введення до наступного кроку.
    });

    
    $("#restartButton").click(function() { 
        correct = 0; 
        incorrect = 0; 
        currentStep = 0; 
        $("#correctCounter").text("Вірно: " + correct); 
        $("#incorrectCounter").text("Не вірно: " + incorrect); 
        $("#stepCounter").text("Крок: " + currentStep + "/10"); 
        $(".front").text(words[level][currentStep]);
        $(".back").text(translations[level][currentStep]); 
    });
    
});
