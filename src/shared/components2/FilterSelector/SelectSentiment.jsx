import { SENTIMENTS } from "constants/sentiments.js";
import { EmotionButton } from "components/EmotionButton/index.jsx";

const SelectSentiment = ({ handleChange, initialValue }) => {
  const sentiment = initialValue || [];

  const handleSelect = (selectedItem) => {
    const newItems = sentiment.includes(selectedItem)
      ? sentiment.filter((item) => item !== selectedItem)
      : [...sentiment, selectedItem];

    handleChange(newItems);
  };

  return (
    <div className="flex justify-around font-body-medium *:flex *:flex-col *:items-center *:justify-center *:size-20 *:rounded-lg *:transition-all *:duration-300 *:cursor-pointer">
      {SENTIMENTS.map((emotion) => (
        <EmotionButton
          key={emotion.value}
          icon={emotion.icon}
          id={emotion.value}
          title={emotion.label}
          onClick={handleSelect}
          isActive={sentiment?.includes(emotion.value)}
          className={`${emotion.className}`}
        />
      ))}
    </div>
  );
};

export default SelectSentiment;
