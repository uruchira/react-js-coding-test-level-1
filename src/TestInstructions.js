function TestInstructions() {
  return (
    <header className="App-header">
      <h2>Requirement 2 :</h2>
      <ul>
        <li>
          Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex, and
          show a list of pokemon name. (DONE)
        </li>
        <li>Implement React Loading and show it during API call (DONE)</li>
        <li>
          when hover on the list item , change the item color to yellow. (DONE)
        </li>
        <li>when clicked the list item, show the modal below</li>
        <li>
          Add a search bar on top of the bar for searching, search will run on
          keyup event
        </li>
        <li>Implement sorting and pagingation</li>
        <li>Commit your codes after done</li>
        <li>
          If you do more than expected (E.g redesign the page / create a chat
          feature at the bottom right). it would be good.
        </li>
      </ul>
      <div>
        <h2>Requirement 3 :</h2>
        <ul>
          <li>show the sprites front_default as the pokemon image</li>
          <li>
            Show the stats details - only stat.name and base_stat is required in
            tabular format
          </li>
          <li>Create a bar chart based on the stats above</li>
          <li>
            Create a buttton to download the information generated in this modal
            as pdf. (images and chart must be included)
          </li>
        </ul>
      </div>
    </header>
  );
}

export default TestInstructions;
