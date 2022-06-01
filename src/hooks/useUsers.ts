import React from "react";
import { Context } from "../context/AuthContext";
import { IUsers } from "../interfaces/IUsers";
import useFetch from "./useFetch";

const useUsers = () => {
  const { putAuth, getAuth } = useFetch();
  const { handleResp } = React.useContext(Context);

  const getUsers = async () => {
    let url = `/user`;
    const { response, json } = await getAuth(url);
    if (response !== undefined && response.ok) {
      return json as IUsers[];
    } else {
      return [] as IUsers[];
    }
  };

  const changeStatus = async (id: number, status: boolean) => {
    let url = `/user/changestatus`;
    const { response, json } = await putAuth(url, { id, active: status });
    if (response !== undefined && response.ok) {
      handleResp("success", "User change successful");
    } else {
      handleResp("error", "An error has ocurred");
    }
  };

  return {
    changeStatus,
    getUsers,
  };
};

export default useUsers;
