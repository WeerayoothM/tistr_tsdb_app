import { observer } from "mobx-react-lite";

interface Props {
  children?: React.ReactElement;
  cn?: string;
  headerTitle?: string;
  headerColor?: string;
}

const ProjectCard: React.FC<Props> = ({
  children,
  cn,
  headerTitle,
  headerColor,
}) => {
  return (
    <div
      className={`bg-[white] ${
        headerTitle && "pt-[38px]"
      } rounded-[8px] w-full relative ${cn}`}
    >
      {headerTitle && (
        <div
          className={`absolute font-srb-700 text-[17px] top-0 w-full  text-white rounded-t-[8px]  px-[2rem] py-[0.5rem]`}
          style={{ backgroundColor: `${headerColor}` }}
        >
          {headerTitle}
        </div>
      )}
      {children}
    </div>
  );
};

export default observer(ProjectCard);
