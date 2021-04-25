import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = "Release Hub - " + title;
  }, [title]);
};

export default useTitle;
