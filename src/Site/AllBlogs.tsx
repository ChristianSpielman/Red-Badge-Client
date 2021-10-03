import React from 'react';

interface AllBlogsProps {
    token: string,
}

class AllBlogs extends React.Component<AllBlogsProps> {
    constructor(props:AllBlogsProps){
        super(props)
        this.state = {

        }
    }
    render() {
        return(
            <div className="wrapper">
                <h1>View all User Created Blogs</h1>
            </div>
        )
    }
}

export default AllBlogs;