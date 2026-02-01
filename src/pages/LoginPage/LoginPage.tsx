import React from 'react';
import { Input } from '../../common/fields/inputs/Input/Input';
import { Button } from '../../common/buttons/Button/Button';

import './LoginPage.css';

export const LoginPage = () => {
  const [formValues, setFormValues] = React.useState({ username: '', password: '' });

  return (
    <div className='login_page'>
      <div className='login_page_container'>
        <div>Header</div>
        <div className='login_page_form_container'>
          <div className='login_page_input_container'>
            <Input
              isError={false}
              helperText='validation'
              value={formValues.username}
              placeholder='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, username: event.target.value })
              }
            />
          </div>
          <div className='login_page_input_container'>
            <Input
              isError={false}
              helperText='validation'
              value={formValues.password}
              placeholder='password'
              type='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, password: event.target.value })
              }
            />
          </div>
          <div className='login_page_button_container'>
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
