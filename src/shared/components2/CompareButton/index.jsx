import { useState } from "react";
import { CButton } from "../ui/CButton.jsx";
import { Exclude, FileArrowDown } from "@phosphor-icons/react";
import PropTypes from "prop-types";
import ToolTip from "components/ui/ToolTip.jsx";
import { useRouter } from 'next/navigation';
import compare from "service/api/compare.js";
import { useCompareStore } from "store/compareStore.js";

export const CompareButton = ({
  children,
  platform,
  query,
  minimize,
  filters,
}) => {
  const router = useRouter()
  const setCompare = useCompareStore((state) => state.setCompare);

  const navigateToCompare = async () => {
    if (!query || query === "") return;
    try {
      setCompare({
        step: 2,
        type: "topic",
        platform: platform,
        date: filters.date,
        fields: [
          { filters: filters, isEdit: true, q: query },
          {
            isEdit: true,
            filters: {
              sentiment: [],
              gender: ["all"],
              subjectCategory: [],
              language: [],
              sources: [],
              keywords: [],
              hashtags: [],
            },
            q: "",
          },
        ],
      });
      router.push("/app/compare/create");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {minimize ? (
        <ToolTip comp={"مقایسه"}>
          <CButton
            mode={"outline"}
            rightIcon={<Exclude size={22} />}
            onClick={() => navigateToCompare()}
            className={"!pl-2 !pr-1"}
          />
        </ToolTip>
      ) : (
        <CButton
          mode={"outline"}
          rightIcon={<Exclude size={20} />}
          onClick={() => navigateToCompare()}
          width={100}
        >
          {children}
        </CButton>
      )}
    </>
  );
};

CompareButton.propTypes = {
  children: PropTypes.node,
  platform: PropTypes.string,
  query: PropTypes.string,
  filters: PropTypes.object,
  minimize: PropTypes.bool,
};
