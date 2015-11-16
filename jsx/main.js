'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var BlogList = React.createClass({
    fetchBlogs: function(){
        //localStorage["mediumBlogStorage"] = JSON.stringify([]);
        if(localStorage["mediumBlogStorage"]){
            return JSON.parse(localStorage["mediumBlogStorage"]);
        }else{
            localStorage["mediumBlogStorage"] = JSON.stringify([]);
            return [];
        }
    },
    render: function(){
        var blogs = this.fetchBlogs();
        var columns = blogs.map(function(blog){
            return <BlogColumn blog={blog}/>
        });
        return (<ul id="article_ul">{columns}</ul>);
    }
});

var BlogColumn = React.createClass({
    getInitialState: function(){
        return {isUpdateMode: false};
    },
    handleClick: function(event) {
        this.setState({isUpdateMode: !this.state.isUpdateMode});
    },
    render: function(){
        var articleHtml = this.props.blog;
        if(this.state.isUpdateMode){
            return (<li onClick={this.handleClick}><MediumEditor/><UpdateBlogBox/></li>);
        }else{
            return (<li><div dangerouslySetInnerHTML={{__html: articleHtml}}></div><hr/></li>);
        }
    }
});

var AddBlogBox = React.createClass({
    addBlog: function(event){
        event.preventDefault();
        var content = this.refs.editor.getHtmlString();
        var blogStorage = JSON.parse(localStorage["mediumBlogStorage"]);
        blogStorage.push(content);
        localStorage["mediumBlogStorage"] = JSON.stringify(blogStorage);
        ReactDOM.render(
            <BlogList/>,
            document.getElementById('article_list')
        );
    },
    render: function(){
        var self = this;
        return (
            <div>
                <MediumEditor ref="editor"/>
                <a onClick={this.addBlog}>submit</a>
            </div>)
    }
});

var UpdateBlogBox = React.createClass({
    updateBlog: function(event){
        event.preventDefault();
        var trixeditor = document.querySelector('trix-editor#add_blog_editor').editor;
        var editorStorage = JSON.parse(localStorage["mediumBlogStorage"]);
        editorStorage.push(trixeditor);
        localStorage["mediumBlogStorage"] = JSON.stringify(editorStorage);
        ReactDOM.render(
            <BlogList/>,
            document.getElementById('article_list')
        );
    },
    render: function(){
        return (
            <div>
                <MediumEditor/>
                <a onClick={this.updateBlog}>update</a>
            </div>
        )
    }
});

var MediumEditor = React.createClass({
    renderMediumEditor: function(dom){
        this._medium_dom = dom;
        this._medium = new Medium({
            element: dom,
            mode: Medium.richMode,
            placeholder: 'Your Article',
            attributes: null,
            tags: null,
            pasteAsText: false
        });
    },
    getHtmlString: function(){
        return this._medium_dom.innerHTML;
    },
    invokeBold: function(event){
        if(this._medium_dom !== document.activeElement){
            this._medium.select();
        }
        this._medium.invokeElement('b', {
            title: "I'm bold!"
        });
    },
    invokeHead: function(event){
        if(this._medium_dom !== document.activeElement){
            this._medium.select();
        }
        this._medium.invokeElement('h1', {
            title: "I'm Head!",
            style: "color: red"
        });
    },
    render: function(){
        var self = this;
        return (
            <div>
                <div><span onClick={this.invokeBold}>B</span> <span onClick={this.invokeHead}>H</span></div>
                <div ref={(dom) => self.renderMediumEditor(dom)}></div>
            </div>
        )
    }
});

ReactDOM.render(
    <BlogList/>,
    document.getElementById('article_list')
);

ReactDOM.render(
    <AddBlogBox/>,
    document.getElementById('blog_form')
)