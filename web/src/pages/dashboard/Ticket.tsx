import { observer } from "mobx-react-lite";

interface Props {
  children?: React.ReactElement;
  cn?: string;
  statusColor?: string;
}

const Ticket: React.FC<Props> = ({ children, cn, statusColor }) => {
  return (
    <div
      className={`bg-[white] ${
        statusColor && "pl-[15px]"
      } rounded-[8px] w-full relative ${cn}`}
    >
      {statusColor && (
        <div
          className={`absolute font-srb-700 text-[17px] top-0 left-0 w-[15px] h-full text-white rounded-l-[8px]  `}
          style={{ backgroundColor: `${statusColor}` }}
        ></div>
      )}
      {children}
    </div>
  );
};

export default observer(Ticket);
