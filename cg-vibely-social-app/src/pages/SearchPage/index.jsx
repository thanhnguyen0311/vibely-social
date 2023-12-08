import {Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    searchUser,
    selectSearchUsersIsSuccess,
    selectUsers,
    setSearchUsersSuccess
} from "~/features/searchUser/index.js";
import {useEffect, useState} from "react";
import {selectKeyword} from "~/features/getKeywordSearch/index.js";
import {selectFriendList} from "~/features/getFriends/index.js";
import {getStoredUserData} from "~/service/accountService.js";

function SearchPage() {
    const dispatch = useDispatch();
    const currentUser = getStoredUserData();
    const userList = useSelector(selectUsers);
    const getKeyword = useSelector(selectKeyword);
    const friends = useSelector(selectFriendList)
    const [users, setUsers] = useState(userList);
    const success = useSelector(selectSearchUsersIsSuccess);
    const [page, setPage] = useState(0);

    const checkFriend = (userId) => {
        let check = false;
        friends.map((friend) => {
            if (friend.id === userId) {
                return check = true;
            }
        })
        return check;
    }
    const handleIncreasePage = () => {
        setPage(previousPage => previousPage + 1);
        dispatch(searchUser({
            keyword: getKeyword.keyword,
            page: page + 1
        }));
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const handleDecreasePage = () => {
        setPage(previousPage => previousPage - 1);
        dispatch(searchUser({
            keyword: getKeyword.keyword,
            page: page - 1
        }));
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        setPage(0)
    }, [getKeyword.keyword])

    useEffect(() => {
        if (success) {
            setUsers(userList);
        }
        return () => {
            if (success) {
                dispatch(setSearchUsersSuccess(false));
            }
        }
    }, [userList]);

    return (
        <>
            <Row style={{marginTop: "12px"}}>
                <div className="col-xl-12 bg-white rounded-xxl">
                    <div className="card-body row mt-4">
                        {users !== '' ?
                            users.map((user, index) => (
                                <>
                                    {
                                        user.id !== currentUser.id ?
                                            <div key={index}
                                                 className="col-md-4 col-sm-6 pe-2 ps-2">
                                                <div className="card d-block border-0 shadow-xss rounded-3 mb-3">
                                                    <div className="card-body d-block d-flex w-100 align-items-center h125">
                                                        <img className="h75 w75 rounded"
                                                             style={{objectFit: "cover"}}
                                                             src="https://via.placeholder.com/50x50.png" alt="avatar"/>
                                                        <Link to={`/profile/${user.id}`}
                                                              className="ms-3 cursor-pointer">
                                                            <h4 className="fw-700 font-xsss mt-3 hover-underline hover-scale-1-1">
                                                                {`${user.firstName} ${user.lastName}`}
                                                            </h4>
                                                            <div
                                                                className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                                                                {user.email}
                                                            </div>
                                                        </Link>

                                                        {
                                                            checkFriend(user.id) ?
                                                                <span
                                                                    className="d-flex align-items-center ms-auto
                                                                    bg-lightblue p-2 rounded-3 text-dark font-xssss fw-500">
                                                                    <i className="feather-user-check font-xsss tetx-dark me-1"></i>
                                                                    Friends
                                                                </span>
                                                                :
                                                                <span
                                                                    className="d-flex align-items-center ms-auto
                                                                    bg-current-shade p-2 rounded-3 text-white font-xssss fw-500">
                                                                    <i className="feather-user-x font-xsss tetx-dark me-1"></i>
                                                                    Unknown
                                                                </span>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            : <></>
                                    }
                                </>
                            ))
                            : <span className="text-center mt-2 mb-4 text-grey-800">Empty</span>
                        }
                    </div>

                    <div className="">
                        <ul className="pagination justify-content-center mt-2 mb-4">
                            {
                                page === 0 ? <span className="w35"></span>
                                    :
                                    <li className="page-item">
                                        <p onClick={() => {
                                            handleDecreasePage()
                                        }}
                                           className="page-link w35 border-0 text-grey-600 hover-button rounded cursor-pointer">
                                            <span aria-hidden="true">&laquo;</span>
                                        </p>
                                    </li>
                            }

                            <li className="">
                                <p className=" w60 text-center border-0 text-grey-600 rounded mt-2">
                                    {page + 1}
                                </p>
                            </li>

                            {
                                users === '' || users.length < 20 ? <span className="w35"></span>
                                    :
                                    <li className="page-item">
                                        <span onClick={() => {
                                            handleIncreasePage();
                                        }}
                                              className="page-link w35 border-0 text-grey-600 hover-button rounded cursor-pointer">
                                            <span aria-hidden="true">&raquo;</span>
                                        </span>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </Row>


        </>

    )
}

export default SearchPage;