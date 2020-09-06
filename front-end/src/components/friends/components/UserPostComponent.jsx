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
    return (
        <div className="col">
            {
                postData.map(post => {
                    return (
                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <ThumbUpIcon /> <span className='ml-2'>{post.likes}</span>
                            </div>
                            {/* <div className='float-right'>
                                <img src='/images/avatar1.jpg' />
                            </div> */}
                        </div>
                    )
                        {/* <Grid item>
                            <Grid container row justify="space-between" alignItems="center" style={{ padding: "10px" }}>
                                <Grid item alignItems="flex-start" xs={12} md={8} lg={10}>
                                    <CardContent>
                                        <Typography variant="h5"> {post.title} </Typography>
                                        <Typography variant="body2"> {post.shortDescription} </Typography>
                                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} style={{ paddingTop: "10px" }}>
                                            <Grid item>
                                                <ThumbUpIcon />
                                            </Grid>
                                            <Grid item>{post.likes}</Grid>
                                        </Grid>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Grid> */}
                        // <hr/>
                })
            }
        </div>
    )
}

export default UserPostComponent