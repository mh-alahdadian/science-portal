import { useState } from "react";
import { CButton } from "../ui/CButton.jsx";
import { FileArrowDown } from "@phosphor-icons/react";
import DownloadDrawer from "./DownloadDrawer/index.jsx";
import PropTypes from "prop-types";
import ToolTip from "components/ui/ToolTip.jsx";

export const DownloadExcelButton = ({ children, platform, q, minimize }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      {minimize ? (
        <ToolTip comp={"دانلود خروجی اکسل"}>
          <CButton
            mode={"outline"}
            rightIcon={<FileArrowDown size={22} />}
            onClick={() => setShowDrawer(true)}
            className={"!pl-2 !pr-1"}
          />
        </ToolTip>
      ) : (
        <CButton
          mode={"outline"}
          rightIcon={<FileArrowDown size={20} />}
          onClick={() => setShowDrawer(true)}
        >
          {children}
        </CButton>
      )}
      <div className={!showDrawer ? "hidden" : ""}>
        <DownloadDrawer
          setShowDrawer={setShowDrawer}
          platform={platform}
          q={q}
        />
      </div>
    </>
  );
};

DownloadExcelButton.propTypes = {
  children: PropTypes.node,
  platform: PropTypes.string,
  q: PropTypes.string,
  minimize: PropTypes.bool,
};
