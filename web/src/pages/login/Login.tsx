import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../stores/stores";
import { get } from "lodash";

const Login = () => {
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({});

  const [isPerform, setIsPerform] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userStore = useStore("userStore");

  const navigate = useNavigate();

  const formTemplate: { [key: string]: string }[] = [
    {
      label: "ชื่อผู้ใช้งาน",
      key: "username",
      icon: "/images/user-icon.png",
    },
    {
      label: "รหัสผ่าน",
      key: "password",
      icon: "/images/lock-icon.png",
    },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  const handleChangeInput = (e: any) => {
    setErrorMessage("");
    const value = e.target.value;
    const name = e.target.name;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setIsPerform(false);
      if (!formData.username || !formData.password) {
        setErrorMessage("Username or password is invalid");
        return;
      }
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const resp = await userStore.login(payload);

      if (!resp?.success) {
        setIsPerform(false);
        setErrorMessage("Username or password is invalid");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full font-srb-500 flex flex-col justify-center items-center shrink-0 flex-1 bg-[url('/images/login_bg.png')] min-h-screen bg-no-repeat bg-cover overflow-y-scroll relative"
    >
      <div className="flex flex-col items-center">
        <div className="bg-white  w-[106px] h-[106px] rounded-[31px] mb-[3rem] p-2">
          <img
            src="/images/logo.png"
            alt=""
            className="w-full aspect-w-1 aspect-h-1"
          />
        </div>
        <form className="" onSubmit={handleSubmit}>
          {formTemplate.map((item: { [key: string]: string }, index) => (
            <div className=" mb-[1rem]" key={`user-login-${index}`}>
              <div className="text-[19px] text-white mb-3">{item.label}</div>
              <div className="relative">
                <input
                  type="text"
                  name={item.key}
                  value={formData[item.key]}
                  onChange={(e) => handleChangeInput(e)}
                  placeholder={item.label}
                  className="w-full rounded-[10px] outline-none border-none h-[60px] w-full sm:w-[325px] placeholder:text-slate-400 text-[20px] p-3"
                />
              </div>
            </div>
          ))}
          {errorMessage && <div className="text-[#FF5757]">{errorMessage}</div>}

          <div className="flex justify-center items-end gap-[30px] flex-1 mt-[2rem]">
            <Button
              title="ลงชื่อเข้าใช้"
              cn="bg-[#FFA500] text-white cursor-pointer"
              type="submit"
            />
          </div>
        </form>

        <div className="absolute bottom-[50px] max-w-[325px] bg-white rounded-[17px] h-[75px] w-[455px] flex justify-center items-center">
          <img
            src="/images/tistr_login-logo.png"
            alt=""
            className="max-w-[300px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default observer(Login);
