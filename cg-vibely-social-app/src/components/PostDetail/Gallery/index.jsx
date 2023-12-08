import {ImageGrid} from "react-fb-image-video-grid"
import { Card } from "react-bootstrap";




function Gallery({images}) {

    const imageStyle = {
        maxHeight:((images.length > 2) ? "100%" : "450px"),
        width: "auto",
        justifySelf: ((images.length > 2) ? "stretch" : "center"),
        objectFit: ((images.length > 2) ? "cover" : "contain")
    }
    const imageCardStyle = {
        width: "auto",
        display: "grid",
        border: 0,
        justifyContent: "center"
    }
    return ( 
        <Card style={imageCardStyle}>
            <Card.Body style={{padding : 0
                                 ,maxHeight: "500px"}}>
                <ImageGrid >
                    {images.map((image,index) => {return <img key={index} style={imageStyle}  src={image}/>})}
                </ImageGrid>
            </Card.Body> 
        </Card>
    );
}

export default Gallery;