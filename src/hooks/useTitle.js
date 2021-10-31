import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = "Release Hubᴮᴱᵀᴬ - " + title;
  }, [title]);
};

export default useTitle;
