import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  CaretDown,
  Bell,
  SplitHorizontal,
  ArrowsInLineHorizontal,
  SignOut,
  Note,
  BookmarkSimple,
  CaretLeft,
  User,
  Headset,
  CrownSimple,
} from "@phosphor-icons/react";
import { useLayoutContext } from "context/layout-context.jsx";
import AuthContext from "context/auth-context.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toPersianNumber } from "utils/helper.js";
import Divider from "../ui/Divider.jsx";
import Drawer from "../Drawer/index.jsx";
import "./style.css";
import NotificationsInDrawer from "../NotificationsInDrawer/index.jsx";
import { Breadcrumbs } from "../Breadcrumb/index.jsx";
import { useScrollPosition } from "hooks/useScrollPosition.jsx";
import { CButton } from "components/ui/CButton.jsx";
import ToolTip from "../ui/ToolTip.jsx";
import { useCronJob } from "context/cronJob.jsx";

export const Header = () => {
  const {
    breadcrumb,
    isSidebarOpened,
    setIsSidebarOpened,
    openDrawer,
    setOpenDrawer,
  } = useLayoutContext();

  const { newNotif, totalNotif, totalAnnounce } = useCronJob();

  const { isScrolled } = useScrollPosition();
  const { profile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpened(!isSidebarOpened);

  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [buttonRef]);

  return (
    <>
      <div
        className={`flex flex-auto items-center px-6 py-4 justify-between bg-light-neutral-surface-low relative [direction:ltr] z-50 ${
          !isScrolled ? "drop-shadow-sm" : ""
        }`}
        id="header"
      >
        <div
          className={"inline-flex items-center gap-4 flex-[0_0_auto] relative"}
        >
          <div ref={buttonRef} className="relative focus:outline-none">
            <div
              className={
                "inline-flex items-center gap-2 flex-[0_0_auto] justify-end relative cursor-pointer"
              }
              onClick={() => setOpen((l) => !l)}
            >
              <CaretDown className={"!relative !w-4 !h-4"} opacity={"0.5"} />
              <div
                className={
                  "font-body-medium w-fit text-light-neutral-text-high [direction:rtl] whitespace-nowrap relative"
                }
              >
                {!!(profile?.first_name + " " + profile.last_name).trim()
                  ? profile?.first_name + " " + profile.last_name
                  : profile?.username}
              </div>
            </div>
            {open && (
              <div className="absolute top-12 left-0 bg-light-neutral-surface-card p-4 rounded-lg flex flex-col gap-3 w-[273px] [direction:rtl] shadow-md">
                <div
                  className="group cursor-pointer items-center gap-2 rounded-lg py-2 hover:bg-light-neutral-surface-highlight flex justify-between"
                  onClick={() => {
                    setOpen(false);
                    navigate("/app/user/profile");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-light-neutral-surface-highlight w-12 h-12 rounded-full flex items-center justify-center">
                      {profile?.avatar ? (
                        <img
                          src={`${profile?.avatar}`}
                          className="rounded-full"
                          alt="profile-img"
                        />
                      ) : (
                        <User
                          className="text-light-neutral-text-medium"
                          size={25}
                        />
                      )}
                    </div>
                    <div className="font-body-small">
                      <p className="font-body-medium">
                        {profile?.first_name} {profile?.last_name}
                      </p>
                      <p className="font-body-small text-start text-light-neutral-text-medium">
                        {profile?.username}
                      </p>
                    </div>
                  </div>
                  <CaretLeft className="text-light-neutral-text-medium" />
                </div>
                <div
                  className="group cursor-pointer flex items-center gap-2 rounded-lg p-2 hover:bg-light-neutral-surface-highlight justify-between"
                  onClick={() => {
                    setOpen(false);
                    navigate("/app/bookmarks");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <BookmarkSimple className="size-5" />
                    <span className="font-body-small">نشان‌شده‌‌ها</span>
                  </div>
                  <CaretLeft className="text-light-neutral-text-medium hidden group-hover:block" />
                </div>
                <div
                  className="group cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-light-neutral-surface-highlight flex justify-between"
                  onClick={() => {
                    setOpen(false);
                    navigate("/app/notes");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Note className="size-5" />
                    <span className="font-body-small">یادداشت‌ها</span>
                  </div>
                  <CaretLeft className="text-light-neutral-text-medium hidden group-hover:block" />
                </div>
                <Divider />
                <div
                  className="group cursor-pointer flex items-center gap-2 rounded-lg p-2 hover:bg-light-neutral-surface-highlight justify-between"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <SignOut className="size-5" />
                    <span className="font-body-small">خروج‌از‌حساب‌کاربری</span>
                  </div>
                  <CaretLeft className="text-light-neutral-text-medium hidden group-hover:block" />
                </div>
              </div>
            )}
          </div>
          <div className={"w-[1px] h-6 bg-[#e7e8ed]"}></div>
          <div className="flex items-center gap-8">
            <div
              className={
                "inline-flex items-center gap-2 flex-[0_0_auto] justify-end relative cursor-pointer ml-4"
              }
              onClick={() => setOpenDrawer(true)}
            >
              <Bell className={"!relative !w-[24px] !h-[24px]"} />

              {newNotif && (
                <div
                  className={
                    "w-[16px] h-[16px] left-[15px] font-body-small rounded-full pt-[2px] bg-light-warning-background-rest absolute flex items-center justify-center text-[12px] text-white"
                  }
                >
                  <span>{toPersianNumber(totalAnnounce + totalNotif)}</span>
                </div>
              )}
            </div>
            <Link
              to={"/app/ticket/list"}
              className={
                "inline-flex items-center gap-2 flex-[0_0_auto] justify-end relative cursor-pointer"
              }
            >
              <ToolTip comp={"پشتیبانی"} position="bottom">
                <Headset className={"!relative !w-[24px] !h-[24px]"} />
              </ToolTip>
            </Link>
          </div>
          <div className={"w-[1px] h-6 bg-[#e7e8ed] mx-2"}></div>
          {(profile.role === "Manager" || profile.role === "Support") && (
            <ToolTip comp={"پنل مدیریت"} position="bottom">
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => navigate("/admin/dashboard")}
              >
                <CrownSimple className="!relative !w-[24px] !h-[24px] transition-all" />
              </div>
            </ToolTip>
          )}
        </div>
        <div
          className={"inline-flex items-start gap-8 flex-[0_0_auto] relative"}
        >
          <div
            className={
              "inline-flex items-center gap-8 flex-[0_0_auto] justify-end relative"
            }
          >
            <div
              className={
                "font-subtitle-large w-fit text-light-neutral-text-high [direction:rtl] whitespace-nowrap relative"
              }
            >
              <Breadcrumbs breadcrumb={breadcrumb} />
            </div>
          </div>
          <div
            className={
              "inline-flex items-center gap-[10px] flex-[0_0_auto] p-[6px] rounded-[4px] bg-light-neutral-background-low relative cursor-pointer"
            }
            onClick={toggleSidebar}
          >
            {!isSidebarOpened && (
              <SplitHorizontal className={"!relative !w-3 !h-3"} />
            )}
            {isSidebarOpened && (
              <ArrowsInLineHorizontal className={"!relative !w-3 !h-3"} />
            )}
          </div>
        </div>
      </div>
      {openDrawer && (
        <Drawer setShowMore={setOpenDrawer}>
          <NotificationsInDrawer />
        </Drawer>
      )}
    </>
  );
};

Header.propTypes = {
  newNotif: PropTypes.bool,
  sideBarIcon: PropTypes.bool,
};
