import "./PostHeader.css";

const PostHeader = ({title}) => {
    return(
        <section className="PostHeader">
            <h4>{title}</h4>
        </section>
    )
}

export default PostHeader;