import React, { createContext, useState } from "react";

// Initial state with the JSON data
const initialProjectState = {
  project_status: "",
  start_date: "",
  end_date: "",
  location_region: "",
  location_province: "",
  location_amphur: "",
  location_district: "",
  project_resp_dept: "",
  project_sub_dept: "",
  project_responsible: "",
  location_target: "",
  project_name_th: "",
  project_code: "",
  contract_no: "",
  budget_amount: "",
  research_fund: "",
};

// types.d.ts
export interface ProjectSearchData {
  project_status: string;
  start_date: string;
  end_date: string;
  location_region: string;
  location_province: string;
  location_amphur: string;
  location_district: string;
  project_resp_dept: string;
  project_sub_dept: string;
  project_responsible: string;
  location_target: string;
  project_name_th: string;
  project_code: string;
  contract_no: string;
  budget_amount: string;
  research_fund: string;
}

export interface ProjectData {
  project_id: string;
  source: string;
  project_code: string;
  project_name_th: string;
  project_name_en: string;
  start_date: string;
  end_date: string;
  approve_date: string;
  actual_start_date: string;
  actual_end_date: string;
  project_location: string;
  location_region: string;
  location_province: string;
  location_amphur: string;
  location_district: string;
  location_village: string;
  location_target: string;
  project_status: string;
  project_details: string;
  project_eva_result: string;
  project_eva_percentage: string;
  project_responsible: string;
  project_resp_dept: string;
  project_sub_dept: string;
  research_project_code: string;
  project_objective: string;
  project_indicator: string;
  contract_party: string;
  research_fund: string;
  contract_no: string;
  budget_year: string;
  budget_amount: number;
  fund_status: string;
  technology_type: string;
  technology_field: string;
  project_productivity: string;
  productivity_type: string;
  productivity_year: string;
  publication: string;
  ip1: string;
  ip2: string;
  project_resp_emp_id: string | null;
}

// Create the context
const ProjectContext = createContext<{
  projectSearchState: ProjectSearchData;
  setProjectSearchState: React.Dispatch<
    React.SetStateAction<ProjectSearchData>
  >;
  projectListState: ProjectData[];
  setProjectListState: React.Dispatch<React.SetStateAction<ProjectData[]>>;
  resetProjectSearchState;
}>({
  projectSearchState: initialProjectState,
  setProjectSearchState: () => {},
  projectListState: null,
  setProjectListState: () => {},
  resetProjectSearchState: () => {},
});

// Create a Provider component to wrap around the parts of the app that need access to the context state
const ProjectProvider = ({ children }) => {
  const [projectSearchState, setProjectSearchState] =
    useState(initialProjectState);
  const [projectListState, setProjectListState] = useState<ProjectData[]>([]);

  const resetProjectSearchState = () => {
    setProjectSearchState(initialProjectState);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectSearchState,
        setProjectSearchState,
        projectListState,
        setProjectListState,
        resetProjectSearchState,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
