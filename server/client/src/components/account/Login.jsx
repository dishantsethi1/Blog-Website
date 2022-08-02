
import React, { useState, useEffect, useContext } from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material'
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import {useNavigate} from 'react-router-dom'
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const loginInitialValues = {
    username: '',
    password: ''
};


const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleAccount]=useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const navigate = useNavigate();

    const { setAccount } = useContext(DataContext);

    const toggleSignup=()=>{
        account==='login'?toggleAccount('signup'):toggleAccount('login');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later LOGIN' );
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later SIGNUP');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login"></Image>
                {
                    account==='login'?
                        <Wrapper>
                        <TextField id="standard-basic" value={login.username} onChange={(e) => onValueChange(e)} name='username' label="username" variant="standard" />
                        <TextField id="standard-basic" value={login.password} onChange={(e) => onValueChange(e)} name='password' label="password" variant="standard" />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                        <Text style={{textAlign:'center'}}>
                        OR
                        </Text>
                        <SignupButton onClick={()=>toggleSignup()}>SignUp</SignupButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField id="standard-basic"  onChange={(e) => onInputChange(e)} name='name' label="name" variant="standard" />
                        <TextField id="standard-basic"  onChange={(e) => onInputChange(e)} name='username' label="username" variant="standard" />
                        <TextField id="standard-basic"  onChange={(e) => onInputChange(e)} name='password' label="password" variant="standard" />
                        <SignupButton onClick={()=>signupUser()}>Signup</SignupButton>
                        <Text style={{textAlign:'center'}}>
                        OR
                        </Text>
                        <LoginButton variant="contained" onClick={()=>toggleSignup()}>Login</LoginButton>
                    </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login
