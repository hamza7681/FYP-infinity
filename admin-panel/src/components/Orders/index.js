import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye } from "react-icons/fa";
import { http } from "../../axios/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import master from "../../Assets/master.png";
import visa from "../../Assets/visa.png";

const columns = [
  { id: "order_id", label: "Order No.", minWidth: 50 },
  { id: "ordered_by", label: "Order By", minWidth: 150 },
  { id: "courses", label: "Ordered Courses", minWidth: 200 },
  { id: "payment", label: "Payment Card", minWidth: 200 },
  { id: "view", label: "View", minWidth: 50 },
];

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { token } = useSelector((s) => s.AuthReducer);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [defaultData, setDefault] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchCategories = async () => {
        const res = await http.get("/order/get-order", {
          headers: { Authorization: token },
        });
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      setRows(defaultData);
    } else {
      const filterArray = rows.filter((val) => {
        return (
          val.ordered_by.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          val.ordered_by.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
      setRows(filterArray);
    }
  };

  return (
    <div className="pt-[50px] h-screen">
      <div className="bg-[#39405a] py-[10px] flex justify-between items-center rounded-[7px] px-[30px]">
        <h1 className="text-white text-[26px]">Orders</h1>
      </div>

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
              No Orders found!
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
                            {row._id}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            {row.ordered_by.firstName} {row.ordered_by.lastName}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            {row.product.length}
                          </TableCell>
                          <TableCell style={{ color: "white" }}>
                            {row.card === "master" ? (
                              <img
                                src={master}
                                alt="master"
                                className="w-[70px]"
                              />
                            ) : (
                              <img src={visa} alt="visa" className="w-[70px]" />
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="bg-green-500 w-fit flex justify-center items-center p-[7px] rounded-[3px] cursor-pointer">
                              <FaEye
                                className="text-white text-[18px]"
                                onClick={() => navigate("/orders/" + row._id)}
                              />
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

export default Orders;
