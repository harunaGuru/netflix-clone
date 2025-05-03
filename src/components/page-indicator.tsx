type pageIndicat = {
  pageCount: number;
  currentPage: number;
  className: string;
};

export default function PageIndicator({
  pageCount,
  currentPage,
  className,
}: pageIndicat) {
  return (
    isFinite(pageCount) ? (
    <ul className={`flex gap-[2px] ${className}`}>
      {Array(pageCount)
        .fill(0)
        .map((arr, index) => (
          <li
            key={index}
            className={` ${
              currentPage === index ? " bg-white" : ""
            } mb-4 h-[2px] w-[15px] rounded-lg bg-gray-500`}
          ></li>
        ))}
    </ul>
    ):null
  );
}
