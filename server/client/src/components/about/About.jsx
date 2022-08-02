import { Box, styled, Typography, Link } from '@mui/material';
import Email from '@mui/icons-material/Email';
import Instagram from '@mui/icons-material/Instagram';
import GitHub from '@mui/icons-material/GitHub';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Techie Dishant</Typography>
                <Text variant="h5"> Github link here  | TECHIE DISHANT
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/dishantsethi1" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    INSTAGRAM
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/thetechpedia/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box> 
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;