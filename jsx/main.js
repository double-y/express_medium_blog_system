'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

function getTrixParser(){
    return document.querySelector("trix-editor#trix_parser");
}

var BlogList = React.createClass({
    fetchEditorJsons: function(){
        //localStorage["editorStorage"] = JSON.stringify([]);
        if(localStorage["editorStorage"]){
            var editorJsons = JSON.parse(localStorage["editorStorage"]);
            return editorJsons;
        }else{
            localStorage["editorStorage"] = JSON.stringify([]);
            return [];
        }
    },
    render: function(){
        var editorJsons = this.fetchEditorJsons();
        var columns = editorJsons.map(function(editorJson){
            return <BlogColumn trixjson={editorJson}/>
        });
        return (<ul>{columns}</ul>);
    }
});

var BlogColumn = React.createClass({
    getInitialState: function() {
        return {isUpdateMode: false};
    },
    parseTrixJsonToHtml: function(json){
        getTrixParser().editor.loadJSON(json)
        return getTrixParser().innerHTML;
    },
    handleClick: function(event) {
        this.setState({isUpdateMode: !this.state.isUpdateMode});
    },
    render: function(){
        var articleHtml = this.parseTrixJsonToHtml(this.props.trixjson);
        if(this.state.isUpdateMode){
            return (<li onClick={this.handleClick}><div class='trix-content'>{articleHtml}</div><UpdateBlogBox/></li>);
        }else{
            return (<li><div class='trix-content'>{articleHtml}</div><hr/></li>);
        }
    }
});

var AddBlogBox = React.createClass({
    addBlog: function(event){
        event.preventDefault();
        console.log("clicked");
        var trixeditor = document.querySelector('trix-editor#add_blog_editor').editor;
        var editorStorage = JSON.parse(localStorage["editorStorage"]);
        editorStorage.push(trixeditor);
        localStorage["editorStorage"] = JSON.stringify(editorStorage);
        ReactDOM.render(
            <BlogList/>,
            document.getElementById('article_list')
        );
    },
    render: function(){
        return (
            <div>
                <trix-editor id='add_blog_editor'></trix-editor>
                <a onClick={this.addBlog}>submit</a>
            </div>
        )
    }
});

var UpdateBlogBox = React.createClass({
    updateBlog: function(event){
        event.preventDefault();
        console.log("clicked");
        var trixeditor = document.querySelector('trix-editor#add_blog_editor').editor;
        var editorStorage = JSON.parse(localStorage["editorStorage"]);
        editorStorage.push(trixeditor);
        localStorage["editorStorage"] = JSON.stringify(editorStorage);
        ReactDOM.render(
            <BlogList/>,
            document.getElementById('article_list')
        );
    },
    render: function(){
        return (
            <div>
                <trix-editor id='update_blog_editor'></trix-editor>
                <a onClick={this.updateBlog}>update</a>
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