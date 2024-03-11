import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { token } from "../common/const";

interface ApiContextProps {
  loading: boolean;
  error: any;
  fetchData: (url: string) => Promise<void>;
  postData: (url: string, data: any) => Promise<any>;
  putData: (url: string, data: any) => Promise<any>;
  deleteData: (url: string) => Promise<any>;
}

// Create a Context
const ApiContext = createContext<ApiContextProps | undefined>(undefined);

// Create a custom hook to use Context
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};

// Create a Provider
interface ApiProviderProps {
  children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async (url: string, data?: any): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (url: string, data: any): Promise<any> => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(url, data, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const putData = async (url: string, data: any): Promise<any> => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.put(url, data, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (url: string): Promise<any> => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.delete(url, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider
      value={{ loading, error, fetchData, postData, putData, deleteData }}
    >
      {children}
    </ApiContext.Provider>
  );
};
