import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
// const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
// const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));

/*
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
*/

// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));

// AWS
const AWSListPage = lazy(() => import('src/pages/dashboard/aws/list'));
// const AWSDetailsPage = lazy(() => import('src/pages/dashboard/aws/details'));
const AWSCreatePage = lazy(() => import('src/pages/dashboard/aws/new'));

// GCP
const GCPListPage = lazy(() => import('src/pages/dashboard/gcp/list'));
// const GCPDetailsPage = lazy(() => import('src/pages/dashboard/gcp/details'));
const GCPCreatePage = lazy(() => import('src/pages/dashboard/gcp/new'));

// IDP
const IdPListPage = lazy(() => import('src/pages/dashboard/idp/list'));

// AWS
const WindowADListPage = lazy(() => import('src/pages/dashboard/ad/list'));

// USER
// const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
// const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
// const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
const UserGroupPage = lazy(() => import('src/pages/dashboard/group/list'));
// const DepartmentUserPage = lazy(() => import('src/pages/dashboard/department/list'))
const UserPositionPage= lazy(() => import('src/pages/dashboard/position/list'));

// GROUP
const GroupListPage = lazy(() => import('src/pages/dashboard/group/list'));
const GroupUserListPage = lazy(() => import('src/pages/dashboard/group/detail'));
const GroupCreatePage = lazy(() => import('src/pages/dashboard/group/new'));
const GroupEditPage = lazy(() => import('src/pages/dashboard/group/edit'));

// POSITION
const PositionListPage = lazy(() => import('src/pages/dashboard/position/list'));
const PositionCreatePage = lazy(() => import('src/pages/dashboard/position/new'));
const PositionEditPage = lazy(() => import('src/pages/dashboard/position/edit'));

// REQUEST
const RequestListPage = lazy(() => import('src/pages/dashboard/request/list'));
const RequestCreatePage = lazy(() => import('src/pages/dashboard/request/new'));

// Anomaly
const AnomalyListPage = lazy(() => import('src/pages/dashboard/anomaly/list'));
const AnomalycreateTimePage = lazy(() => import('src/pages/dashboard/anomaly/createTime'));
const AnomalycreateIPPage = lazy(() => import('src/pages/dashboard/anomaly/createIP'));

// AnomalyAlarm
const AnomalyAlarmListPage = lazy(() => import('src/pages/dashboard/anomalyAlarm/list'));
const AnomalyAlarmAnalyticsPage = lazy(() => import('src/pages/dashboard/anomalyAlarm/analytics'));

/*
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
*/
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
/*
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
*/

// APP
// const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
// const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
// const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));


// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  // {
  //   path: '/',
  //   element: (
  //     <AuthGuard>
  //       <DashboardLayout>
  //         <Suspense fallback={<LoadingScreen />}>
  //           <Outlet />
  //         </Suspense>
  //       </DashboardLayout>
  //     </AuthGuard>
  //   ),
  // },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      // { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      // { path: 'banking', element: <OverviewBankingPage /> },
      // { path: 'booking', element: <OverviewBookingPage /> },
      // { path: 'file', element: <OverviewFilePage /> },

      {
        path: 'user',
        children: [
          { element: <UserListPage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
          // { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: 'group', element: <UserGroupPage /> },
          // {path: ':departmentName', element: <DepartmentUserPage/>},
          { path: 'position', element: <UserPositionPage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'group',
        children: [
          { element: <GroupListPage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
          // { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <GroupListPage /> },
          { path: 'new', element: <GroupCreatePage /> },
          { path: ':departmentName/detail', element: <GroupUserListPage /> },
          { path: ':id/edit', element: <GroupEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'position',
        children: [
          { element: <PositionListPage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
          // { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <PositionListPage /> },
          { path: 'new', element: <PositionCreatePage /> },
          { path: ':id/edit', element: <PositionEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'request',
        children: [
          { element: <RequestCreatePage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
          // { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <RequestListPage /> },
          { path: 'new', element: <RequestCreatePage /> },
          { path: ':id/edit', element: <PositionEditPage /> },
        ],
      },
      /* {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      } */ {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'aws',
        children: [
          { element: <AWSListPage />, index: true },
          { path: 'list', element: <AWSListPage /> },
          // { path: ':id', element: <AWSDetailsPage /> },
          { path: 'new', element: <AWSCreatePage /> },
        ],
      },
      {
        path: 'gcp',
        children: [
          { element: <GCPListPage />, index: true },
          { path: 'list', element: <GCPListPage /> },
          // { path: ':id', element: <GCPDetailsPage /> },
          { path: 'new', element: <GCPCreatePage /> },
        ],
      },
      {
        path: 'idp',
        children: [
          { element: <IdPListPage />, index: true },
          { path: 'list', element: <IdPListPage /> },
          // { path: ':id', element: <AWSDetailsPage /> },
          // { path: 'new', element: <AWSCreatePage /> },
        ],
      },
      {
        path: 'ad',
        children: [
          { element: <WindowADListPage />, index: true },
          { path: 'list', element: <WindowADListPage /> },
        ],
      },
      {
        path: 'gcp',
        children: [
          { element: <GCPListPage />, index: true },
          { path: 'list', element: <GCPListPage /> },
          // { path: ':id', element: <GCPDetailsPage /> },
          { path: 'new', element: <GCPCreatePage /> },
        ],
      },

      {
        path: 'anomaly',
        children: [
          { element: <AnomalyListPage />, index: true },
          { path: 'list', element: <AnomalyListPage /> },
          // { path: ':id', element: <AWSDetailsPage /> },
          { path: 'createTime', element: <AnomalycreateTimePage /> },
          { path: 'createIP', element: <AnomalycreateIPPage /> },
        ],
      },
      {
        path: 'anomalyAlarm',
        children: [
          { element: <AnomalyAlarmListPage />, index: true },
          { path: 'list', element: <AnomalyAlarmListPage /> },
          { path: 'analytics', element: <AnomalyAlarmAnalyticsPage /> },
          // { path: ':id', element: <AWSDetailsPage /> },
          // { path: 'alarm', element: <AnomalyAlarmPage /> },
        ],
      },

      /*
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      */
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      /*
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      */
      // { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      // { path: 'chat', element: <ChatPage /> },
      // { path: 'calendar', element: <CalendarPage /> },
      // { path: 'kanban', element: <KanbanPage /> },
      // { path: 'permission', element: <PermissionDeniedPage /> },
      // { path: 'blank', element: <BlankPage /> },
      
    ],
  },
];
