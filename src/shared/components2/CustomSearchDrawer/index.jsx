import { PencilSimpleLine } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { TagInput } from "../ui/TagInput.jsx";
import Divider from "../ui/Divider.jsx";
import { CInput } from "../ui/CInput.jsx";
import { CButton } from "../ui/CButton.jsx";
import Drawer from "../Drawer/index.jsx";
import PropTypes from "prop-types";
import useSearchStore from "store/searchStore.js";

const CustomSearchDrawer = ({
  inputQuery,
  setShowMore,
  onSubmit = () => {},
}) => {
  const { query, setQuery } = useSearchStore();
  const [andWords, setAndWords] = useState([]);
  const [orWords, setOrWords] = useState([]);
  const [notWords, setNotWords] = useState([]);
  const [newQuery, setNewQuery] = useState(inputQuery || query);
  const validateQ = (query) => query !== "";
  const generateQueryString = (andArr, orArr, notArr) => {
    // 1) Generate the AND-part
    // e.g., ["word1", "word2"] -> "word1 AND word2"
    const andClause = andArr.filter(Boolean).join(" AND ");

    // 2) Generate the OR-part
    // e.g., ["word3", "word4"] -> "(word3 OR word4)"
    let orClause = orArr.filter(Boolean).join(" OR ");
    if (orClause && orArr.length > 1) {
      orClause = `(${orClause})`;
    }

    // 3) Generate the NOT-part
    // e.g., ["word5", "word6"] -> "NOT word5 NOT word6"
    const notClause = notArr
      .filter(Boolean)
      .map((word) => `NOT ${word}`)
      .join(" ");

    // 4) Combine:
    //    - Join the AND and OR parts with " AND " if both exist
    //    - Then add the NOT part (prefixed by a space if there's already content)
    const andOrParts = [andClause, orClause].filter(Boolean).join(" AND ");
    let finalQuery = andOrParts;

    if (notClause) {
      // If we already have `andOrParts`, add a space before the NOT part
      finalQuery += (finalQuery ? " " : "") + notClause;
    }

    return finalQuery.trim();
  };

  const parseQueryString = (queryString) => {
    const pandWords = [];
    const porWords = [];
    const pnotWords = [];

    // Quick guard for empty or undefined strings
    if (!queryString) {
      return { pandWords, porWords, pnotWords };
    }

    // First, let's trim the entire query and normalize spacing a bit
    let normalized = queryString.trim();

    // ----------------------------
    // 1) Extract NOT words first
    //    We look for " NOT someWord" or "NOT someWord"
    //    and remove them from the main string
    // ----------------------------
    // This regex will match "NOT <something>" capturing <something> in group 1
    // We'll repeatedly apply it to remove all NOT words from the string.
    const notRegex = /NOT\s+(\S+)/gi;
    let match;
    while ((match = notRegex.exec(normalized)) !== null) {
      const word = match[1].replace(/[()]/g, ""); // remove parentheses if accidentally captured
      pnotWords.push(word.trim());
    }
    // Remove all " NOT word" occurrences from normalized
    normalized = normalized.replace(notRegex, "").trim();

    // ----------------------------
    // 2) Split the remaining string by AND
    //    Each chunk is either:
    //      - a single pand word (e.g. "word1")
    //      - a parenthetical group with OR (e.g. "(word3 OR word4)")
    // ----------------------------
    const andChunks = normalized
      .split(/\s+AND\s+/i)
      .map((c) => c.trim())
      .filter(Boolean);

    andChunks.forEach((chunk) => {
      chunk = chunk.trim();

      const startsWithParen = chunk.startsWith("(");
      const endsWithParen = chunk.endsWith(")");

      if (startsWithParen && endsWithParen) {
        chunk = chunk.slice(1, -1).trim(); // remove the outer (...)
      }

      // If it starts with "(" and ends with ")", treat it as an OR group
      if (/\s+OR\s+/i.test(chunk)) {
        // Split on OR
        const ors = chunk.split(/\s+OR\s+/i).map((w) => w.trim());
        porWords.push(...ors);
      } else {
        // If there's no OR, treat it as a single "AND" word
        // Remove stray parentheses just in case
        chunk = chunk.replace(/[()]/g, "").trim();
        if (chunk) {
          pandWords.push(chunk);
        }
      }
    });

    return {
      pandWords,
      porWords,
      pnotWords,
    };
  };

  useEffect(() => {
    const { pandWords, porWords, pnotWords } = parseQueryString(query || "");

    setAndWords(pandWords);
    setOrWords(porWords);
    setNotWords(pnotWords);
    setNewQuery(query);
  }, [query]);

  useEffect(() => {
    const { pandWords, porWords, pnotWords } = parseQueryString(
      inputQuery || "",
    );
    setAndWords(pandWords);
    setOrWords(porWords);
    setNotWords(pnotWords);
    setNewQuery(inputQuery);
  }, [inputQuery]);

  const helpArray = [
    "شما می‌توانید از طریق ۳ فیلد زیر، کلمات مورد نظر خود را برای فیلتر دقیق‌تر ثبت کنید.",
    "اگر وجود کلمه ضروری است آن را در فیلد اول وارد نمایید (عملوند AND).",
    "اگر وجود کلمه در نتیجه دارای ارزش بوده ولی ضروری نیست، آن را در فیلد دوم وارد کنید (عملوند OR).",
    "در صورتی که کلمه مورد نظر نباید در نتایج ظاهر شود، آن را در فیلد سوم وارد کنید (عملوند NOT).",
    'همچنین در صورتی که نیاز به اصلاح کوئری داشتید و یا شما تمایل به ثبت کوئری به صورت مستقیم را دارید می‌توانید در بخش "کوئری ایجاد شده" با کلیک بر روی آیکون ویرایش این عمل را انجام دهید. لازم به ذکر است که برای استفاده از این بخش، وجود دانش کوئری‌نویسی ضروری است.',
  ];

  return (
    <Drawer setShowMore={setShowMore} helpArray={helpArray}>
      <div className={"container flex flex-col"}>
        <div className={"flex flex-container flex-col w-full mt-3"}>
          <h6 className="block w-full font-overline-large text-light-neutral-text-high">
            دقیقا شامل این کلمات باشد
          </h6>
          <TagInput
            id={"andWords"}
            name={"andWords"}
            inset={true}
            size={"lg"}
            validation={"none"}
            direction={"rtl"}
            placeholder={"کلمه مورد نظر را بنویسید"}
            caption={"بعد از نوشتن هر کلمه از Enter استفاده کنید"}
            className={"flex-1 mt-1"}
            initialTags={andWords}
            onChange={(e) => {
              setAndWords(e);
              setNewQuery(generateQueryString(e, orWords, notWords));
            }}
          />
        </div>
        <Divider className={"mt-3"} />
        <div className={"flex flex-container flex-col w-full mt-6"}>
          <h6 className="block w-full font-overline-large text-light-neutral-text-high">
            می‌تواند حداقل یکی از این کلمات را داشته باشد
          </h6>
          <TagInput
            id={"orWords"}
            name={"orWords"}
            inset={true}
            size={"lg"}
            validation={"none"}
            direction={"rtl"}
            placeholder={"کلمه مورد نظر را بنویسید"}
            caption={"بعد از نوشتن هر کلمه از Enter استفاده کنید"}
            className={"flex-1 mt-1"}
            initialTags={orWords}
            onChange={(e) => {
              setOrWords(e);
              setNewQuery(generateQueryString(andWords, e, notWords));
            }}
          />
        </div>
        <Divider className={"mt-3"} />
        <div className={"flex flex-container flex-col w-full mt-6"}>
          <h6 className="block w-full font-overline-large text-light-neutral-text-high">
            هیچ کدام از این کلمات نباشد
          </h6>
          <TagInput
            id={"notWords"}
            name={"notWords"}
            inset={true}
            size={"lg"}
            validation={"none"}
            direction={"rtl"}
            placeholder={"کلمه مورد نظر را بنویسید"}
            caption={"بعد از نوشتن هر کلمه از Enter استفاده کنید"}
            className={"flex-1 mt-1"}
            initialTags={notWords}
            onChange={(e) => {
              setNotWords(e);
              setNewQuery(generateQueryString(andWords, orWords, e));
            }}
          />
        </div>
        <Divider className={"mt-3"} />
        <div className="flex flex-container flex-col w-full mt-6 rounded bg-light-primary-background-highlight p-4">
          <h6 className="block w-full font-overline-large text-light-neutral-text-high">
            کوئری ایجاد شده
          </h6>
          <CInput
            id={"q2"}
            name={"q2"}
            inset={true}
            readOnly={true}
            size={"md"}
            validation={"none"}
            direction={"rtl"}
            className={"flex-1 mt-2"}
            value={newQuery}
            onChange={(e) => {
              setNewQuery(e.target.value);
            }}
            customAction={() => {}}
            customActionText={<PencilSimpleLine size={20} />}
          ></CInput>
          <CButton
            type={"submit"}
            size={"lg"}
            // disabled={isSubmitting}
            readOnly={!validateQ(newQuery)}
            className={"[direction:rtl] w-full"}
            onClick={() => {
              !inputQuery && setQuery(newQuery);
              setShowMore(false);
              onSubmit(newQuery);
            }}
          >
            تایید
          </CButton>
        </div>
      </div>
    </Drawer>
  );
};

CustomSearchDrawer.propTypes = {
  inputQuery: PropTypes.string,
  onSubmit: PropTypes.func,
  setShowMore: PropTypes.func,
};

export default CustomSearchDrawer;
