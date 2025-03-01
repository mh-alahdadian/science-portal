import { parseTimeToPersian } from "../utils/helper";
import TextSlicer from "./TextSlicer";
import MediaBadge from "./ui/MediaBadge";
import DropdownWithAddOption from "./DropdownWithAddOption";
import { useLocation } from "react-use";
const NotesPopUp = ({
  noteValue,
  setNoteValue,
  noteData,
  setNewCollectionTitle,
  activeCollection,
  loadNotes,
}) => {
  const changeHandler = (e) => {
    setNoteValue(e.target.value);
  };
  const { pathname } = useLocation();
  let are_we_in_notes_page = pathname === "/app/notes" ? true : false;

  return (
    <>
      <p className="leading-5 font-overline-large">
        لطفا ابتدا نام پوشه مورد نظر را انتخاب کرده و سپس متن یادداشت خود را وارد کنید.
      </p>
      <div className="mt-8">
        {are_we_in_notes_page && (
          <div className="bg-light-neutral-background-low border-[1px] border-light-neutral-border-low-rest p-3 rounded-lg mb-7">
            <div className="flex items-center pb-2">
              <img
                src={`https://f002.backblazeb2.com/file/all-gather-media/${noteData?.content?.avatar}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <span
                className={
                  "absolute top-6 right-0 rounded-full overflow-hidden !w-[20px] !h-[20px]"
                }
              >
                <MediaBadge
                  media={"twitter"}
                  className={"!h-[20px] !w-[20px]"}
                />
              </span>
              <div className="pr-2">
                <p className="font-subtitle-small">
                  {noteData?.content?.title}
                </p>
                <p className="font-overline-small text-light-neutral-text-medium">
                  {noteData?.content?.username}@
                </p>
              </div>
            </div>

            <TextSlicer length={80}>
              {noteData?.content?.description}
            </TextSlicer>
          </div>
        )}
        <DropdownWithAddOption
          loadNotes={loadNotes}
          activeCollection={activeCollection}
          setNewCollectionTitle={setNewCollectionTitle}
          collection_type="note"
        />

        <div className="flex items-center justify-between text-[14px] font-overline-large">
          <label className="block text-sm font-subtitle-medium text-light-neutral-text-high mb-2 ">
            متن یادداشت
          </label>
          {/* {!are_we_in_notes_page && (
            <Link
              to={`/app/notes`}
              className="text-light-primary-background-rest cursor-pointer"
            >
              همه یادداشت‌ها
            </Link>
          )} */}
          {are_we_in_notes_page && (
            <p className="font-overline-medium text-light-neutral-text-medium">
              {parseTimeToPersian(noteData?.note?.updated_at)}
            </p>
          )}
        </div>
        <textarea
          className="border border-light-neutral-border-medium-rest rounded-md w-full p-2 mt-1 p-y-[13px] font-body-large"
          rows="4"
          value={noteValue}
          onChange={changeHandler}
        ></textarea>
      </div>
    </>
  );
};
export default NotesPopUp;
