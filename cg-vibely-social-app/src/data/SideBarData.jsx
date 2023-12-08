import friendsNav from '../assets/img/sidebar/friends.png'
import groupsNav from '../assets/img/sidebar/groups.png'
import marketNav from '../assets/img/sidebar/marketplace.png'
import pagesNav from '../assets/img/sidebar/pages.png'
import storyNav from '../assets/img/sidebar/story.png'
import newfeedNav from '../assets/img/sidebar/newfeed.png'
import ppl from '../assets/img/ppl.png'
import mess from "../assets/img/messenger.png"
import {useSelector} from "react-redux";
import {selectUserData} from "~/features/userAccount/index.js";
import {useEffect, useState} from "react";

const useSidebarData = () => {
    let user = useSelector(selectUserData)
    let [name, setName] = useState('Anonymous');
    let [avatar, setAvatar] = useState(ppl)

    useEffect(()=>{
            if (user){
                setName(user.firstName)
                setAvatar(user.avatarUrl)
            }
    },[user])
    return [
        {
            icon: avatar,
            path: '/profile',
            heading: name
        },
        {
            icon: newfeedNav,
            path: '/',
            heading: 'Feeds'
        },
        {
            icon: friendsNav,
            path: '/friends',
            heading: 'Friends'
        },
        {
            icon: groupsNav,
            path: '/groups',
            heading: 'Groups'
        },
        {
            icon: mess,
            path: '/messenger',
            heading: 'Messenger'
        },
        {
            icon: storyNav,
            path: '/stories',
            heading: 'Stories'
        },
        {
            icon: pagesNav,
            path: '/pages',
            heading: 'Pages'
        },
        {
            icon: marketNav,
            path: '/marketplace',
            heading: 'Marketplace'
        }
    ]
}
export default useSidebarData



