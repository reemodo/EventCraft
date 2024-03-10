import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageSvc } from "../../../shared/LocalStorageSvc/LocalStorageSvc";
import { LOCAL_STORAGE_KEYS } from "../../../shared/consts";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../../events/api/user.api";
import { rdxUserActions } from "../../../users/rdx/users.rdx";

export const useAuthHelpers = () => {
  const dispatch = useDispatch();

  const rdxCurrentUser = useSelector((state) => state.user);

  const [onLogin] = useLoginMutation();
  const [onRegister] = useRegisterMutation();

  const [pendingLogin, setPendingLogin] = useState(false);
  const [pendingRegister, setPendingRegister] = useState(false);

  const login = useCallback(
    async (data) => {
      setPendingLogin(true);
      try {
        const userData = await onLogin(data);

        localStorageSvc.set(LOCAL_STORAGE_KEYS.USER, userData);

        dispatch(rdxUserActions.setCurrentUser(userData));
      } catch (err) {
        console.log("🚀 ~ err:", err);
        return false;
      } finally {
        setPendingLogin(false);
      }
      return true;
    },
    [dispatch, onLogin]
  );

  const register = useCallback(
    async (data) => {
      setPendingRegister(true);
      try {
        const userData = await onRegister(data);
        localStorageSvc.set(LOCAL_STORAGE_KEYS.USER, userData);

        dispatch(rdxUserActions.setCurrentUser(userData));
      } catch (err) {
        console.log("🚀 ~ err:", err);
        return false;
      } finally {
        setPendingRegister(false);
      }
      return true;
    },
    [dispatch, onRegister]
  );

  const logout = useCallback(() => {
    localStorageSvc.remove(LOCAL_STORAGE_KEYS.USER);
    dispatch(rdxUserActions.logout());
  }, [dispatch]);

  const isUserLoggedIn = useCallback(() => {
    return !!rdxCurrentUser?.isLoggedIn;
  }, [rdxCurrentUser?.isLoggedIn]);

  return {
    logout,
    login, //
    register,
    isUserLoggedIn,
    pendingLogin,
    pendingRegister,
  };
};
