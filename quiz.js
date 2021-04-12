const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton = document.getElementById('submit');

const quizQuestions = [
    {
        question: "Hamish is currently studying at:",
        answers: {
            a: "UQ",
            b: "QUT",
            c: "USYD",
            d: "Harvard"
        },
        correctAnswer: "b"
    },

    {
        question: "What is Hamish's favourite sport:",
        answers: {
            a: "Cricket",
            b: "NFL",
            c: "AFL",
            d: "Baseball"
        },
        correctAnswer: "c"
    },

    {
        question: "What is Hamish's favourite coding language:",
        answers: {
            a: "Matlab",
            b: "SQL",
            c: "Python",
            d: "R"
        },
        correctAnswer: "d"
    },

    {
        question: "In what year did Hamish start his PhD?:",
        answers: {
            a: "2018",
            b: "2019",
            c: "2020",
            d: "2021"
        },
        correctAnswer: "c"
    }
];

function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    for(i=0; i<quizQuestions.length; i++){
        // variable to store list of possible answers
        const answers = [];

        // for each available answer to this question add a html radio button
        for(letter in quizQuestions[i].answers){
            answers.push(
                '<label>'
                + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                + letter + ': '
                + quizQuestions[i].answers[letter]
                + '</label>'
            );
        }

        // add this question and its answers to the output
        output.push(
        '<div class="question">' + quizQuestions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
        );
    }

    // combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var numCorrect = 0;

    // for each question...
    for(i=0; i<quizQuestions.length; i++){

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||
        {}).value;

        if(userAnswer===quizQuestions[i].correctAnswer){
            numCorrect++;

            // and colour the answers green
            answerContainers[i].style.color = 'lightgreen';
        }

        // if answer is wrong or blank
        else{
            // colour the answers red
            answerContainers[i].style.color = 'red';
        }
    }

    // show number of correct answers out of total
    if(numCorrect === 0) {
        resultsContainer.innerHTML = "That wasn't your best effort - you didn't get a single answer correct.";
    }

    if(numCorrect === 1) {
        resultsContainer.innerHTML = "There's room for improvement there! You only got one correct answer.";
    }

    if(numCorrect === 2) {
        resultsContainer.innerHTML = "That was okay! You got a score of 2 out of 4 for your responses. Have another go to see if you can improve on that.";
    }

    if(numCorrect === 3) {
        resultsContainer.innerHTML = "Congratulations! You got a score of 3 out of 4 for your responses. You know Hamish pretty well!";
    }

    if(numCorrect === 4) {
        resultsContainer.innerHTML = "Congratulations! You got a perfect score of 4 out of 4 for your responses. You know Hamish so well!"
    }

}

// load quiz
buildQuiz();

submitButton.onclick = function() {
    showResults();
}