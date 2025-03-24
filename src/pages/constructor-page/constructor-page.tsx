import { FC } from 'react';
import { Informer, Preloader } from '../../components/ui';
import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { burgerErrorS, burgerLoadSelector } from '@slices';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';

export const ConstructorPage: FC = () => {
  const errInridients = useSelector(burgerErrorS);
  const isIngrsLoad = useSelector(burgerLoadSelector);

  return (
    <>
      {isIngrsLoad ? (
        <Preloader />
      ) : errInridients ? (
        <div className={styles.informerWrapper}>
          <Informer variant='error'>{errInridients}</Informer>
        </div>
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
