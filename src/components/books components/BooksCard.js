import React,{useState} from 'react'
import {

    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
  } from "@mui/material";

const BooksCard = ({bookName,author,category,language,academicLevel,id,cardClick}) => {
    // const{bookName,author,category,academicLevel,id}=props
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
     <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        // marginBottom:"6px"
        
      }}
      onClick={cardClick}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {bookName}
        </Typography>
        <Typography sx={{ mb: "0.5rem" }} color={theme.palette.secondary[400]}>
          {author}
        </Typography>

        <Typography sx={{ mb: "0.1rem" }} >{language}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onMouseEnter={() => setIsExpanded(!isExpanded)}
          onMouseLeave={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {id}</Typography>
          <Typography>academic Level: {academicLevel}</Typography>
          {/* <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
    </>
  )
}

export default BooksCard