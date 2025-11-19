import React from "react";
import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      className={css.input} 
      type="text"
      placeholder="Search notes"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBox;