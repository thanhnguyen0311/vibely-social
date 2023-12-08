import {useState} from "react";

// eslint-disable-next-line react/prop-types
const ReadMore = ({content}) => {
    const text = content;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="fw-500 text-grey-600 lh-26 font-xssss w-100">
            {isReadMore ? text.slice(0, 250) : text}
            <span onClick={toggleReadMore}
                  className="read-or-hide cursor-pointer text-info"
            >
                {isReadMore ? " ...see more" : " ...collapse"}
            </span>
        </p>
    );
};
export default ReadMore