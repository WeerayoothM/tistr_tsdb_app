import { observer } from "mobx-react-lite";
import { Link, useLocation, useNavigate } from "react-router-dom";

const nav = [
  {
    title: "แดชบอร์ด",
    parent: "dashboard",
    link: "/dashboard",
    logo: "/images/dashboard-logo.png",
    logoActive: "/images/dashboard-logo-active.png",
  },
  {
    title: "รายงายผลโครงการ",
    parent: "project",
    link: "/project",
    logo: "/images/report-logo.png",
    logoActive: "/images/report-logo-active.png",
  },
  {
    title: "การนำเข้าข้อมูล",
    parent: "import",
    link: "/import",
    logo: "/images/import-logo.png",
    logoActive: "/images/import-logo-active.png",
  },
  {
    title: "จัดการสิทธิ์ผู้ใช้งาน",
    parent: "authorization",
    link: "/authorization",
    logo: "/images/authorization-logo.png",
    logoActive: "/images/authorization-logo-active.png",
  },
  {
    title: "ส่วนผู้ดูแลระบบ",
    parent: "admin",
    link: "/admin",
    logo: "/images/admin-lock-logo.png",
    logoActive: "/images/admin-lock-logo-active.png",
  },
];

const VerticalNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-[350px] font-srb-600 relative shrink-0 z-[1000] bg-no-repeat bg-cover bg-[url('/images/vertical-nav-bg.png')] flex flex-col items-center py-[2rem] text-[#ffffff] overflow-y-scroll">
      <div className="flex flex-col items-start justify-start mt-[1rem] h-full w-full px-[2rem] gap-[1.5rem]">
        <div className="w-full flex justify-center mb-[2rem]">
          <div className="bg-white   w-[106px] h-[106px] rounded-[31px] p-2">
            <img
              src="/images/logo.png"
              alt=""
              className="w-full aspect-w-1 aspect-h-1"
            />
          </div>
        </div>

        {nav.map((item, index) => (
          <div
            className={`flex justify-start items-center w-full h-[60px] px-[1rem] cursor-pointer ${
              location.pathname.includes(item.parent)
                ? "bg-white text-[#1265DC] rounded-[20px]"
                : ""
            }`}
            key={`sub-nav-${index}`}
            onClick={() => navigate(item.link)}
          >
            <div className="flex items-center">
              <img
                src={
                  location.pathname.includes(item.parent)
                    ? item.logoActive
                    : item.logo
                }
                alt=""
              />
            </div>
            <div className={`px-[30px] cursor-pointer text-[18px]`}>
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-full px-[3rem] flex justify-start absolute bottom-[4rem]"
        onClick={() => navigate("/login")}
      >
        <div>
          <img src="/images/logout-logo.png" alt="" />
        </div>
        <div className={`px-[30px] cursor-pointer text-[18px]`}>ออกจากระบบ</div>
      </div>
    </div>
  );
};
export default observer(VerticalNav);
