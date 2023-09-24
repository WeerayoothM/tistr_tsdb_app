import { createContext, useState } from "react";

export interface Chart1Dataset {
  type: string;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface Chart1Data {
  labels: string[];
  datasets: Chart1Dataset[];
}

export interface Chart2Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

export interface Chart2Data {
  labels: string[];
  datasets: Chart2Dataset[];
}

export interface Chart2 {
  data: Chart2Data;
}

export interface Notification {
  notify_id: number;
  emp_id: number;
  message: string;
  status_read: string;
  create_date: string;
  update_date: string;
  link: string;
}

// Create the context
const DashboardContext = createContext<{
  notiListState: Notification[];
  setNotiListState: React.Dispatch<React.SetStateAction<Notification[]>>;
}>({
  notiListState: [] as Notification[],
  setNotiListState: () => [],
});

// Create a Provider component to wrap around the parts of the app that need access to the context state
const DashboardProvider = ({ children }) => {
  const [notiListState, setNotiListState] = useState<Notification[]>([]);

  return (
    <DashboardContext.Provider
      value={{
        notiListState,
        setNotiListState,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
