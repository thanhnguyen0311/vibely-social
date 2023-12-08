import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {motion} from "framer-motion";
import "./index.css";
import {useEffect, useState} from "react";
import {
    deleteSuggestionFriend, getFriendRequests, getSuggestionFriends,
    selectFriendRequestList,
    selectSuggestionFriendsList
} from "~/features/suggestionFriends";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function Friends() {
    const dispatch = useDispatch();
    const friendRequestList = useSelector(selectFriendRequestList)
    const [showDeleteModalRequest, setShowDeleteModalRequest] = useState(false);
    const [selectedItemRequest, setSelectedItemRequest] = useState(null);
    const [showDeleteModalSuggestion, setShowDeleteModalSuggestion] = useState(false);
    const [selectedItemSuggestion, setSelectedItemSuggestion] = useState(null);
    const friendSuggestion = useSelector(selectSuggestionFriendsList);
    const handleDeleteClickRequest = (friend) => {
        setSelectedItemRequest(friend);
    };

    const handleConfirmDeleteRequest = () => {

    };

    useEffect(() => {
        dispatch(getSuggestionFriends())
        dispatch(getFriendRequests())
    }, []);


    // ------------------------friend suggestion----------------------

    const handleDeleteClickSuggestion = (suggestion) => {
        setSelectedItemSuggestion(suggestion);
        dispatch(deleteSuggestionFriend(suggestion));
        // setShowDeleteModalSuggestion(true);
    };
    const handleConfirmDeleteSuggestion = () => {
        if (selectedItemSuggestion) {
            dispatch(deleteSuggestionFriend(selectedItemSuggestion));
            setShowDeleteModalSuggestion(false);
        }
    }

    return (
        <>
            {/* ----------------------friend request-------------------- */}

            <Row className="float-left w-100 d-flex flex-wrap ">
                <Col style={{display: "grid", gridTemplateRows: "repeat"}}>
                    <Card className="w-100 d-block d-flex border-0 bg-transparent p-4 mb-1">
                        <Card.Body className="d-flex align-items-center p-0">
                            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-700">
                                Friend Requests
                            </h2>
                        </Card.Body>
                    </Card>

                    <Row className="pe-2 ps-2">
                        {friendRequestList?.map((friend, index) => {
                            return (
                                <Col className=" w-100 pb-3 p-0 text-center me-2"
                                     key={index}>
                                    <motion.div initial={{opacity: 0, scale: 0.2}}
                                                animate={{opacity: 1, scale: 1}}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.3,
                                                    ease: [0, 0.71, 0.2, 1.01],
                                                }}>
                                        <Card className="d-block border-0 shadow-xss rounded-3  overflow-hidden"
                                              style={{width: "220px", height: "380px"}}>
                                            <Card.Body
                                                className="d-flex flex-column justify-content-between p-0 h-100 pb-3">
                                                <div>
                                                    <img src={friend?.avatarUrl}
                                                         className="bg-white avatar w-100 shadow-xss border border-light"
                                                         style={{minHeight: "220px", maxHeight: "220px"}}/>
                                                    <Link to={`/profile/${friend.id}`}>
                                                        <h4 className="fw-700 font-xs mt-2 mb-1 ms-2 hover-underline">
                                                            {`${friend.firstName} ${friend.lastName}`}
                                                        </h4>
                                                    </Link>
                                                    {friend?.mutualFriends &&
                                                        <p className="fw-500 font-xssss text-grey-500 mt-0 ms-2 mb-1">
                                                            {friend?.mutualFriends} mutual friends
                                                        </p>}
                                                </div>
                                                <div>
                                                    <Button
                                                        className=" border-0 pt-2 pb-2 pe-3 ps-3 lh-20 me-1 ls-3 mb-2  rounded-sm bg-primary-gradiant font-xssss fw-700 text-white"
                                                        style={{width: "80%"}}>
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        className=" border-0 pt-2 pb-2 pe-3 ps-3 lh-20 me-1 ls-3  rounded-sm bg-grey font-xssss fw-700 ls-lg text-grey-800"
                                                        style={{width: "80%"}}
                                                        onClick={() => handleDeleteClickRequest(friend)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* -------------------show pop up delete friend request----------------- */}

                    <Modal
                        show={showDeleteModalRequest}
                        onHide={() => setShowDeleteModalRequest(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete {selectedItemRequest?.firstName}{" "}
                            {selectedItemRequest?.lastName}?{" "}
                            <img
                                src={selectedItemRequest?.avatar}
                                alt="image"
                                className=" shadow-sm rounded-circle w50"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowDeleteModalRequest(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDeleteRequest}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>

            <Row className="border-top border-5"></Row>

            {/* ---------------------friend suggestion------------------- */}

            <Row className="float-left w-100 d-flex flex-wrap ">
                <Col style={{display: "grid", gridTemplateRows: "repeat"}}>
                    <Card className="w-100 d-block d-flex border-0 bg-transparent p-4 mb-1">
                        <Card.Body className="d-flex align-items-center p-0">
                            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-700">
                                People You May Know
                            </h2>
                        </Card.Body>
                    </Card>
                    <Row className="pe-2 ps-2">
                        {friendSuggestion.map((friend, index) => {
                            return (
                                <Col
                                    className="flex-grow-1 w-100 pb-2 p-0 text-center "
                                    key={index}
                                >
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.2}}
                                        animate={{opacity: 1, scale: 1}}
                                        transition={{
                                            duration: 0.8,
                                            delay: index * 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                        }}
                                    >
                                        <Card
                                            className="d-block border-0 shadow-xss rounded-3  overflow-hidden"
                                            style={{width: "220px", height: "380px"}}
                                        >
                                            <Card.Body className="d-block p-0">
                                                <img
                                                    src={friend?.avatar}
                                                    className="bg-white avatar w-100 shadow-xss border border-light"
                                                    style={{minHeight: "220px", maxHeight: "220px"}}
                                                />
                                                <Link to={`/profile/${friend.id}`}>
                                                    <h4 className="fw-700 mont-font font-xs mt-2 mb-1 text-center hover-underline">
                                                        {`${friend?.firstName} ${friend?.lastName}`}
                                                    </h4>
                                                </Link>
                                                <p className="fw-500 font-xssss text-grey-500 mt-0 mb-1 text-center">
                                                    {friend?.numberMutualFriend} mutual friends
                                                </p>
                                                <Button
                                                    className=" border-0 pt-2 pb-2 pe-3 ps-3 lh-20 me-1 ls-3 mb-2  rounded-sm bg-primary-gradiant font-xssss fw-700 text-white"
                                                    style={{width: "80%"}}
                                                >
                                                    Add friend
                                                </Button>
                                                <Button
                                                    className=" border-0 pt-2 pb-2 pe-3 ps-3 lh-20 me-1 ls-3  rounded-sm bg-grey font-xssss fw-700 ls-lg text-grey-800"
                                                    style={{width: "80%"}}
                                                    onClick={() => handleDeleteClickSuggestion(friend)}
                                                >
                                                    Delete
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            );
                        })}
                    </Row>
                    {/* ----------------------show pop up delete friend suggestion-------------   */}
                    <Modal
                        show={showDeleteModalSuggestion}
                        onHide={() => setShowDeleteModalSuggestion(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete {selectedItemSuggestion?.firstName}{" "}
                            {selectedItemSuggestion?.lastName}?{" "}
                            <img
                                src={selectedItemSuggestion?.avatar}
                                alt="image"
                                className=" shadow-sm rounded-circle w50"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShowDeleteModalSuggestion(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleConfirmDeleteSuggestion}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
        </>
    );
}

export default Friends;
