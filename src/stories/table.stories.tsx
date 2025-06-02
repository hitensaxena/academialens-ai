import type { Meta, StoryObj } from '@storybook/react';
import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date: string;
};

const data: Payment[] = [
  {
    id: '1',
    amount: 316,
    status: 'success',
    email: 'ken99@example.com',
    date: '2023-05-01',
  },
  {
    id: '2',
    amount: 242,
    status: 'processing',
    email: 'alice@example.com',
    date: '2023-05-02',
  },
  {
    id: '3',
    amount: 837,
    status: 'success',
    email: 'bob@example.com',
    date: '2023-05-03',
  },
  {
    id: '4',
    amount: 874,
    status: 'pending',
    email: 'charlie@example.com',
    date: '2023-05-04',
  },
  {
    id: '5',
    amount: 721,
    status: 'failed',
    email: 'dave@example.com',
    date: '2023-05-05',
  },
];

export const Basic: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">INV-{payment.id}</TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {payment.status}
              </span>
            </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">${payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,990.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithSorting: Story = {
  render: () => {
    const [sorting, setSorting] = useState<{ key: keyof Payment; direction: 'asc' | 'desc' }>({
      key: 'date',
      direction: 'asc',
    });

    const sortedData = useMemo(() => {
      return [...data].sort((a, b) => {
        const aValue = a[sorting.key];
        const bValue = b[sorting.key];

        if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }, [sorting]);

    const handleSort = (key: keyof Payment) => {
      setSorting((prev) => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
      }));
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center cursor-pointer" onClick={() => handleSort('id')}>
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer" onClick={() => handleSort('email')}>
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div
                className="flex items-center justify-end cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>INV-{payment.id}</TableCell>
              <TableCell>{payment.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === 'success'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {payment.status}
                </span>
              </TableCell>
              <TableCell className="text-right">${payment.amount}</TableCell>
              <TableCell className="text-right">{payment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const WithRowSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
      const newSelection = new Set(selectedRows);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedRows(newSelection);
    };

    const toggleAllRows = () => {
      if (selectedRows.size === data.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(data.map((item) => item.id)));
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Payments</h3>
          <div className="space-x-2">
            <Button variant="outline" size="sm" disabled={selectedRows.size === 0}>
              Export ({selectedRows.size})
            </Button>
            <Button variant="outline" size="sm" disabled={selectedRows.size === 0}>
              Delete ({selectedRows.size})
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size === data.length && data.length > 0}
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((payment) => (
              <TableRow
                key={payment.id}
                className={selectedRows.has(payment.id) ? 'bg-muted/50' : ''}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(payment.id)}
                    onCheckedChange={() => toggleRow(payment.id)}
                    aria-label={`Select row ${payment.id}`}
                  />
                </TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">${payment.amount}</TableCell>
                <TableCell className="text-right">{payment.date}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const totalItems = 25; // In a real app, this would come from an API
    const totalPages = Math.ceil(totalItems / pageSize);

    // Generate mock data for pagination
    const paginatedData = Array.from({ length: pageSize }, (_, i) => {
      const id = (currentPage - 1) * pageSize + i + 1;
      return {
        id: id.toString(),
        email: `user${id}@example.com`,
        status: ['pending', 'processing', 'success', 'failed'][Math.floor(Math.random() * 4)],
        amount: Math.floor(Math.random() * 1000) + 100,
        date: new Date(2023, 4, id).toISOString().split('T')[0],
      };
    });

    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id.padStart(3, '0')}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">${item.amount}</TableCell>
                <TableCell className="text-right">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </div>

          <div className="flex items-center space-x-2">
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing page size
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show first page, last page, current page, and pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  // Near the start
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  // Near the end
                  pageNum = totalPages - 4 + i;
                } else {
                  // In the middle
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={pageNum === currentPage ? 'font-bold' : ''}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
