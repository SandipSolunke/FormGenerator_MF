import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router';
import { IPageConfig } from '../../types/pageConfig';
import Project from './projects/Project';

const ProjectWrapper = lazy(
  () => import('./projects/component/ProjectWrapper')
);

const MyRoutes = {
  routes: [
    // {
    //   path: 'project/:projectId/:menuId/:subMenuId/detail',
    //   element: <ProjectWrapper />,
    //   children: [
    //     {
    //       path: ':projectId/',
    //       element: (
    //         <Suspense fallback={<>...</>}>
    //           <ProjectWrapper />
    //         </Suspense>
    //       ),
    //       children: [
    //         {
    //           path: ':menuId/',
    //           element: (
    //             <Suspense fallback={<>...</>}>
    //               <ProjectWrapper />
    //             </Suspense>
    //           ),
    //           children: [
    //             {
    //               path: ':subMenuId/*',
    //               element: (
    //                 <Suspense fallback={<>...</>}>
    //                   <ProjectWrapper />
    //                 </Suspense>
    //               ),
    //               children: [
    //                 {
    //                   path: 'detail',
    //                   element: (
    //                     <Suspense fallback={<>...</>}>
    //                       <ProjectWrapper />
    //                     </Suspense>
    //                   ),
    //                   children: [],
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      path: 'project/:projectId/:menuId/:subMenuId/',
      element: <ProjectWrapper />,
      children: [
        {
          path: ':projectId/',
          element: <></>,
          children: [
            {
              path: ':menuId/',
              element: <></>,
              children: [
                {
                  path: ':subMenuId/',
                  element: <></>,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      path: 'project/:projectId/:menuId',
      element: (
        <Suspense fallback={<>...</>}>
          <ProjectWrapper />
        </Suspense>
      ),
      children: [
        {
          path: ':projectId/',
          element: (
            <Suspense fallback={<>...</>}>
              <ProjectWrapper />
            </Suspense>
          ),
          children: [
            {
              path: ':menuId/',
              element: (
                <Suspense fallback={<>...</>}>
                  <ProjectWrapper />
                </Suspense>
              ),
              children: [],
            },
          ],
        },
      ],
    },
    {
      path: 'project/:projectId/',
      element: (
        <Suspense fallback={<>...</>}>
          <ProjectWrapper />
        </Suspense>
      ),
      children: [],
    },
  ],
};

export default MyRoutes;
