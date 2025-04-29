import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel
} from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TablePagination,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  useGetUsersQuery,
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation
} from './api';

const DraggableColumnHeader = ({ header }) => {
  const [, dragRef] = useDrag({
    type: 'COLUMN',
    item: { id: header.id }
  });

  const [, dropRef] = useDrop({
    accept: 'COLUMN',
    drop: (item) => {
      if (item.id !== header.id) {
        header.column.getParentHeader().columnOrder.moveColumn(item.id, header.id);
      }
    }
  });

  return (
    <TableCell
      ref={(node) => dragRef(dropRef(node))}
      key={header.id}
      sx={{
        width: header.getSize(),
        fontWeight: 'bold',
        backgroundColor: 'background.default',
        cursor: 'move'
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
    </TableCell>
  );
};

const AdminPanel = () => {
  // Запросы данных через RTK Query
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    isFetching: isUsersFetching
  } = useGetUsersQuery();

  const {
    data: feedbacks = [],
    isLoading: isFeedbacksLoading,
    isError: isFeedbacksError
  } = useGetFeedbacksQuery();

  // Мутации
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  // Определение колонок для пользователей
  const userColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
      size: 100
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: info => info.getValue(),
      size: 200
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: info => info.getValue(),
      size: 120
    },
    {
      header: 'Status',
      accessorKey: 'isBlocked',
      cell: info => info.getValue() ? 'Blocked' : 'Active',
      size: 120
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={async () => {
              if (window.confirm(`Вы уверены, что хотите удалить пользователя ${row.original.email}?`)) {
                await deleteUser(row.original.id);
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={async () => {
              const action = row.original.isBlocked ? 'разблокировать' : 'заблокировать';
              if (window.confirm(`Вы уверены, что хотите ${action} пользователя ${row.original.email}?`)) {
                await blockUser({ id: row.original.id, isBlocked: !row.original.isBlocked });
              }
            }}
          >
            {row.original.isBlocked ? 'Unblock' : 'Block'}
          </Button>
        </Box>
      ),
      size: 150
    }
  ];

  // Определение колонок для отзывов
  const feedbackColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
      size: 80
    },
    {
      header: 'User ID',
      accessorKey: 'userId',
      size: 100
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      cell: info => `${info.getValue()}/5`,
      size: 100
    },
    {
      header: 'Message',
      accessorKey: 'message',
      cell: info => info.getValue() || 'No message',
      size: 300
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: info => new Date(info.getValue()).toLocaleString(),
      size: 150
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={async () => await deleteFeedback(row.original.id)}
        >
          Delete
        </Button>
      ),
      size: 120
    }
  ];

  // Создание таблиц
  const userTable = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      }
    }
  });

  const feedbackTable = useReactTable({
    data: feedbacks,
    columns: feedbackColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5
      },
      sorting: [
        {
          id: 'createdAt',
          desc: true
        }
      ]
    }
  });

  // Обработка состояний загрузки и ошибок
  if (isUsersLoading || isFeedbacksLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isUsersError || isFeedbacksError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {isUsersError ? 'Ошибка загрузки пользователей' : 'Ошибка загрузки отзывов'}
        </Alert>
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ p: 3 }}>
        {/* Таблица пользователей */}
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          User Management {isUsersFetching && <CircularProgress size={20} sx={{ ml: 2 }} />}
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              {userTable.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <DraggableColumnHeader key={header.id} header={header} />
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {userTable.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={userTable.getState().pagination.pageSize}
            page={userTable.getState().pagination.pageIndex}
            onPageChange={(_, page) => userTable.setPageIndex(page)}
            onRowsPerPageChange={e => {
              userTable.setPageSize(Number(e.target.value));
            }}
          />
        </TableContainer>

        {/* Таблица отзывов */}
        <Typography variant="h5" gutterBottom>
          Feedback Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {feedbackTable.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      sx={{
                        width: header.getSize(),
                        fontWeight: 'bold',
                        backgroundColor: 'background.default'
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {feedbackTable.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={feedbacks.length}
            rowsPerPage={feedbackTable.getState().pagination.pageSize}
            page={feedbackTable.getState().pagination.pageIndex}
            onPageChange={(_, page) => feedbackTable.setPageIndex(page)}
            onRowsPerPageChange={e => {
              feedbackTable.setPageSize(Number(e.target.value));
            }}
          />
        </TableContainer>
      </Box>
    </DndProvider>
  );
};

export default AdminPanel;