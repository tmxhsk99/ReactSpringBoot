import "./PostHeader.css";

const PostHeader = ({title}) => {
    return(
        <section className="ArticleHeader">
            <h3>{title}</h3>
        </section>
    )
}

export default PostHeader;