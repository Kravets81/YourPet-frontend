import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute/PublicRoute';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { useAuth } from 'hooks/useAuth';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import authOperations from 'redux/auth/operations';

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const UserPage = lazy(() => import('pages/UserPage'));
const PetsListPage = lazy(() => import('pages/PetsListPage'));
const AddPetPage = lazy(() => import('pages/AddPetPage'));
const OurFriendsPage = lazy(() => import('pages/OurFriendsPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage'));
const NewsPage = lazy(() => import('pages/NewsPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  useEffect(() => {
    dispatch(authOperations.refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
  <Routes>
    <Route path="/" element={<SharedLayout />}>
      <Route index element={<HomePage />} />
      <Route element={<PublicRoute />}>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
      <Route element={<PrivateRoute />}>
              <Route path="user" element={<UserPage />} />
              <Route path="add-pet" element={<AddPetPage />} />
      </Route>
      <Route path="notices/" element={<PetsListPage />} />

      <Route path="notices/:category" element={<PetsListPage />} />

      <Route path="friends" element={<OurFriendsPage />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
  );
};

export default App;
