// app/(dashboard)/page.tsx

import { OverviewCard } from './OverviewCard';
import { QuickActions } from './QuickActions';
import { RecentOrders } from './RecentOrders';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          title="Total Orders"
          value="245"
          icon="orders"
          trend="+12.5%"
        />
        <OverviewCard
          title="Revenue"
          value="$12,450"
          icon="revenue"
          trend="+8.2%"
        />
        <OverviewCard
          title="Products"
          value="154"
          icon="products"
          trend="+5 new"
        />
        <OverviewCard
          title="Active Users"
          value="2,543"
          icon="users"
          trend="+34"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrders />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardPage;
