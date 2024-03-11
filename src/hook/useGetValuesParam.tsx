import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

export const useGetValuesParam = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const queryObject: any = queryString.parse(query) || {};

  return queryObject;
};
