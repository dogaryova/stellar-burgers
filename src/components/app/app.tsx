import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { fetchIngredients } from '@slices';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/clientApiSlice/sliceApi';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backgroundLocation: Location | undefined = location.state?.background;
  const orderNumberFeed = useMatch('/feed/:number')?.params.number;
  const orderNumberProfile = useMatch('/profile/orders/:number')?.params.number;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const onCloseModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_digits-default ${styles.detailHeader}`}
                >
                  #{orderNumberFeed}
                </p>
                <OrderInfo />
              </div>
            }
          />
        </Route>
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path=':number'
              element={
                <ProtectedRoute>
                  <div className={styles.detailPageWrap}>
                    <p
                      className={`text text_type_digits-default ${styles.detailHeader}`}
                    >
                      #{orderNumberProfile || 'номер не определён'}
                    </p>
                    <OrderInfo />
                  </div>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`Детали заказа ${(orderNumberProfile && '#' + orderNumberProfile) || ''}`}
                  onClose={onCloseModal}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={
                  `Детали заказа ${orderNumberFeed && '#' + orderNumberFeed}` ||
                  ''
                }
                onClose={onCloseModal}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
