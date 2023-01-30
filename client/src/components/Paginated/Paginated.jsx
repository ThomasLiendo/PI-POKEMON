import React from "react";

export default function Paginated({
  pokemonPerPage,
  pokemons,
  currentPage,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleBack = (e) => {
    e.preventDefault();
    pagination(currentPage - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    pagination(currentPage + 1);
  };

  return (
    <div>
      <ul>
        <li>
          <button
            onClick={handleBack}
            disabled={currentPage === pageNumbers[0]}
          >
            Back
          </button>
        </li>
        {pageNumbers &&
          pageNumbers?.map((number) => {
            return (
              <li key={number}>
                <button onClick={() => pagination(number)}>{number}</button>
              </li>
            );
          })}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
