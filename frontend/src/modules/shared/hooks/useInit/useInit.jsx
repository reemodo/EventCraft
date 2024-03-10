import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { localStorageSvc } from "../../LocalStorageSvc/LocalStorageSvc";
import { LOCAL_STORAGE_KEYS } from "../../consts";
import { rdxUserActions } from "../../../users/rdx/users.rdx";

export const useInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = localStorageSvc.get(LOCAL_STORAGE_KEYS.USER);
      console.log("🚀 ~ user:", user);
      dispatch(rdxUserActions.setCurrentUser(user));
    })();
  }, [dispatch]);

  return {};
};
