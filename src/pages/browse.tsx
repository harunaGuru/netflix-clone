//@ts-nocheck
// import React from 'react'
// import { useState } from "react";
import { ENDPOINTS } from "../common/endpoints";
import Banner from "../components/banner";
import ContentRow from "../components/content-row";
// import { useMOvieContext } from "../components/context";

export default function Browse() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [value, setValue] = useState<position | null>(null);
  // const [hidePost, setHidePost] = useState(false);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function onClose(value: boolean) {
  //   setIsOpen(value);
  // }
// const { moviewrap } = useMOvieContext()
  return (
    <section className="absolute top-0">
      <Banner />
      <section className="mb-12 flex flex-col">
        <ContentRow
          title="Popular Movies"
          endpoint={ENDPOINTS.POPULAR_MOVIES}
        />
        <ContentRow title="Top Rated" endpoint={ENDPOINTS.TOP_RATED} />
        <ContentRow title="Now Playing" endpoint={ENDPOINTS.NOW_PLAYING} />
      </section>
    </section>
  )
}



