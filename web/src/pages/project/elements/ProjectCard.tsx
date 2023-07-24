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
    <div className={`bg-[white] rounded-[8px] w-full  ${cn}`}>
      {headerTitle && (
        <div
          className={`font-srb-700 text-[17px] text-white rounded-t-[8px]  px-[2rem] py-[0.5rem]`}
          style={{ backgroundColor: `${headerColor}` }}
        >
          {headerTitle}
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default observer(ProjectCard);
