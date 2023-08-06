import { observer } from "mobx-react-lite";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { initTasks } from "../../../utils/helper";
import { get, isEmpty } from "lodash";

interface Props {
  projectData: any;
  color: string;
}

const GantChart: React.FC<Props> = ({ projectData, color = "#1265DC" }) => {
  const view = ViewMode.Week;
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    if (isEmpty(projectData)) return;

    const newTasks = (initTasks(projectData) || []).map((item: any) => {
      const hasStartAndEnd = get(item, "start") && get(item, "end");
      return hasStartAndEnd
        ? item
        : { ...item, start: new Date(), end: new Date() };
    });

    setTasks(newTasks);
  }, [projectData]);

  return (
    <div className={`w-full`}>
      {!isEmpty(tasks) && (
        <Gantt
          tasks={tasks}
          viewMode={view}
          columnWidth={140}
          barBackgroundColor={color}
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
          barBackgroundSelectedColor={color}
          barCornerRadius={8}
        />
      )}
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
