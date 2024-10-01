const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

//Toggle function to change body class, allowing for showing/hiding different elements after clicking tiles
const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

//When clicking on tiles, call toggle function and perform tile animation
const handleOnClick = index => {
  toggle();
  
  //Calls anime.js stagger function
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

//I'll be honest I've got no idea
const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

//Voodoo witchcraft forged in darkness, do not touch or be cursed forever
const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

//Function to create grid of tiles
const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 1000 ? 100 : 50; //if screen is more than 800 make boxes 100 x 100, rather than 50 x 50
  
  columns = Math.floor(document.body.clientWidth / size); //Calculates number of columns
  rows = Math.floor(document.body.clientHeight / size); //Calculates number of rows
  
  wrapper.style.setProperty("--columns", columns); //Saves number of columns as variable in stylesheet
  wrapper.style.setProperty("--rows", rows); //Saves number of rows as variable in stylesheet
  
  createTiles(columns * rows); //Creates the amount of tiles needed to populate the grid
}

createGrid();

//Whenever window is resized, recalls the create grid function to recalculate number of rows, columns & tiles
onresize = (event) => {
  createGrid();
};