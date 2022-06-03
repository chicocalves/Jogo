const cellELements = document.querySelectorAll("[data-cell]");
const boardELement = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-Text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");


let isCircleTurn;
const winningCombinatios = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame = () => {
    isCircleTurn = false;
    
    for (const cell of cellELements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleCliclk)
        cell.addEventListener("click", handleCliclk, {onde: true});
    };
    
    setBoardHoverclass();
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if (isDraw){
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "Circulo Venceu" : "X Venceu";
    }

    winningMessage.classList.add('show-winning-message');
};

const checkForDraw = () => {
    return [ ...cellELements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    });
};

const checkForWin = (currentPlayer) => {
    return winningCombinatios.some((combination) => {
        return combination.every((index) => {
            return cellELements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);

};

const setBoardHoverclass = () => {
    boardELement.classList.remove('circle');
    boardELement.classList.remove('x');

    
    if(isCircleTurn){
        boardELement.classList.add("circle");
    } else {
        boardELement.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverclass();
};

const handleCliclk = (e) => {
    // Colocar a marca (X ou Circle)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, classToAdd);

    //Verficar Vitória e/ou Empate
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if (isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else {
    //Mudar o simbolo
        swapTurns();
    }
};

for (const cell of cellELements){
    cell.addEventListener("click", handleCliclk, {onde: true});
};

startGame();

restartButton.addEventListener("click", startGame);