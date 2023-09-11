import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { scrollTop } from "../../utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { get, isEmpty, isObject } from "lodash";
import "./style/index.css";

import { Table, Modal } from "antd";
import { addAdmin, changeActive, deleteAdmin, getAdminList } from "./APIS";
import { useStore } from "../../stores/stores";
import { getUserList } from "../Authorization/APIS";
// import { getProjectList } from "./APIS";

const defaultFormData = {
  empId: "",
  id: "",
  fullName: "",
  group: "",
};

const AdminList = () => {
  const navigate = useNavigate();
  const adminStore = useStore("adminStore");
  const [adminData, setAdminData] = useState<{ [key: string]: any }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<any>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [total, setTotal] = useState(0);

  const columns: any = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "ID",
      dataIndex: "empId",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "ชื่อผู้ใช้งาน",
      dataIndex: "username",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "projectResponsible",
      render: (text: string, record: any) => (
        <div className="flex justify-start items-center gap-[10px] text-[#ADB5BD]">
          <div>{`${record.fname} ${record.lname}`}</div>
        </div>
      ),
    },
    {
      title: "หน่วยงาน",
      dataIndex: "subDivision",
      align: "center",
      render: (text: string, record: any) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "สิทธิ์การใช้งาน",
      dataIndex: "level",
      render: (text: string) => (
        <div className="flex justify-center items-center gap-[10px] text-[#ADB5BD]">
          <div className="w-[15px] h-[15px] rounded-full bg-[#ADB5BD] shrink-0"></div>
          <div>แอดมิน</div>
        </div>
      ),
      align: "center",
    },
    {
      title: "สถานะ",
      dataIndex: "isActive",
      render: (text: string, record: any) => {
        return (
          <div className=" flex items-center justify-center gap-[20px] max-w-[200px]">
            <img
              src={`/images/${text === "Y" ? "toggle-on" : "toggle-off"}.png`}
              alt=""
              className="w-[30px]"
              onClick={async () => {
                await changeActive(record.id, text === "Y" ? "N" : "Y");
                getAdminData({ ...adminStore.searchObject });
              }}
            />
          </div>
        );
      },
      align: "center",
    },
    {
      title: "ลบ",
      dataIndex: "manage",
      render: (text: string, record: any) => {
        return (
          <div className=" flex items-center justify-center gap-[20px] max-w-[200px]">
            <img
              src={`/images/edit.png`}
              alt=""
              className="w-[15px]"
              onClick={async () => {
                await deleteAdmin(record.id);
                getAdminData({ ...adminStore.searchObject });
              }}
            />
          </div>
        );
      },
      align: "center",
    },
  ];

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    getAdminData({ ...adminStore.searchObject });
  }, [JSON.stringify(tableParams)]);

  const getAdminData = async (payload: any) => {
    try {
      const offset =
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize;
      const resp = await getAdminList({
        offset,
        limit: tableParams.pagination.pageSize,
        payload,
      });

      const data = get(resp, "data.item", []).map(
        (item: any, index: number) => {
          return { ...item, no: offset + index + 1 };
        }
      );
      setAdminData(data);
      setTotal(get(resp, "data.total", 0));

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: get(resp, "data.total", 0),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const searchAdmin = async () => {
    const resp = await getUserList({
      offset: 0,
      limit: 1,
      payload: {
        EmpId: formData.empId,
      },
    });
    const [data] = get(resp, "data.item", []);
    setFormData({
      ...formData,
      id: get(data, "id", ""),
      fullName: `${get(data, "fname", "")} ${get(data, "lname", "")}`,
      group: get(data, "subDivision", ""),
    });
  };

  const handleTableChange = (pagination: any) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAdminData([]);
    }
  };

  const showModal = () => {
    setFormData(defaultFormData);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeInput = (
    e: any,
    key: string = "",
    type: string = "",
    detail: string = ""
  ) => {
    const value = (isObject(e) as any) ? e.target.value : e;
    const name = (isObject(e) as any) ? e.target.name : key;

    if (type === "checkbox") {
      const oldValue = get(formData, key, []) as any[];
      const setValue = oldValue.some((item: any) => +item === +value)
        ? oldValue.filter((item: string) => +item !== +value)
        : [...oldValue, +value];
      setFormData(
        detail
          ? { ...formData, [key]: setValue, [detail]: "" }
          : { ...formData, [key]: setValue }
      );
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const createAdmin = async () => {
    try {
      if (!formData.id) return;
      await addAdmin(formData.id);
      getAdminData({ ...adminStore.searchObject });
      setFormData(defaultFormData);
      handleCancel();
    } catch (e) {
    } finally {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-y-scroll h-[calc(100%-107px)] px-[50px] py-[30px] flex flex-col"
    >
      <div className="flex mb-[2rem]">
        <div
          onClick={() => {
            showModal();
          }}
          className="flex items-center cursor-pointer justify-center rounded-[8px] bg-[#FFA500] text-[20px] h-[60px] w-[230px] text-[white] "
        >
          + เพิ่มแอดมิน
        </div>
      </div>

      {/* Ant table */}
      <div className="out-budget">
        <Table
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => {
          //       const projectId = get(record, "projectId");
          //       if (!projectId) return;
          //       navigate(`/project/${projectId}`);
          //     }, // click row
          //   };
          // }}
          rowKey={(record) => {
            return record.id;
          }}
          bordered
          columns={columns}
          dataSource={adminData}
          loading={loading}
          onChange={handleTableChange}
          pagination={tableParams.pagination}
        />
      </div>
      {/* Ant table */}

      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ padding: "10px" }}>
          <div
            className=""
            style={{
              textAlign: "center",
              color: "#1265DC",
              fontSize: "19px",
              marginBottom: "1rem",
            }}
          >
            เพิ่มแอดมิน
          </div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
                gap: "20px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ textAlign: "end", color: "#666666" }}>ID</div>
              <div style={{ position: "relative", gridColumn: "2/-1" }}>
                <input
                  type="text"
                  name={"empId"}
                  value={formData.empId || ""}
                  placeholder={"ชื่อผู้ใช้งาน..."}
                  onChange={(e) => handleChangeInput(e)}
                  style={{
                    outline: "none",
                    color: "#666666",
                    border: "none",
                    backgroundColor: "#F2F2F8",
                    borderRadius: "11px",
                    padding: "1rem 1.25rem",
                    width: "100%",
                    fontSize: "16px",
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      if (!formData.empId) return;
                      searchAdmin();
                    }
                  }}
                />

                <div
                  id="search-user"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "12px",
                    transform: "translate(-50%,-40%)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (!formData.empId) return;
                    searchAdmin();
                  }}
                >
                  <img src="/images/project-input-search.png" alt="" />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
                gap: "20px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ textAlign: "end", color: "#666666" }}>
                ชื่อ-นามสกุล
              </div>
              <div style={{ position: "relative", gridColumn: "2/-1" }}>
                <input
                  type="text"
                  name={"id"}
                  value={formData.fullName || ""}
                  placeholder={""}
                  readOnly
                  style={{
                    outline: "none",
                    color: "#666666",
                    border: "none",
                    backgroundColor: "#F2F2F8",
                    borderRadius: "11px",
                    padding: "1rem 1.25rem",
                    width: "100%",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
                gap: "20px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ textAlign: "end", color: "#666666" }}>หน่วยงาน</div>
              <div style={{ position: "relative", gridColumn: "2/-1" }}>
                <input
                  type="text"
                  name={"id"}
                  value={formData.group || ""}
                  placeholder={""}
                  readOnly
                  style={{
                    outline: "none",
                    color: "#666666",
                    border: "none",
                    backgroundColor: "#F2F2F8",
                    borderRadius: "11px",
                    padding: "1rem 1.25rem",
                    width: "100%",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #FFA500",
                  color: "#FFA500",
                  fontSize: "20px",
                  flex: "1",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleCancel()}
              >
                ยกเลิก
              </div>
              <div
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "20px",
                  flex: "1",
                  textAlign: "center",
                  backgroundColor: formData.id ? "#FFA500" : "#D8D9E8",
                  cursor: "pointer",
                }}
                onClick={() => createAdmin()}
              >
                บันทึก
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default observer(AdminList);
