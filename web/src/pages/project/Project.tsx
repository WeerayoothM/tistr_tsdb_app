import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import CardWithHeader from "../../components/CardWithHeader";
import { projectTemplate } from "./Data/data";
import { useNavigate } from "react-router-dom";

const Project = () => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px] flex flex-col justify-center gap-[3rem]"
    >
      {projectTemplate.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          onClick={() => navigate(item.link)}
          className={`flex items-center justify-between ${item.background} rounded-[8px] h-[170px] px-[2rem] bg-no-repeat bg-cover w-full cursor-pointer`}
        >
          <div className="flex flex-col gap-[10px] text-white">
            <div className="text-[31px] font-srb-700">{item.title}</div>
            <div className="text-[22px] font-srb-400">{item.subTitle}</div>
          </div>
          <div>
            <img src="/images/project-arrow-right.png" alt="" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default observer(Project);
