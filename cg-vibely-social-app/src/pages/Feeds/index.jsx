import RightFeed from "./RightFeeds";
import {Col, Row} from "react-bootstrap";
import "../../components/FeedBody/index.scss"
import FeedBody from "~/components/FeedBody/index.jsx";


function Feeds() {

    return (
        <Row className="feed-body pt-3">
            <Col xl={8} xxl={9} lg={8}>
                <FeedBody/>
            </Col>
            <RightFeed/>
        </Row>
    );
}

export default Feeds;
