import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import VerticalNav from "./VerticalNav";
import { useStore } from "../../stores/stores";
import LoadingModal from "./LoadingModal";

const Default = () => {
  const mainStore = useStore("mainStore");
  return (
    <>
      <div className="flex h-[100vh] w-[100vw] overflow-hidden relative">
        {mainStore.isLoading ? (
          <div className="absolute top-50 left-50 z-[10000]">
            <LoadingModal />
          </div>
        ) : null}
        <VerticalNav />
        <div className="flex-1 shrink-0">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default observer(Default);
