import { Spin } from "antd";
import { LoaderWrapper } from "./styles";

const Loader = () => {
  return (
    <LoaderWrapper>
      <Spin />
    </LoaderWrapper>
  );
};

export default Loader;
