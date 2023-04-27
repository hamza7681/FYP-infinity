import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye, FaTrash } from "react-icons/fa";
import { http } from "../../axios/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "sr", label: "Sr No.", minWidth: 50 },
  { id: "send_by", label: "Send By", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "received_at", label: "Received At", minWidth: 200 },
  { id: "view", label: "View", minWidth: 50 },
  { id: "delete", label: "Delete", minWidth: 50 },
];

const Contacts = () => {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const getContacts = async () => {
        const res = await http.get("/contact/get-contacts");
        setRows(res.data);
        setDefault(res.data);
        setFetchAgain(false);
      };
      getContacts();
    }
  }, [token, fetchAgain]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCategory = async () => {
    try {
      const res = await http.delete(`/contact/delete-contact/${editId}`, {
        headers: { Authorization: token },
      });
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
          val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setRows(filterArray);
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

  return (
    <div className="pt-[50px] h-screen">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">Contacts</h1>
      </div>
      <DeleteModal
        open={open2}
        handleClose={handleClose2}
        heading="Do you want to delete this Contact?"
        btn1="Cancel"
        deleteClick={deleteCategory}
        btn2="Delete"
      />
      <div className="py-[20px]">
        <div className=" w-full py-[17px] px-[10px] items-center border-b-0 bg-[#2f3859]">
          <input
            type="text"
            placeholder="Search here"
            className="w-[50%] focus:outline-none py-[9px] px-[10px] bg-[#5c6894] rounded-[3px] text-white"
            onChange={handleSearch}
          />
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {rows.length === 0 ? (
            <p className="bg-[#2f3859] pl-[10px] text-white">
              No Contacts found!
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
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          style={{ backgroundColor: "#5c6894" }}
                        >
                          <TableCell
                            style={{ fontWeight: "bold", color: "white" }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            {row.name}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            {row.email}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            <FormatDate timestamp={row.createdAt} />
                          </TableCell>
                          <TableCell>
                            <div className="bg-green-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer">
                              <FaEye
                                className="text-white text-[18px]"
                                onClick={() =>
                                  navigate("/contact/" + row._id)
                                }
                              />
                            </div>
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

export default Contacts;
