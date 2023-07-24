import { observer } from "mobx-react-lite";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import { initTasks } from "../../../utils/helper";

interface Props {}

const GantChart: React.FC<Props> = ({}) => {
  const view = ViewMode.Week;
  const [tasks, setTasks] = useState<any>(initTasks());
  return (
    <div className={`w-full`}>
      <Gantt
        tasks={tasks}
        viewMode={view}
        columnWidth={140}
        barBackgroundColor="#1265DC"
        rowHeight={70}
        fontSize={"12"}
        TaskListHeader={({ headerHeight }) => (
          <div
            style={{
              height: headerHeight,
              fontFamily: "sans-serif",
              fontWeight: "bold",
              margin: 0,
              marginBottom: -1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              border: "1px solid #e8ecfd",
            }}
          >
            รายการ
          </div>
        )}
        TaskListTable={(props) => <TaskListTable {...props} />}
        TooltipContent={() => <></>}
        todayColor={"transparent"}
        barBackgroundSelectedColor={"#1265DC"}
        barCornerRadius={8}
      />
    </div>
  );
};

type TaskListTableProps = {
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: any[];
};

const TaskListTable = ({ tasks, rowWidth, rowHeight }: TaskListTableProps) => {
  return (
    <div style={{ border: "1px solid #dfe1e5" }}>
      {tasks.map((item, i) => {
        return (
          <div
            key={item.id}
            style={{
              height: rowHeight,
              width: rowWidth,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "auto",
              fontFamily: "sans-serif",
              background: i % 2 === 0 ? "#ffffff" : "#F8F9FF",
              padding: 10,
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                margin: 0,
              }}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default observer(GantChart);
