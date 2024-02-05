// script.js

let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16];
let delay = 50; // Set the delay in milliseconds

function renderCircles() {
    const circleContainer = document.getElementById('circle-container');
    circleContainer.innerHTML = '';

    numbersArray.forEach(number => {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.textContent = number;
        circleContainer.appendChild(circle);
    });
}

function shuffleArray() {
    console.log('Shuffling array...');
    for (let i = numbersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
    }
    renderCircles();
}

function sortArray() {
    console.log('Sorting array...');
    let n = numbersArray.length;
    let swapped;

    async function performSortStep() {
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                // Highlight the elements being compared during the sorting process
                if (numbersArray[i] > numbersArray[i + 1]) {
                    // Swap elements
                    [numbersArray[i], numbersArray[i + 1]] = [numbersArray[i + 1], numbersArray[i]];
                    renderCircles();
                    swapped = true;
                    highlightCircles([i, i + 1], 'green');
                    await sleep(delay); // Introduce delay for visualization
                }

                // Reset the highlight after sorting the elements
                highlightCircles([i, i + 1], '#3498db');
            }
        } while (swapped);

        // Reset the color of all circles after sorting is complete
        highlightCircles(Array.from({ length: n }, (_, i) => i), '#3498db');

        // Add a satisfying animation after sorting completion
        await animateSortedArray();
        console.log('Sorting complete.');
    }

    performSortStep();
}

async function animateSortedArray() {
    const circles = document.querySelectorAll('.circle');

    // Change the color of circles in a satisfying way
    for (let i = 0; i < circles.length; i++) {
        await sleep(delay / 2);
        circles[i].style.backgroundColor = 'green';
    }

    // Rotate the circles for an additional effect
    for (let i = 0; i < 370; i += 10) {
        await sleep(10);
        circles.forEach(circle => {
            circle.style.transform = `rotate(${i}deg)`;
        });
    }
}


function findAndHighlightMin() {
    console.log('Finding minimum...');
    let minIndex = 0;
    let currentMinIndex = minIndex + 1;

    async function performFindMinStep() {
        if (minIndex < numbersArray.length - 1) {
            if (currentMinIndex < numbersArray.length) {
                // Highlight the elements being compared
                highlightCircles([minIndex, currentMinIndex], 'green');

                if (numbersArray[currentMinIndex] < numbersArray[minIndex]) {
                    // Update the current minimum index
                    minIndex = currentMinIndex;
                }

                currentMinIndex++;
                setTimeout(() => {
                    // Reset the highlight after a short delay
                    highlightCircles([minIndex, currentMinIndex - 1], '#3498db');
                    performFindMinStep();
                }, delay);
            } else {
                // Change the color of the minimum value to red
                const circles = document.querySelectorAll('.circle');
                circles[minIndex].style.backgroundColor = 'red';

                // Render circles after the color change
            }
        }
    }

    performFindMinStep();
}

function highlightCircles(indices, color) {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.style.backgroundColor = indices.includes(index) ? color : '#3498db';
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", function () {
    renderCircles();
});
