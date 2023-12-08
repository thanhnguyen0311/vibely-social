import {useState,useEffect} from "react";
import WrapText from "~/utils/WrapText.jsx";


// eslint-disable-next-line react/prop-types
const ReadMore = ({content,isTextOnly}) => {

    
    const [isReadMore, setIsReadMore] = useState(false);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    
    useEffect(() => {
      if(content.length > 250) setIsReadMore(true)
      }, []);
    return (
        <p className={(isTextOnly ? "font-xss lh-26 " 
                                    : (content.length < 40) ? "font-xl lh-10 " :  "font-xs " )       
                                        + " fw-500 text-grey-700 w-100"}
            style={{whiteSpace: 'pre-wrap'}}>
            {isReadMore ? <WrapText content={content.slice(0, 250)} /> : <WrapText content={content} />}
            <span onClick={toggleReadMore}
                  className="read-or-hide cursor-pointer font-xssss text-vibe"
            >
                {isReadMore && "...See more" }
            </span>
        </p>
    );
};
export default ReadMore