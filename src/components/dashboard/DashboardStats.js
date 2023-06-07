import React from "react";
import { LibraryAdd, Paid, LibraryBooks } from "@mui/icons-material";
import { useTotalStatsQuery } from "../../states/apiSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Card, Typography } from "@mui/material";
import { Bars } from "react-loader-spinner";

const DashboardStats = () => {
  const { data, isSuccess, isLoading } = useTotalStatsQuery();
  let statistics;
  if (isSuccess) {
    const { data: totals } = data;
    statistics = totals;
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: "2rem",
        mt: "2rem",
        justifyContent: "end",
      }}
    >
      <Card
        sx={{
          width: 200,
          height: 150,
          backgroundColor: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "70%",
            backgroundColor: "#116D6E",
            width: 35,
            height: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paid fontSize="medium" />
        </div>
        <Typography variant="h3">
          {isLoading ? (
            <Bars
              height="30"
              width="30"
              color="#FFE3A3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            `${statistics.revenue} Rwf`
          )}
        </Typography>
        <Typography variant="h4">Total Revenue</Typography>
      </Card>
      <Card
        sx={{
          width: 200,
          height: 150,
          backgroundColor: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "70%",
            backgroundColor: "#643843",
            width: 35,
            height: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LibraryBooks fontSize="medium" />
        </div>
        <Typography variant="h3">
          {isLoading ? (
            <Bars
              height="30"
              width="30"
              color="#FFE3A3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            statistics.books
          )}
        </Typography>
        <Typography variant="h4">Total Books</Typography>
      </Card>
      <Card
        sx={{
          width: 200,
          height: 150,
          backgroundColor: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "70%",
            backgroundColor: "#E57C23",
            width: 35,
            height: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CancelIcon fontSize="medium" />
        </div>
        <Typography variant="h3">
          {isLoading ? (
            <Bars
              height="30"
              width="30"
              color="#FFE3A3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            statistics.lostBooks
          )}
        </Typography>
        <Typography variant="h4">Lost Books</Typography>
      </Card>
      <Card
        sx={{
          width: 200,
          height: 150,
          backgroundColor: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "70%",
            backgroundColor: "#9A208C",
            width: 35,
            height: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LibraryAdd fontSize="medium" />
        </div>
        <Typography variant="h3">
          {isLoading ? (
            <Bars
              height="30"
              width="30"
              color="#FFE3A3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            statistics.issuedBooks
          )}
        </Typography>
        <Typography variant="h4">Issued Books</Typography>
      </Card>
    </Box>
  );
};

export default DashboardStats;
