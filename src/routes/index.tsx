import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const TipCalculator = lazy(() => import('@/pages/tip-calculator'));

export default function AppRouter() {
  const publicRoutes = [
    {
      path: '/',
      element: <TipCalculator />
    }
  ];

  const routes = useRoutes([...publicRoutes]);

  return routes;
}
