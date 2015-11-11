/**
 * Created by yasudayousuke on 11/7/15.
 */
class Article{
    constructor(title, article){
        this.title = title;
        this.article = article;
    }
    toString() {
        return `(${this.title}, ${this.article})`;
    }
}

export default Article;