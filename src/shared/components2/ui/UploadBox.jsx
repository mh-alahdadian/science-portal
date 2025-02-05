import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Image as Icon,
  TrashSimple,
  WarningDiamond,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Bulletin from "service/api/bulletin.js";
import { notification, shortener } from "utils/helper.js";
import PropTypes from "prop-types";
import IMAGES from "constants/images.js";

const UploadBox = ({
  initialPreview,
  title,
  description,
  description2,
  name,
  fullWidth,
  fileSizeLimitInMB = 1,
  shortnerLen = 14,
  onChange = () => {},
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialPreview);
  const [errorText, setErrorText] = useState("");
  const handleReset = () => {
    fileInputRef.current.value = null;
    setFileName("");
    setImagePreview(null);
    onChange(null);
  };

  const validateFileSize = (file) => {
    const fileSizeMB = file.size / 1024 / 1024; // Convert file size to MB
    if (fileSizeMB > fileSizeLimitInMB) {
      setErrorText(`حجم فایل باید کمتر از ${fileSizeLimitInMB}MB باشد`);
      return false;
    }
    setErrorText("");
    return true;
  };

  const uploadToServer = async (file) => {
    const formData = new FormData();

    formData.append("image", file);
    try {
      const response = await Bulletin.uploadFile(formData);
      if (response.data.code !== 200) {
        notification.error(
          "خطا در بارگذاری تصویر!",
          <WarningDiamond size={32} className="text-light-error-text-rest" />,
        );
      } else {
        notification.success(
          response.data.message,
          <CheckCircle size={20} className="text-light-success-text-rest" />,
        );
      }
      return response?.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      notification.error(
        "خطا در بارگذاری تصویر!",
        <WarningDiamond size={32} className="text-light-error-text-rest" />,
      );
    }
  };

  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (validateFileSize(file)) {
        setFileName(file.name);
        previewImage(file);
        const result = await uploadToServer(file);
        onChange(result);
      } else {
        handleReset();
      }
    } else {
      setFileName("");
      setImagePreview(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (
        (file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png") &&
        validateFileSize(file)
      ) {
        fileInputRef.current.files = files;
        setFileName(file.name);
        previewImage(file);
        const result = await uploadToServer(file);
        onChange(result);
      } else {
        handleReset();
      }
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    fileInputRef.current.value = null;
    if (errorText) {
      setFileName("");
    }
  }, [errorText]);

  const boxBorder = clsx("border-[1px] border-[#D1D6DB]", {
    "border-solid": fileName,
    "border-dashed": !fileName,
  });

  return (
    <div>
      <p className="font-overline-large pb-2">{title}</p>
      <div
        className={`flex items-center justify-center ${
          fullWidth ? "w-full" : "w-80"
        } h-[92px] ${isDragging ? "border-blue-500 bg-blue-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor={name}
          className={`flex flex-col items-center justify-center ${
            fullWidth ? "w-full" : "w-80"
          } h-[92px] rounded-lg cursor-pointer ${boxBorder}`}
        >
          {imagePreview ? (
            <>
              <img
                src={
                  imagePreview.toString().startsWith("/")
                    ? `${imagePreview}`
                    : IMAGES[
                        IMAGES.map((item) => item.key).indexOf(imagePreview)
                      ]?.file || imagePreview
                }
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
              <div></div>
            </>
          ) : description && !fileName ? (
            <div
              className={`flex flex-col items-center justify-center pt-5 pb-6 ${
                description2 ? "gap-2" : "gap-4"
              }`}
            >
              <Icon size={25} className="text-light-neutral-text-medium" />
              <p className="font-button-medium">{description}</p>
              {description2 && (
                <p className="font-button-small text-light-neutral-text-medium">
                  {description2}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-4">
              <Icon size={25} className="text-light-neutral-text-medium" />
            </div>
          )}
          <input
            name={name}
            id={name}
            type="file"
            accept=".jpeg,.jpg,.png"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
      </div>
      {fileName && (
        <div
          className={`flex items-center justify-between ${
            fullWidth ? "w-full" : "w-80"
          } mt-2`}
        >
          <p className="font-overline-medium">
            {shortener(fileName, shortnerLen)}
          </p>
          <div
            onClick={handleReset}
            className="bg-light-neutral-background-medium rounded-[6px] p-1 cursor-pointer"
          >
            <TrashSimple />
          </div>
        </div>
      )}
      <span className="text-light-error-text-rest font-body-medium">
        {errorText}
      </span>
    </div>
  );
};

UploadBox.propTypes = {
  initialPreview: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  description2: PropTypes.string,
  name: PropTypes.string,
  fileSizeLimitInMB: PropTypes.number,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
};

export default UploadBox;
