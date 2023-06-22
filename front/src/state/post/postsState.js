import React from 'react';
import {atom, selector, useRecoilState, useRecoilValue} from 'recoil';

export const postsState = atom({
    key: "postsState",
    default: {
        postList: [],
        searchCondition: {
            title: "",
            content: "",
            nickName: "",
        },
        pageInfo: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10
        }
    },
});