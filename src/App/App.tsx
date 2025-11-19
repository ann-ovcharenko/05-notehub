import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../services/noteService";
import NoteList from "../components/NoteList/NoteList";
import SearchBox from "../components/SearchBox/SearchBox";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import NoteForm from "../components/NoteForm/NoteForm";
import StatusLoader from "../components/StatusLoader/StatusLoader";
import StatusError from "../components/StatusError/StatusError";
import css from "./App.module.css"; 

const NOTES_PER_PAGE = 12;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchTerm],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: NOTES_PER_PAGE,
        search: debouncedSearchTerm,
      }),
  });

  const shouldRenderList = data && data.data && data.data.length > 0 && !isLoading;
  const shouldRenderPagination = data && data.meta && data.meta.pages > 1;

  if (error) {
    return (
      <div className={css.app}>
        <StatusError message={error.message} />
      </div>
    );
  }

  return (
    <div className={css.app}>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      <header className={css.toolbar}>
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>

        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {shouldRenderPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={data!.meta.pages} 
            onPageChange={setCurrentPage}
          />
        )}
      </header>

      {isLoading && <StatusLoader />}
      
      {shouldRenderList ? (
        <NoteList notes={data!.data} /> 
      ) : (
        !isLoading && (
          <div className="empty-list">
            Нотаток не знайдено.{" "}
            {searchTerm ? "Спробуйте інший пошуковий запит." : ""}
          </div>
        )
      )}
    </div>
  );
};

export default App;