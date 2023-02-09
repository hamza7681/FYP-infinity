import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { http } from "../../axios/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const columns = [
  { id: "name", label: "Sr No.", minWidth: 30 },
  { id: "category", label: "Category", minWidth: 270 },
  { id: "edit", label: "Edit", minWidth: 50 },
  { id: "delete", label: "Delete", minWidth: 50 },
];

const Category = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const { token } = useSelector((s) => s.AuthReducer);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchCategories = async () => {
        const res = await http.get("/category/get-category", {
          headers: { Authorization: token },
        });
        setRows(res.data);
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

  const add = async () => {
    try {
      const res = await http.post(
        "/category/add-category",
        { name },
        { headers: { Authorization: token } }
      );
      toast.success(res.data.msg);
      setRows((prev) => [...prev, res.data.category]);
      setName("");
      handleClose();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const edit = async () => {
    try {
      const res = await http.patch(
        `/category/update-category/${editId}`,
        { name },
        { headers: { Authorization: token } }
      );
      toast.success(res.data.msg);
      setName("");
      setFetchAgain(true);
      handleClose1();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const deleteCategory = async () => {
    try {
      const res = await http.delete(`/category/delete-category/${editId}`, {
        headers: { Authorization: token },
      });
      toast.success(res.data.msg);
      setFetchAgain(true);
      handleClose2();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="pt-[50px] h-screen">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">Categories</h1>
        <button
          className="text-white flex flex-row gap-2 items-center bg-blue-500 px-[10px] py-[7px] rounded-[4px] text-[14px]"
          onClick={() => {
            handleOpen();
          }}
        >
          <AiOutlinePlus className="text-[22px]" /> Add Category
        </button>
      </div>
      <AddModal
        open={open}
        handleClose={handleClose}
        heading="Add Category"
        btn1="Add"
        name={name}
        setName={setName}
        click={add}
      />
      <EditModal
        open={open1}
        handleClose={handleClose1}
        heading="Edit Category"
        btn1="Save"
        name={name}
        setName={setName}
        clickEdit={edit}
        btn2="Cancel"
      />
      <DeleteModal
        open={open2}
        handleClose={handleClose2}
        heading="Do you want to delete this category?"
        btn1="Cancel"
        deleteClick={deleteCategory}
        btn2="Delete"
      />
      <div className="py-[20px]">
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "7px" }}>
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
                        paddingTop: "20px",
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
                        key={index}
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
                        <TableCell>
                          <div
                            className="bg-green-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer"
                            onClick={() => {
                              handleOpen1();
                              setName(row.name);
                              setEditId(row._id);
                            }}
                          >
                            <AiTwotoneEdit className="text-white text-[18px]" />
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
