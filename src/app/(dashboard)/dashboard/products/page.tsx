// app/(dashboard)/products/page.tsx
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
import { FiSearch, FiPlus, FiBox, FiEdit, FiTrash } from 'react-icons/fi';
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

const ProductsPage = () => {
  // Mock data - replace with real data
  const products = [
    {
      id: 'P-001',
      name: 'Premium Wireless Headphones',
      sku: 'SKU-1234',
      category: 'Electronics',
      stock: 15,
      price: '$299.99',
      status: 'Published',
    },
    {
      id: 'P-002',
      name: 'Organic Cotton T-Shirt',
      sku: 'SKU-5678',
      category: 'Apparel',
      stock: 0,
      price: '$49.99',
      status: 'Draft',
    },
    {
      id: 'P-003',
      name: 'Stainless Steel Water Bottle',
      sku: 'SKU-9012',
      category: 'Kitchen',
      stock: 42,
      price: '$34.99',
      status: 'Archived',
    },
  ];

  const statusVariants: { [key: string]: string } = {
    Published: 'bg-green-100 text-green-800',
    Draft: 'bg-blue-100 text-blue-800',
    Archived: 'bg-gray-100 text-gray-800',
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
            Product Inventory
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary">
          <FiPlus className="mr-2" /> New Product
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <CardTitle>All Products</CardTitle>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/product-placeholder.jpg" />
                      <AvatarFallback>
                        <FiBox className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        product.stock > 0
                          ? 'text-green-600'
                          : 'text-destructive',
                      )}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : 'Out of stock'}
                    </span>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        statusVariants[product.status],
                        'capitalize',
                      )}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon">
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-destructive"
                      >
                        <FiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
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

export default ProductsPage;
