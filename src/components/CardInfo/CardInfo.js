import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Theme } from '../../colors/Colors';

export const CardInfo = () => {
    const data = useSelector(state => state.defaultData.data);
    const { asin } = useParams()
    console.log(asin);

    const product = data.filter(item => item.asin === asin)

    return (
        <Card sx={{ width: 285 }} className="card__wrapper" >
            <CardMedia
                component="img"
                alt="Product image"
                height="250"
                image={product[0].img}
                />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    height="150"
                >
                    {product[0].name}
                </Typography>
                <hr/>
                <Typography 
                    marginTop={2}
                    variant="h5" 
                    component="div"
                    color={Theme.palette.primary.price}
                >
                    {product[0].price} $
                </Typography>
                <Typography 
                    marginTop={2}
                    variant="body2" 
                    color="text.secondary"
                >
                    {product[0].asin}
                </Typography>
                <Link 
                    marginTop={2}
                    href={product[0].link} 
                    underline="hover"
                >
                    {product[0].bsr_category}
                </Link>
                <Button variant="outlined" href="#contained-buttons">
                    <RouterLink to={'/'}>Return</RouterLink>
                </Button>
            </CardContent>
        </Card>
    )
}