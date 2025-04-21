import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { Informer, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileUI } from '@ui-pages';

import {
  updateUser,
  selectUserUpdateError,
  selectUserData,
  selectUserLoadingStatus
} from '@slices';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const userIsLoading = useSelector(selectUserLoadingStatus);

  const user = useSelector(selectUserData);
  const updateError = useSelector(selectUserUpdateError);

  const [formValue, setFormValue] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: ''
  });

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  if (userIsLoading) return <Preloader />;

  return (
    <>
      <ProfileUI
        formValue={formValue}
        handleInputChange={handleInputChange}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
      {updateError && <Informer>{updateError}</Informer>}
    </>
  );
};
