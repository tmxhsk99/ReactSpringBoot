import "./ArticleHeader.css";

const ArticleHeader = ({title}) => {
    return(
        <section className="ArticleHeader">
            <h3>{title}</h3>
        </section>
    )
}

export default ArticleHeader;