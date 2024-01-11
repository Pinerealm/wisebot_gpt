import { Box, Button, Typography } from '@mui/material';
import CustomizedInput from '../components/shared/CustomizedInput';
import { IoLogIn } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      toast.loading('Signing up...', { id: 'signup' });
      await auth?.signup(
        data.name as string,
        data.email as string,
        data.password as string
      );
      toast.success('Signed up successfully!', { id: 'signup' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to signup!', { id: 'signup' });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate('/chat');
    }
  }, [auth]);
  return (
    <Box width="100%" height="100%" display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
        <img src="airobot.png" alt="Robot" style={{ width: '400px' }} />
      </Box>
      <Box
        display="flex"
        flex={{ xs: 1, md: 0.5 }}
        justifyContent="center"
        alignItems="center"
        padding={2}
        ml="auto"
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            padding: '30px',
            boxShadow: '10px 10px 20px #000',
            borderRadius: '10px',
            border: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '400px',
                borderRadius: 2,
                bgcolor: '#00fffc',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                },
              }}
              endIcon={<IoLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
