import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { DAILY_RESULT_API_URL } from "../../Constants";
import Title from "./components/Title";

export default function DailyResult() {
  const [dailyResult, setResult] = useState([]);

  if (dailyResult.length === 0) {
    axios.get(DAILY_RESULT_API_URL).then((response) => {
      setResult(response.data);
    });
  }

  return (
    <>
      <Title>View Daily Results</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Tests Processed</TableCell>
            <TableCell>Positive Count</TableCell>
            <TableCell>Positive Percent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyResult.map((row) => (
            <TableRow key={row.process_date}>
              <TableCell>{row.process_date}</TableCell>
              <TableCell>{row.num_tests}</TableCell>
              <TableCell>{row.pos_tests}</TableCell>
              <TableCell>{row.pos_percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
