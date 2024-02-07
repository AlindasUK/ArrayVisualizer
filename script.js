// script.js

let numbersArray = [];
let delay; // Declare delay variable

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

function updateCircleCount(count) {
    numbersArray = Array.from({ length: count }, (_, index) => index + 1);
    renderCircles();
}

function updateSpeedCount(count) {
    delay = count;
}

function shuffleArray() {
    console.log('Shuffling array...');
    for (let i = numbersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
    }
    renderCircles();
}

function sortArray(algorithm) {
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        // Add more cases for other sorting algorithms if needed
        default:
            break;
    }
}

function bubbleSort() {
    console.log('Bubble Sorting array...');
    let n = numbersArray.length;
    let swapped;

    async function performSortStep() {
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (numbersArray[i] > numbersArray[i + 1]) {
                    [numbersArray[i], numbersArray[i + 1]] = [numbersArray[i + 1], numbersArray[i]];
                    renderCircles();
                    swapped = true;
                    highlightCircles([i, i + 1], '#333'); // Use the same color
                    await sleep(delay);
                }

                highlightCircles([i, i + 1], '#3498db');
            }
        } while (swapped);

        await animateSortedArray();
        console.log('Bubble Sorting complete.');
    }

    performSortStep();
}

function selectionSort() {
    console.log('Selection Sorting array...');
    let n = numbersArray.length;

    async function performSortStep() {
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (numbersArray[j] < numbersArray[minIndex]) {
                    minIndex = j;
                }
                highlightCircles([i, j], '#7c7c7c');
                await sleep(delay);
            }

            [numbersArray[i], numbersArray[minIndex]] = [numbersArray[minIndex], numbersArray[i]];
            renderCircles();
            highlightCircles([i, minIndex], '#333');
            await sleep(delay);
            highlightCircles([i, minIndex], '#3498db');
        }

        await animateSortedArray();
        console.log('Selection Sorting complete.');
    }

    performSortStep();
}

function insertionSort() {
    console.log('Insertion Sorting array...');
    let n = numbersArray.length;

    async function performSortStep() {
        for (let i = 1; i < n; i++) {
            let currentNumber = numbersArray[i];
            let j = i - 1;

            while (j >= 0 && numbersArray[j] > currentNumber) {
                numbersArray[j + 1] = numbersArray[j];
                renderCircles();
                highlightCircles([j, j + 1], '#333');
                await sleep(delay);
                highlightCircles([j, j + 1], '#3498db');
                j--;
            }

            numbersArray[j + 1] = currentNumber;
            renderCircles();
            await sleep(delay);
        }

        await animateSortedArray();
        console.log('Insertion Sorting complete.');
    }

    performSortStep();
}

function animateSortedArray() {
    const circles = document.querySelectorAll('.circle');

    return new Promise(resolve => {
        for (let i = 0; i < circles.length; i++) {
            setTimeout(() => {
                circles[i].classList.add('sorted');
                if (i === circles.length - 1) {
                    resolve();
                }
            }, i * (delay / 2));
        }
    });
}

function findAndHighlightMin() {
    console.log('Finding minimum...');
    let minIndex = 0;
    let currentMinIndex = minIndex + 1;

    async function performFindMinStep() {
        if (minIndex < numbersArray.length - 1) {
            if (currentMinIndex < numbersArray.length) {
                highlightCircles([minIndex, currentMinIndex], '#7c7c7c'); // Use the same color

                if (numbersArray[currentMinIndex] < numbersArray[minIndex]) {
                    minIndex = currentMinIndex;
                }

                currentMinIndex++;
                setTimeout(() => {
                    highlightCircles([minIndex, currentMinIndex - 1], '#3498db');
                    performFindMinStep();
                }, delay);
            } else {
                const circles = document.querySelectorAll('.circle');
                circles[minIndex].style.backgroundColor = '#333';
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
    updateCircleCount(16);
    delay = 50;
});
