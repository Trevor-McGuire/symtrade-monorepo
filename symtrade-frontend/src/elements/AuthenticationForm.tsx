import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Box,
  LoadingOverlay,
} from '@mantine/core';
// import { GoogleButton } from './GoogleButton';
// import { TwitterButton } from './TwitterButton';
import { useState } from 'react';
import { useAuth } from '../auth-context/auth-context';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export function AuthenticationForm(props: PaperProps) {
  const location = useLocation();
  const [type, setType] = useState(location.pathname.slice(1));
  const [login, { error: loginError }] = useMutation(LOGIN_MUTATION);
  const [register, { error: registerError }] = useMutation(REGISTER_MUTATION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setActiveSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const newType = location.pathname.slice(1);
    if (newType !== type) {
      setType(newType);
    }
  }, [location, type]);

  const toggle = () => {
    const newType = type === 'login' ? 'register' : 'login';
    setType(newType);
    navigate(`/${newType}`);
  };

  // const timestatmp = new Date().getTime();
  const form = useForm({
    initialValues: {
      // name: 'user' + timestatmp.toString(),
      // passwordA: 'asdfasdf',
      // passwordB: 'asdfasdf',
      name: '',
      passwordA: '',
      passwordB: '',
      terms: true,
      type,
    },

    validate: {
      name: (val) =>
        val.length <= 3
          ? 'Invalid name. Must be 3 or more characters long.'
          : null,
      passwordA: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      passwordB: (val, values) => 
        val !== values.passwordA
          ? 'Passwords should match'
          : null,
      terms: (val) => (val ? null : 'You should accept terms and conditions'),
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, passwordA : password } = form.values;
    setLoading(true);
    console.log('handleSubmit. name: ', name, ' and password: ', password);
    if (type === 'login') {
      try {
        console.log('calling login mutation');
        const { data } = await login({ variables: { name, password } });
        setActiveSession(data.login);
        console.log('data: ', data);
      } catch (error) {
        setError(
          loginError?.message ||
            'Something went wrong. Please try again later.',
        );
      }
    } else {
      try {
        console.log('calling register mutation');
        const { data } = await register({ variables: { name, password } });
        setActiveSession(data.register);
        console.log('data: ', data);
      } catch (error) {
        setError(
          registerError?.message ||
            'Something went wrong. Please try again later.',
        );
      }
    }
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to SymTrade, {type} with
        </Text>

        {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}

        <Divider
          // label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form data-testid="authentication-form" onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              data-testid="username-input"
              label="Username"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
              radius="md"
            />

            <PasswordInput
              required
              data-testid="passwordA-input"
              label="Password"
              placeholder="pAssw0rd!123"
              value={form.values.passwordA}
              onChange={(event) =>
                form.setFieldValue('passwordA', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius="md"
            />

            {type === 'register' && (
              <>
                <PasswordInput
                  required
                  data-testid="passwordB-input"
                  label="Repeat password"
                  placeholder="pAssw0rd!123"
                  value={form.values.passwordB}
                  onChange={(event) =>
                    form.setFieldValue('passwordB', event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    'Password should include at least 6 characters'
                  }
                  radius="md"
                />
                <Checkbox
                  data-testid="terms-checkbox"
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue('terms', event.currentTarget.checked)
                  }
                />
              </>
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
          {error && (
            <Text c="red" ta="center" mt="sm">
              {error}
            </Text>
          )}
        </form>
      </Paper>
    </Box>
  );
}
