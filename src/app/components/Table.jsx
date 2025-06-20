import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box } from '@mui/material';

const Table = ({
  rows,
  columns,
  loading = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  getRowId,
  onRowClick,
  onSelectionModelChange,
  ...props
}) => {
  return (
    <Paper elevation={1}>
      <Box sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize },
            },
          }}
          pageSizeOptions={pageSizeOptions}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          getRowId={getRowId}
          onRowClick={onRowClick}
          onRowSelectionModelChange={onSelectionModelChange}
          autoHeight
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(255, 64, 64, 0.04)',
            },
          }}
          {...props}
        />
      </Box>
    </Paper>
  );
};

export default Table;