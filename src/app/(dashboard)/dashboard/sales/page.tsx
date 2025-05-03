// app/(dashboard)/sales/page.tsx
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
import {
  FiSearch,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiShoppingBag,
} from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { cn } from '@/src/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

const SalesPage = () => {
  // Mock data - replace with real data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$24,500',
      icon: <FiDollarSign />,
      trend: '+12.5%',
    },
    {
      title: 'Avg. Order Value',
      value: '$89.99',
      icon: <FiTrendingUp />,
      trend: '+2.4%',
    },
    {
      title: 'New Customers',
      value: '324',
      icon: <FiUsers />,
      trend: '+18.7%',
    },
    {
      title: 'Conversion Rate',
      value: '3.8%',
      icon: <FiShoppingBag />,
      trend: '-1.2%',
    },
  ];

  const topProducts = [
    {
      name: 'Wireless Headphones',
      category: 'Electronics',
      orders: 142,
      revenue: '$42,500',
      stock: 15,
    },
    {
      name: 'Cotton T-Shirt',
      category: 'Apparel',
      orders: 89,
      revenue: '$4,450',
      stock: 234,
    },
    {
      name: 'Smart Watch',
      category: 'Wearables',
      orders: 67,
      revenue: '$20,100',
      stock: 42,
    },
  ];

  const recentTransactions = [
    {
      id: '#TXN-001',
      customer: 'Sarah Johnson',
      date: '2024-03-15',
      amount: '$299.99',
      status: 'Completed',
    },
    {
      id: '#TXN-002',
      customer: 'Mike Chen',
      date: '2024-03-14',
      amount: '$149.99',
      status: 'Pending',
    },
    {
      id: '#TXN-003',
      customer: 'Alex Turner',
      date: '2024-03-13',
      amount: '$89.99',
      status: 'Refunded',
    },
  ];

  const statusVariants: { [key: string]: string } = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Refunded: 'bg-gray-100 text-gray-800',
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
            Sales Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of your store's sales performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {metric.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Badge
                    variant={
                      metric.trend.startsWith('+') ? 'positive' : 'negative'
                    }
                  >
                    {metric.trend}
                  </Badge>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle>Sales Overview</CardTitle>
            <Button variant="outline">Last 30 Days</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 h-80">
          {/* Add your chart implementation here (e.g., Recharts) */}
          <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
            <span className="text-muted-foreground">
              Sales chart placeholder
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.orders}</TableCell>
                    <TableCell>{product.revenue}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          product.stock > 50
                            ? 'text-green-600'
                            : 'text-yellow-600',
                        )}
                      >
                        {product.stock} left
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          statusVariants[transaction.status],
                          'capitalize',
                        )}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SalesPage;
