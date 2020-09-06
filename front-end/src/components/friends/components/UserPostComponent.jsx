import React from 'react';
import edupost from "../../education/components/EducationPosts";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Col } from 'react-bootstrap';

const UserPostComponent = (props) => {
    const posts = props.posts;
    var postData = [];
    var tempArr = {};
    var filterOptions = ["Recommended", "Watch List", "Friends"];

    edupost.postData.map((row) => {
        tempArr = {
            title: row.title,
            category: filterOptions[Math.floor(Math.random() * 1)],
            shortDescription: row.shortDescription,
            img: row.img,
            url: row.link,
            likes: Math.floor(Math.random() * 1000),
        };
        postData.push(tempArr);
    });

    const shuffleArray = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    return (
        <div className="col">
            {
                shuffleArray(postData).slice(0, 4).map(post => {
                    return (
                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.shortDescription}</p>
                                <ThumbUpIcon /> <span className='ml-2'>{post.likes}</span>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserPostComponent