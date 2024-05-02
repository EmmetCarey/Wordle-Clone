let current_word = "";
let level = 0;
let random_word;
let random_word_array;
let LIST;
const CreateSquares = () => {
  const NUM_ROWS = 6;
  const NUM_SQUARES = 5;
  let squares_container = document.getElementById("squares-container");

  for (let x = 0; x < NUM_ROWS; x++) {
    let square_row = document.createElement("div");
    square_row.classList.add("square-row");
    square_row.setAttribute("data-length", 0);
    square_row.id = "square-row" + "-" + x;
    for (let i = 0; i < NUM_SQUARES; i++) {
      let square_element = document.createElement("div");
      square_element.classList.add("square");

      square_element.id = "square" + "-" + x + "-" + i;
      square_row.appendChild(square_element);
    }
    document.querySelector(".squares-container").appendChild(square_row);
  }
};
const CreateButtons = () => {
  const alphabet = [
    [["Q"], ["W"], ["E"], ["R"], ["T"], ["Y"], ["U"], ["I"], ["O"], ["P"]],
    [["A"], ["S"], ["D"], ["F"], ["G"], ["H"], ["J"], ["K"], ["L"]],
    [["Z"], ["X"], ["C"], ["V"], ["B"], ["N"], ["M"]],
  ];
  //Create first two rows of buttons
  let buttons_container = document.getElementById("buttons-container");

  for (let x = 0; x < alphabet.length - 1; x++) {
    let buttons_row = document.createElement("div");
    buttons_row.classList.add("buttons-row");
    buttons_row.id = "buttons-row-" + x;
    for (let i = 0; i < alphabet[x].length; i++) {
      let button = document.createElement("button");
      button.classList.add("button");
      button.textContent = alphabet[x][i];
      button.setAttribute("data-key", alphabet[x][i]);
      button.id = "button-" + x + "-" + i;
      buttons_row.appendChild(button);
    }
    buttons_container.appendChild(buttons_row);
  }
  //Create Enter Button
  let buttons_row = document.createElement("div");
  buttons_row.classList.add("buttons-row");
  buttons_row.id = "buttons-row-2";
  let button = document.createElement("button");
  button.classList.add("end-button");
  button.textContent = "Enter";
  button.id = "button-enter";

  buttons_row.appendChild(button);
  //Create Last Row
  for (let i = 0; i < alphabet[2].length; i++) {
    let button = document.createElement("button");
    button.classList.add("button");
    button.textContent = alphabet[2][i];
    button.setAttribute("data-key", alphabet[2][i]);
    //button id
    buttons_row.appendChild(button);
  }
  //Create Del Button
  button = document.createElement("button");
  button.classList.add("end-button");
  button.textContent = "Del";
  button.id = "button-del";
  buttons_row.appendChild(button);
  buttons_container.appendChild(buttons_row);
};
const AddToSquares = (button) => {
  let current_row = document.getElementById("square-row-" + level);

  let current_row_start_len = current_row.getAttribute("data-length");
  let id = "square-" + level + "-" + current_row_start_len;
  if (current_row_start_len < 5) {
    let current_square = document.getElementById(id);
    current_square.classList.add("boing");
    setTimeout(() => {
      current_square.classList.remove("boing");
    }, 50); // Adjust this delay to match the transition duration
    current_square.textContent = button.textContent;
    current_word += button.textContent;
    current_row.setAttribute(
      "data-length",
      parseInt(current_row_start_len) + 1
    );
  }
};
const RemoveFromSquares = () => {
  let current_row = document.getElementById("square-row-" + level);
  let current_row_start_len = current_row.getAttribute("data-length");
  let new_len = parseInt(current_row_start_len) - 1;
  current_word = current_word.slice(0, -1);
  if (new_len > -1) {
    let id = "square-" + level + "-" + new_len;
    let current_square = document.getElementById(id);

    current_square.textContent = "";
    current_row.setAttribute(
      "data-length",
      parseInt(current_row_start_len) - 1
    );
  }
};
const ButtonClicked = () => {
  const squares_container = document.getElementById("squares-container");

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
      AddToSquares(button);
    });
  });
  let del_button = document.querySelector("#button-del");
  let enter_button = document.querySelector("#button-enter");
  enter_button.addEventListener("click", () => {
    if (
      document
        .getElementById("square-row-" + level)
        .getAttribute("data-length") > 4
    ) {
      Guess();
    }
  });
  del_button.addEventListener("click", () => {
    RemoveFromSquares();
  });
};
const Correct = () => {
  let current_row = document.getElementById("square-row-" + level);
  for (let i = 0; i < current_row.children.length; i++) {
    const child = current_row.children[i];
    child.style.backgroundColor = "var(--Green)";
  }
  setTimeout(Reset, 1000);
};
const Incorrect = () => {
  let current_row = document.getElementById("square-row-" + level);
  let buttons = document.getElementById("buttons-container");

  let random_word_array_upper = [];
  for (let i = 0; i < random_word_array.length; i++) {
    random_word_array_upper.push(random_word_array[i].toUpperCase());
  }

  for (let i = 0; i < current_row.children.length; i++) {
    const child = current_row.children[i];

    const child_text = child.textContent.toLowerCase();
    const compare = random_word_array[i];
    const element = document.querySelector(`[data-key="${child.textContent}"]`);
    console.log(element, child.textContent);
    if (child_text == compare) {
      child.style.backgroundColor = "var(--Green)";
      child.style.border = "2px solid var(--Green)";
      element.style.backgroundColor = "var(--Green)";
    } else if (
      random_word_array.includes(child_text) &&
      child_text !== compare
    ) {
      if (element.style.backgroundColor != "var(--Green)") {
        element.style.backgroundColor = "var(--Yellow)";
      }
      child.style.border = "2px solid var(--Yellow)";
      child.style.backgroundColor = "var(--Yellow)";
    } else {
      element.style.backgroundColor = "var(--Absent)";
      child.style.backgroundColor = "var(--Grey)";
      child.style.border = "2px solid var(--Grey)";
    }
  }

  level += 1;
  current_word = "";
  if (level > 5) {
    ShowAnswer(true);
    setTimeout(Reset, 1000);
  }
};
const Guess = () => {
  if (current_word.toLowerCase() === random_word) {
    Correct();
  } else {
    Incorrect();
  }
};
const ShowAnswer = (isShowing) => {
  let answer = document.getElementById("answer");
  if (isShowing) {
    answer.style.height = "10%";
    answer.textContent = random_word;
  } else {
    answer.style.height = "0%";
    answer.textContent = "";
  }
};
const Randomise = () => {
  random_word = LIST[Math.floor(Math.random() * LIST.length)];
  random_word_array = random_word.split("");
  console.log("Random line:", random_word);
};
const Reset = () => {
  ShowAnswer(false);
  const squares = document.getElementById("squares-container");
  const rows = squares.childNodes;

  for (let i = 0; i < 6; i++) {
    document.getElementById("square-row-" + i).setAttribute("data-length", 0);
    for (let x = 0; x < 5; x++) {
      rows[i].childNodes[x].style.backgroundColor = "var(--Black)";
      rows[i].childNodes[x].textContent = "";
      rows[i].childNodes[x].style.border = "2px solid var(--Grey)";
    }
  }

  let buttons = document.getElementById("buttons-container");
  let button_rows = buttons.childNodes;
  for (let i = 0; i < button_rows.length; i++) {
    for (let x = 0; x < button_rows[i].childNodes.length; x++) {
      button_rows[i].childNodes[x].style.backgroundColor = "var(--Grey)";
    }
  }
  level = 0;
  current_word = "";
  Randomise();
  console.log(random_word);
};
const Typing = () => {
  document.addEventListener("keydown", function (event) {
    // Get the pressed key
    console.log(current_word);
    let keyPressed = event.key.toLowerCase(); // Convert to lowercase for consistency

    // Check if the pressed key is in the allowed characters or is Enter/Delete
    if (/^[a-z]$/.test(keyPressed)) {
      // It's one of the allowed characters or Enter/Delete, do something
      let matchingButton = document.querySelector(
        ".button[data-key='" + keyPressed.toUpperCase() + "']"
      );
      AddToSquares(matchingButton);
    } else if (keyPressed === "backspace" || keyPressed === "delete") {
      RemoveFromSquares();
    } else if (
      keyPressed === "enter" &&
      document
        .getElementById("square-row-" + level)
        .getAttribute("data-length") > 4 &&
      level < 6 &&
      LIST.includes(current_word.toLowerCase())
    ) {
      Guess();
    } else {
      let current_row = document.getElementById("square-row-" + level);
      current_row.classList.add("shake");
      setTimeout(() => {
        current_row.classList.remove("shake");
      }, 100); // Adjust this delay to match the transition duration
      setTimeout(() => {
        current_row.classList.add("shake");
      }, 200); // Adjust this delay to match the transition duration
      setTimeout(() => {
        current_row.classList.remove("shake");
      }, 300); // Adjust this delay to match the transition duration
      setTimeout(() => {
        current_row.classList.add("shake");
      }, 400); // Adjust this delay to match the transition duration
      setTimeout(() => {
        current_row.classList.remove("shake");
      }, 500); // Adjust this delay to match the transition duration
    }
  });
};
async function fetchLines() {
  try {
    // Fetch the text file
    const response = await fetch("filtered_words.txt");

    // If fetching fails, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Read the response as text
    const text = await response.text();

    // Split the text into an array of lines
    const lines = text.split("\n");

    // Return the array of lines
    return lines;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function ProcessLines() {
  try {
    // Call the fetchLines function to get the lines
    const lines = await fetchLines();

    // If lines are available, proceed
    if (lines) {
      LIST = lines;
      // Get a random line number between 0 and the total number of lines

      // Get the random line from the array

      // Log the random line

      Randomise();
      CreateButtons();
      CreateSquares();
      Typing();
      ButtonClicked();
      // Add your logic to use the random line here
    } else {
      console.log("Failed to fetch lines");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  ProcessLines();
});
