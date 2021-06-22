//React packages
import React, { useState, useEffect } from "react";
import './App.css';
//Material UI component
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from "@material-ui/core";

export default function App() {
  const [users, setUsers] = useState([]);
  //Fatch record from API
  const fatchItem = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    setUsers(json.data);
  };
  useEffect(() => {
    fatchItem();
  }, []);

  const [pageNumber, setPageNumber] = useState(0)
  //user per page 
  const usePerPage = 1
  const pagesVisited = pageNumber * usePerPage
  const displayUsers = users.slice(pagesVisited, pagesVisited + usePerPage)
    .map((user) => {
      return (
        <div key={user.id} className="user">
          <p>
            <strong>{user.first_name}</strong>
          </p>
          <p>{user.email}</p>
          <img key={user.avatar} src={user.avatar} />
        </div>
      );
    })

  const pageCount = Math.ceil(users.length-1 / usePerPage);
  const onPageChange = (event, value) => {      //value is what u want select
    setPageNumber(value);
  };

  return (
    <div className="App">
      {displayUsers}
      <Typography>Page: {pageNumber}</Typography>
      <Pagination count={pageCount} page={pageNumber} onChange={onPageChange} color="primary"/>

    </div>
  );
}
