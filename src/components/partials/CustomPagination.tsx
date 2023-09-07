import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import NoSsr from "@material-ui/core/NoSsr";

interface Props {
  currentPage: number;
  totalData: number;
  onPageChange: (page: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaginationItem-root": {
      backgroundColor: "#fff",
      fontWeight: "600",
      fontSize: "15px",
      borderRadius: "4px",
      margin: "0 6px",
      boxShadow: "2px 3px 0px 0px rgba(0,0,0,0.05)",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#289ae7",
      fontWeight: "bold",
      borderRadius: "4px",
    },
    "& .MuiPaginationItem-root.MuiPaginationItem-ellipsis": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    "& .MuiPagination-ul": {
      "& > li:first-child button": {
        backgroundColor: "transparent",
        boxShadow: "none",
        marginRight: "15px",
      },
      "& > li:last-child button": {
        backgroundColor: "transparent",
        boxShadow: "none",
        marginLeft: "15px",
      },
    },
    "& .MuiSvgIcon-root.MuiPaginationItem-icon": {
      fontSize: "25px",
    },
  },
}));

const pageSize = 10;

const CustomPagination: React.FC<Props> = ({
  currentPage,
  totalData,
  onPageChange,
}) => {
  const classes = useStyles();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  return (
    <NoSsr>
      <div className={classes.root}>
        <Pagination
          count={Math.ceil(totalData / pageSize)}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </NoSsr>
  );
};

export default CustomPagination;
