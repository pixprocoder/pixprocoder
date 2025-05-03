// app/(dashboard)/orders/page.tsx
'use client';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { cn } from '@/src/lib/utils';

const OrdersPage = () => {
  // Mock data - replace with real data
  const orders = [
    {
      id: '#3210',
      customer: 'Olivia Martin',
      date: '2024-03-15',
      items: 2,
      payment: 'Credit Card',
      status: 'Completed',
      total: '$42.25',
    },
    {
      id: '#3209',
      customer: 'Ava Johnson',
      date: '2024-03-14',
      items: 3,
      payment: 'PayPal',
      status: 'Processing',
      total: '$74.99',
    },
    {
      id: '#3208',
      customer: 'Michael Johnson',
      date: '2024-03-13',
      items: 1,
      payment: 'Cash',
      status: 'Pending',
      total: '$24.99',
    },
  ];

  const statusVariants: { [key: string]: string } = {
    Completed: 'bg-green-100 text-green-800',
    Processing: 'bg-blue-100 text-blue-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Order Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your store orders
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary">
          <FiPlus className="mr-2" /> New Order
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.payment}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(statusVariants[order.status], 'capitalize')}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page 1 of 1</span>
        <Button variant="outline" disabled>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default OrdersPage;
