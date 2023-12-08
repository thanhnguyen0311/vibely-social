import {configureStore} from '@reduxjs/toolkit';
import toggleChat from '~/features/toggleChat';
import toggleLoader from '~/features/toggleLoader';
import {sidebarSlice} from '~/features/toggleSidebar';
import {userAccountSlice} from "~/features/userAccount/index.js";
import postsSlice from '~/features/getPosts';
import {getFriendsSlice} from "~/features/getFriends/index.js";
import {switchConversationSlice} from "~/features/switchConversation/index.js";
import {loadOldMessagesSlice} from "~/features/loadOldMessages/index.jsx";
import {messengerSlice} from "~/features/messeger/index.jsx";
import {userInfoSlice} from "~/features/userInfo/UserInfoSlice.js";
import {getCitiesSlice} from "~/features/getCities/index.js";
import {suggestionFriendsSlice} from "~/features/suggestionFriends/index.js";
import {getMediaSlice} from "~/features/getMedia/index.jsx";
import {typingStatusSlice} from "~/features/typingStatus/index.jsx";
import {getMediaPostDetailsSlice} from "~/features/getMediaPostDetails/index.jsx";
import {bottomChatSlice} from "~/features/bottomChat/index.jsx";
import onlineStatusSlice from "~/features/onlineStatus/index.jsx";
import {notificationSlice} from "~/features/notification/index.jsx";
import {searchUserSlice} from "~/features/searchUser/index.js";
import {getKeyword} from "~/features/getKeywordSearch/index.js";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer,
        openChat: toggleChat.reducer,
        firstLoad: toggleLoader.reducer,
        userInfo: userInfoSlice.reducer,
        friends: getFriendsSlice.reducer,
        switchConversation: switchConversationSlice.reducer,
        userAccount: userAccountSlice.reducer,
        oldMessages: loadOldMessagesSlice.reducer,
        messenger: messengerSlice.reducer,
        cities: getCitiesSlice.reducer,
        suggestionFriends: suggestionFriendsSlice.reducer,
        media: getMediaSlice.reducer,
        typingStatus: typingStatusSlice.reducer,
        mediaPostDetails: getMediaPostDetailsSlice.reducer,
        posts: postsSlice.reducer,
        bottomChatStatus: bottomChatSlice.reducer,
        onlineStatus: onlineStatusSlice.reducer,
        notifications: notificationSlice.reducer,
        users: searchUserSlice.reducer,
        keyword: getKeyword.reducer,
    },
});

export default store