import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/localStorage";
import jwtDecode from "jwt-decode";

const Header: React.FC = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const [toggleLogout, setToggleLogout] = useState(false);
  const [title, setTitle] = useState("แดชบอร์ด");
  const location = useLocation();

  let token = {} as any;
  if (getToken()) {
    token = (getToken() ? jwtDecode(getToken() as string) : "") as any;
  }

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {}, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (location.pathname.includes("dashboard")) {
      setTitle("แดชบอร์ด");
    } else if (location.pathname.includes("project")) {
      setTitle("รายงานผลโครงการ");
    } else if (location.pathname.includes("import")) {
      setTitle("การนำเข้าข้อมูล");
    } else if (location.pathname.includes("authorization")) {
      setTitle("จัดการสิทธิ์ผู้ใช้งาน");
    } else if (location.pathname.includes("admin")) {
      setTitle("ส่วนผู้ดูแลระบบ");
    }
  }, [location.pathname]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="z-[3] bsd h-[107px]">
      {/* desktop nav */}
      <div className="bg-[#ffffff] font-srb-700 font-lineRg left-0 flex justify-between items-center px-[1.5em] py-[1em] text-[24px]">
        <div className="flex justify-center text-[35px] items-center text-[#1265DC]">
          {title}
        </div>
        <div className="flex items-center gap-[1em]">
          <div className="w-[59px] h-[59px] bg-[#D9D9D9] rounded-[20px]"></div>
          <div className="text-[15px] font-srb-600 text-[#666666]">
            <div>{`${token.FName} ${token.LName}`}</div>
            <div>แอดมิน</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default observer(Header);
