import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';

import { api, setCookie, useForm, useMutation } from '@utils';
import { IntlText } from '@features';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => validateIsEmpty(value);
const validatePassword = (value: string) => validateIsEmpty(value);

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword,
  isNotMyDevice: () => null // value больше не нужен
};

type FormValues = {
  username: string;
  password: string;
  isNotMyDevice: boolean;
};

interface User {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    FormValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));
  console.log('authLoading', authLoading);
  const { values, errors, setFieldValue, handleSubmit } = useForm<FormValues>({
    initialValues: { username: '', password: '', isNotMyDevice: false },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values);
      const response = await authMutation(values);

      if (response && values.isNotMyDevice) {
        setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
      }
      console.log('response', response);
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>REACT</div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              value={values.username}
              label='username'
              onChange={(e) => setFieldValue('username', e.target.value)}
              {...(errors?.username && {
                isError: !!errors.username,
                helperText: errors.username
              })}
            />
          </div>

          <div className={styles.input_container}>
            <PasswordInput
              value={values.password}
              label='password'
              onChange={(e) => setFieldValue('password', e.target.value)}
            />
          </div>

          <div className={styles.input_container}>
            <CheckBox
              checked={values.isNotMyDevice}
              label='This is not my device'
              onChange={(e) => setFieldValue('isNotMyDevice', e.target.checked)}
            />
          </div>

          <div>
            <Button type='submit'>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>

        <div
          role='link'
          tabIndex={0}
          aria-hidden='true'
          className={styles.sing_up_container}
          onClick={() => navigate('/registration')}
        >
          <IntlText path='page.login.createNewAccont' />
        </div>
      </div>
    </div>
  );
};
