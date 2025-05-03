type breaker = "width" | "original"

export type userProfile ={
  name: string;
  imageURl: string;
  id: string;
}
export type savedProfile ={
  profile: userProfile[];
  savedProfileId: string;
}


export type DispatchType = {
  type: "edit" | "add" | "current" | "delete";
  payload: userProfile;
} | {
  type: "load";
  payload: any;
}

export const createImageURl = (name: string | null, width?: number, type: breaker = "width") => {
  //  https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
  const result =
    type === "width"
      ? `${import.meta.env.VITE_IMAGE_URI}/w${width}/${name}`
      : `${import.meta.env.VITE_IMAGE_URI}/${type}/${name}`;
  return result
};


// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
