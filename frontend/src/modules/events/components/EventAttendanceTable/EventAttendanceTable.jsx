import React, { useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const PER_PAGE = 50;

export const EventAttendanceTable = ({ attendees, loading }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PER_PAGE,
  });

  const columnsDefs = useMemo(
    () => [
      {
        id: 1,
        flex: 0.25,
        minWidth: 280,
        field: "name",
        headerName: "name",
        renderCell: ({ row: attendee }) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 500,
                    textDecoration: "none",
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {attendee.name}
                </Typography>
              </Box>
            </Box>
          );
        },
      },

      {
        id: 2,
        flex: 0.15,
        minWidth: 120,
        headerName: "email",
        field: `email`,
        renderCell: ({ row: attendee }) => {
          return attendee.email || "";
        },
      },

      {
        id: 3,
        flex: 0.15,
        minWidth: 120,
        headerName: "phone number",
        field: `status`,
        renderCell: ({ row: attendee }) => {
          return attendee.phone || "-";
        },
      },
    ],
    []
  );

  return (
    <DataGrid
      autoHeight
      rowHeight={62}
      rows={attendees}
      columns={columnsDefs}
      disableRowSelectionOnClick
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      loading={loading}
      rowCount={attendees?.length || 0}
      paginationMode="server"
    />
  );
};
