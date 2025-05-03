import { useEffect, useRef, useState } from "react";
import { MovieResponse, MovieResult, fecthApi } from "../common/api";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import PageIndicator from "./page-indicator";
import MovieCard from "./movie-card";

const CARDwIDTH = 200;
type MovieProp = {
  title: string;
  endpoint: string;
};

export default function ContentRow({ title, endpoint }: MovieProp) {
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const panelRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const cardPerPage = useRef(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pageCount;

  useEffect(() => {
    if (rowData.length) {
      if (containerRef.current) {
        cardPerPage.current = Math.floor(
          containerRef.current.clientWidth / CARDwIDTH,
        );
        // console.log(cardPerPage.current);
        const pages = Math.ceil(rowData.length / cardPerPage.current);
        setPageCount(pages);
        // console.log({ pages });
      }
    }
  }, [rowData.length]);

  function getTranslateX() {
    let updatedTranslateX;
    if (panelRef.current) {
      updatedTranslateX =
        ((cardPerPage.current * CARDwIDTH) / panelRef.current.clientWidth) *
        100;
    }
    return updatedTranslateX ?? 100;
  }  

  function prevClick() {
    if (panelRef.current) {
      const getposition = translateX + getTranslateX();
      //   translateX(`${getposition}%`);
      panelRef.current.style.transform = `translateX(${getposition}%)`;
      setTranslateX(getposition);
      setCurrentPage(currentPage - 1);
    }
  }
  function nextClick() {
    if (panelRef.current) {
      const getposition = translateX - getTranslateX();
      panelRef.current.style.transform = `translateX(${getposition}%)`;
      setTranslateX(getposition);
      setCurrentPage(currentPage + 1);
    }
  }

  async function fetchPopularMovies() {
    const response = await fecthApi<MovieResponse<MovieResult[]>>(endpoint);
    // console.log(response.results);
    setRowData(response.results.filter((res) => res.backdrop_path !== null));
  }
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <section
      ref={containerRef}
      className=" row-container relative z-[8] ml-12 mb-6 -mt-5"
    >
      <h1 className="text-xl text-white ">{title}</h1>
      <PageIndicator
        pageCount={pageCount}
        currentPage={currentPage}
        className="mr-4 justify-end opacity-0"
      />
      <section className="relative flex cursor-pointer flex-nowrap gap-2 overflow-hidden">
        {!disableNext ? (
          <button
            onClick={nextClick}
            className=" absolute right-0 z-[1] h-full bg-black/25 pl-4 opacity-0"
          >
            <ChevronRight className="w-10" style={{ strokeWidth: ".2rem" }} />
          </button>
        ) : null}
        {!disablePrev ? (
          <button
            onClick={prevClick}
            className=" absolute z-[1] h-full bg-black/25 pr-4 opacity-0"
          >
            <ChevronLeft className="w-10" style={{ strokeWidth: ".2rem" }} />
          </button>
        ) : null}
        <section
          ref={panelRef}
          className="flex gap-1 transition-transform duration-700 ease-linear"
        >
          {rowData?.map((row) => {
            // console.log(row);
            const { id } = row;
            return <MovieCard key={id} {...row} />
          })}
        </section>
      </section>

    </section>
  );
}
