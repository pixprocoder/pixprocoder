// components/dashboard/OverviewCard.tsx
'use client';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiShoppingBag,
  FiDollarSign,
  FiBox,
  FiUsers,
} from 'react-icons/fi';

export const OverviewCard = ({ title, value, icon, trend }: any) => {
  const icons = {
    orders: <FiShoppingBag className="h-6 w-6" />,
    revenue: <FiDollarSign className="h-6 w-6" />,
    products: <FiBox className="h-6 w-6" />,
    users: <FiUsers className="h-6 w-6" />,
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background border border-border rounded-xl p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          {icons[icon as keyof typeof icons]}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
          <FiArrowUpRight className="h-4 w-4" />
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  );
};
