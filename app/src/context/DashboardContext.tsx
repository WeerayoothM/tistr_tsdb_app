// import React, { createContext, useState } from "react";

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

// // Create the context
// const DashboardContext = createContext<{
//   dashboardSearchState: DashboardSearchData;
//   setDashboardSearchState: React.Dispatch<
//     React.SetStateAction<DashboardSearchData>
//   >;
//   dashboardListState: DashboardData[];
//   setDashboardListState: React.Dispatch<React.SetStateAction<DashboardData[]>>;
// }>({
//   dashboardSearchState: initialDashboardState,
//   setDashboardSearchState: () => {},
//   dashboardListState: null,
//   setDashboardListState: () => {},
// });

// // Create a Provider component to wrap around the parts of the app that need access to the context state
// const DashboardProvider = ({ children }) => {
//   const [dashboardSearchState, setDashboardSearchState] = useState(
//     initialDashboardState
//   );
//   const [dashboardListState, setDashboardListState] = useState<DashboardData[]>(
//     []
//   );

//   return (
//     <DashboardContext.Provider
//       value={{
//         dashboardSearchState,
//         setDashboardSearchState,
//         dashboardListState,
//         setDashboardListState,
//       }}
//     >
//       {children}
//     </DashboardContext.Provider>
//   );
// };

// export { DashboardContext, DashboardProvider };
