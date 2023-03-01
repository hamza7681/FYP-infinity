import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaTrash } from "react-icons/fa";
import { http } from "../../axios/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { BsCheckLg } from "react-icons/bs";

const columns = [
  { id: "sr", label: "Sr No.", minWidth: 80 },
  { id: "category", label: "Notification", minWidth: 270 },
  { id: "created_by", label: "Created By", minWidth: 270 },
  { id: "created_at", label: "Created At", minWidth: 270 },
  { id: "edit", label: "Mark Read", minWidth: 50 },
  { id: "delete", label: "Delete", minWidth: 50 },
];

const Category = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const { token } = useSelector((s) => s.AuthReducer);
  const [editId, setEditId] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [defaultData, setDefault] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchCategories = async () => {
        const res = await http.get("/notification/get-notification");
        setRows(res.data);
        setDefault(res.data);
        setFetchAgain(false);
      };
      fetchCategories();
    }
  }, [token, fetchAgain]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteNotification = async () => {
    try {
      const res = await http.delete(
        `/notification/delete-notification/${editId}`,
        {
          headers: { Authorization: token },
        }
      );
      toast.success(res.data.msg);
      setFetchAgain(true);
      handleClose2();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setRows(defaultData);
    } else {
      const filterArray = rows.filter((val) => {
        return (
          val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.action_by.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          val.action_by.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
      setRows(filterArray);
    }
  };

  const filterByActive = (e) => {
    const searchTerm = e.target.checked;
    if (searchTerm) {
      const filterArray = rows.filter((val) => {
        return val.status === true;
      });
      setRows(filterArray);
    } else {
      setRows(defaultData);
    }
  };

  const FormatDate = ({ timestamp }) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const day = ("0" + date.getDate()).slice(-2);
    return `${day} ${month} ${year}`;
  };

  const markedRead = async (val) => {
    try {
      const res = await http.patch("/notification/update-status/" + val._id);
      toast.success(res.data.msg);
      setFetchAgain(true);
    } catch (error) {
      console.log(error);
    }
  };

  const markedAll = async () => {
    try {
      const res = await http.patch("/notification/marked-all-read");
      toast.success(res.data.msg);
      setFetchAgain(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-[50px] h-screen">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">Notifications</h1>
      </div>
      <DeleteModal
        open={open2}
        handleClose={handleClose2}
        heading="Do you want to delete this category?"
        btn1="Cancel"
        deleteClick={deleteNotification}
        btn2="Delete"
      />
      <div className="py-[20px]">
        <div className=" w-full flex flex-row justify-between py-[17px] px-[10px] items-center border-b-0 bg-[#2f3859]">
          <input
            type="text"
            placeholder="Search here"
            className="w-[50%] focus:outline-none py-[9px] px-[10px] bg-[#5c6894] rounded-[3px] text-white"
            onChange={handleSearch}
          />
          <button
            onClick={markedAll}
            className="bg-green-500 text-white py-[10px] px-[15px] rounded-[5px]"
          >
            Marked all as read
          </button>
        </div>
        <div className=" w-full px-[10px] flex items-center border-b-0 bg-[#2f3859]">
          <input type="checkbox" id="active" onChange={filterByActive} />
          <label className="text-orange-400 ml-2" htmlFor="active">
            Show unread notifications
          </label>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {rows.length === 0 ? (
            <p className="bg-[#2f3859] pl-[10px] text-white">
              No Notifications found!
            </p>
          ) : (
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          width: column.minWidth,
                          fontWeight: "bold",
                          background: "#2f3859",
                          color: "white",
                          paddingBottom: "20px",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                            style={{ backgroundColor: "#5c6894" }}
                          >
                            <TableCell
                              style={{ fontWeight: "bold", color: "white" }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              {row.title}
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              {row.action_by.firstName} {row.action_by.lastName}
                            </TableCell>
                            <TableCell style={{ color: "white" }}>
                              <FormatDate timestamp={row.createdAt} />
                            </TableCell>
                            <TableCell>
                              <button
                                className={`bg-green-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer ${
                                  row.status ? "" : "opacity-40"
                                }`}
                                onClick={() => {
                                  markedRead(row);
                                }}
                                disabled={row.status ? false : true}
                              >
                                <BsCheckLg className="text-white text-[18px]" />
                              </button>
                            </TableCell>
                            <TableCell>
                              <div
                                className="bg-red-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer"
                                onClick={() => {
                                  handleOpen2();
                                  setEditId(row._id);
                                }}
                              >
                                <FaTrash className="text-white text-[18px]" />
                              </div>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ backgroundColor: "#2f3859", color: "white" }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Category;
