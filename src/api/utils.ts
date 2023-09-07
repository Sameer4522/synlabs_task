import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const successToast = (message: string) => {
  toast.success(message ? message : "Success", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const errorToast = (err: string) => {
  toast.error(err ? err : "Something Went Wrong!", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const infoToast = (info: string) => {
  toast.info(info ? info : "Something Went Wrong!", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const removeChar = (value: string) => {
  const result = value.replace(/\D/g, "");

  return result;
};

export const handleExportToExcel = () => {
  const table = document.getElementById("userTable");

  if (!table) {
    console.error("Table not found.");
    return;
  }

  const clonedTable = table.cloneNode(true);

  const lastColumnHeader = (clonedTable as HTMLElement).querySelector(
    "thead tr th:last-child"
  );
  if (lastColumnHeader) {
    lastColumnHeader.remove();
  }

  const lastColumnData = (clonedTable as HTMLElement).querySelectorAll(
    "tbody tr td:last-child"
  );
  lastColumnData.forEach((cell) => cell.remove());

  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.table_to_sheet(clonedTable);

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });

  saveAs(blob, "usersList.xlsx");
};
