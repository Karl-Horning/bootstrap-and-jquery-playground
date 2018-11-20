const answerRadios = document.querySelectorAll('.answer-radio');

function toggleActiveClass() {
    if (this.checked) {
        // Removes the active class from all of the grandparent elements
        const answers = this.closest('.col').querySelectorAll('.answer-list-item');
        answers.forEach(answer => answer.classList.remove('active'));

        // Adds the active class to the grandparent element 
        this.closest('.answer-list-item').classList.add('active');
    }
}

answerRadios.forEach(answerRadio => answerRadio.addEventListener('click', toggleActiveClass));