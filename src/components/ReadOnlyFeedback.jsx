import React, { useEffect } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, CircularProgress, Alert } from '@mui/material';
import { fetchFeedbacks } from './feedbackSlice';

const ReadOnlyFeedback = () => {
  const dispatch = useDispatch();
  const feedbacks = useSelector(state => state.feedback.items);
  const status = useSelector(state => state.feedback.status);
  const error = useSelector(state => state.feedback.error);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const columns = [
    { 
      header: 'Rating',
      accessorKey: 'rating',
      cell: info => `${info.getValue()}/5`
    },
    { 
      header: 'Message',
      accessorKey: 'message',
      cell: info => info.getValue() || 'No message'
    },
    { 
      header: 'Date',
      accessorKey: 'createdAt',
      cell: info => new Date(info.getValue()).toLocaleDateString()
    }
  ];

  const table = useReactTable({
    data: feedbacks || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: 'createdAt',
          desc: true
        }
      ]
    }
  });

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Error loading feedback: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto', margin: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell 
                  key={header.id}
                  sx={{ fontWeight: 'bold' }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <TableSortLabel
                    active={!!header.column.getIsSorted()}
                    direction={header.column.getIsSorted() || 'asc'}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(!feedbacks || feedbacks.length === 0) && (
        <Box sx={{ textAlign: 'center', p: 2 }}>
          No feedback available
        </Box>
      )}
    </Box>
  );
};

export default ReadOnlyFeedback;