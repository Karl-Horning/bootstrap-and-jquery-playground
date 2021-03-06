(function () {
    const questions = quizQuestions;

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        questions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join("")} </div>
                <div class="feedback wrong-answer"></div>
                <div class="total">Question ${questionNumber + 1} of ${questions.length}</div>
                </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");
        quizInfo.innerText = "Your results";

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        questions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].classList.add("right-answer");
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].classList.add("wrong-answer");
                $('.feedback')[questionNumber].innerText = currentQuestion.feedback;
            }
        });

        const percentage = Math.round((numCorrect / questions.length) * 100);
        let message;

        switch (true) {
            case percentage === 100:
                message = 'Perfect!'
                break;
            case percentage > 90:
                message = 'Excellent!'
                break;
            case percentage > 80:
                message = 'Quiz Ninja!'
                break;
            case percentage > 70:
                message = 'Great!'
                break;
            case percentage > 60:
                message = 'Good!'
                break;
            case percentage > 50:
                message = 'OK!'
                break;
            case percentage > 40:
                message = 'Could be better!'
                break;
            case percentage > 30:
                message = 'Try again!'
                break;
            case percentage > 20:
                message = 'You need to study!'
                break;
            case percentage > 20:
                message = 'Oh dear!'
                break;
            default:
                message = 'What happened?!'
                break;
        }

        console.log(message);


        // show number of correct answers out of total
        resultsContainer.innerHTML = `${message} You got ${numCorrect} out of ${questions.length} correct!`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            // submitButton.style.display = "inline-block";
            reviewButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
            reviewButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function reviewSlides() {
        slides[currentSlide].classList.remove("active-slide");
        // Display all of the questions on one page to be reviewed
        slides.forEach((slide) => slide.classList.remove("slide"));
        totals.forEach((total) => total.classList.add("display-none"));
        submitButton.style.display = "block";
        reviewButton.style.display = "none";
        previousButton.style.display = "none";
        quizInfo.innerText = "Please review your answers before submitting them!";
    }

    const quizInfo = document.getElementById("quizInfo");
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const reviewButton = document.getElementById("review");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const totals = document.querySelectorAll(".total");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    // on review, show all of the user's selected answers
    reviewButton.addEventListener("click", reviewSlides);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();