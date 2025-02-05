import { useEffect } from "react";
import userService from "service/api/userService.js";
import { FilePdf } from "@phosphor-icons/react";
import { CButton } from "components/ui/CButton.jsx";

const DownloadFileButton = ({ fileUrl, text, ...props }) => {
  const downloadFile = async () => {
    try {
      const response = await userService.getFile(fileUrl);

      // Create a URL from the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from the response headers, if available
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded_file";
      if (
        contentDisposition &&
        contentDisposition.indexOf("attachment") !== -1
      ) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }

      // Set filename and initiate the download
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup the link element
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return <CButton onClick={downloadFile}>{text}</CButton>;
};

export default DownloadFileButton;
